package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"aw-associates/backend/db"
	"aw-associates/backend/handlers"
	"aw-associates/backend/middleware"
)

const uploadsDir = `e:\AW Associate\aw-dashboard\uploads`

func main() {
	// Load env from .env file if present
	loadEnv(".env")

	// Connect to PostgreSQL
	db.Connect()

	// Ensure uploads directory exists
	if err := os.MkdirAll(uploadsDir, 0755); err != nil {
		log.Fatalf("Cannot create uploads dir: %v", err)
	}

	mux := http.NewServeMux()

	// ─── Auth (public) ──────────────────────────────────────────────────────
	mux.HandleFunc("/api/auth/login",  handlers.Login)
	mux.HandleFunc("/api/auth/logout", handlers.Logout)

	// ─── Dashboard Stats ────────────────────────────────────────────────────
	mux.HandleFunc("/api/stats", middleware.Auth(handlers.GetStats))

	// ─── Valuations ─────────────────────────────────────────────────────────
	mux.HandleFunc("/api/valuations",           middleware.Auth(routeValuations))
	mux.HandleFunc("/api/valuations/pending",   middleware.Auth(handlers.GetPendingValuations))
	mux.HandleFunc("/api/valuations/",          middleware.Auth(routeValuationByID))

	// ─── Users (Admin Only) ─────────────────────────────────────────────────
	mux.HandleFunc("/api/users",  middleware.AdminOnly(routeUsers))
	mux.HandleFunc("/api/users/", middleware.AdminOnly(routeUserByID))

	// ─── Form Options ────────────────────────────────────────────────────────
	mux.HandleFunc("/api/options",  middleware.Auth(routeOptions))
	mux.HandleFunc("/api/options/", middleware.AdminOnly(routeOptionByID))

	// ─── Health check ────────────────────────────────────────────────────────
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"ok","service":"aw-associates-backend"}`)
	})

	// ─── Serve uploaded images as static files ───────────────────────────────
	// e.g. GET /uploads/val_123/img1_xxx.jpg  →  e:\AW Associate\aw-dashboard\uploads\val_123\img1_xxx.jpg
	mux.Handle("/uploads/", http.StripPrefix("/uploads/", http.FileServer(http.Dir(uploadsDir))))

	// Wrap with CORS
	handler := middleware.CORS(mux)

	addr := ":8080"
	log.Printf("AW Associates API server running on http://localhost%s", addr)
	log.Printf("Endpoints:")
	log.Printf("  POST   /api/auth/login")
	log.Printf("  POST   /api/auth/logout")
	log.Printf("  GET    /api/stats                       (auth)")
	log.Printf("  GET    /api/valuations                  (auth)")
	log.Printf("  POST   /api/valuations                  (auth)")
	log.Printf("  GET    /api/valuations/pending          (auth)")
	log.Printf("  PUT    /api/valuations/:id              (auth)")
	log.Printf("  POST   /api/valuations/:id/images       (auth) — upload up to 5 images")
	log.Printf("  GET    /api/users                       (admin only)")
	log.Printf("  POST   /api/users                       (admin only)")
	log.Printf("  PUT    /api/users/:id                   (admin only)")
	log.Printf("  DELETE /api/users/:id                   (admin only)")
	log.Printf("  GET    /api/options                     (auth)")
	log.Printf("  POST   /api/options                     (admin only)")
	log.Printf("  DELETE /api/options/:id                 (admin only)")
	log.Printf("  GET    /uploads/**                      (static — vehicle images)")
	log.Fatal(http.ListenAndServe(addr, handler))
}

// ─── Route dispatchers ───────────────────────────────────────────────────────

func routeValuations(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:  handlers.GetValuations(w, r)
	case http.MethodPost: handlers.CreateValuation(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func routeValuationByID(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	parts := splitPath(path)
	
	// POST /api/valuations/{id}/images
	if r.Method == http.MethodPost && len(parts) >= 2 && parts[len(parts)-1] == "images" {
		handlers.UploadValuationImages(w, r)
		return
	}
	
	// PATCH or PUT /api/valuations/{id}/status -> UpdateValuationStatus
	if (r.Method == http.MethodPatch || r.Method == http.MethodPut) && len(parts) >= 2 && parts[len(parts)-1] == "status" {
		handlers.UpdateValuationStatus(w, r)
		return
	}

	switch r.Method {
	case http.MethodGet:    handlers.GetValuationByID(w, r)
	case http.MethodPut:    handlers.UpdateValuation(w, r)
	case http.MethodPatch:  handlers.UpdateValuationStatus(w, r) // Fallback for pure PATCH on the ID
	case http.MethodDelete: handlers.DeleteValuation(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func routeUsers(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:  handlers.GetUsers(w, r)
	case http.MethodPost: handlers.CreateUser(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func routeUserByID(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPut:    handlers.UpdateUser(w, r)
	case http.MethodDelete: handlers.DeleteUser(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func routeOptions(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:  handlers.GetFormOptions(w, r)
	case http.MethodPost: handlers.CreateFormOption(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func routeOptionByID(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPut:    handlers.UpdateFormOption(w, r)
	case http.MethodDelete: handlers.DeleteFormOption(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

func splitPath(path string) []string {
	var parts []string
	for _, p := range splitStr(path, "/") {
		if p != "" {
			parts = append(parts, p)
		}
	}
	return parts
}

func splitStr(s, sep string) []string {
	var result []string
	for {
		i := indexOf(s, sep)
		if i < 0 {
			result = append(result, s)
			break
		}
		result = append(result, s[:i])
		s = s[i+len(sep):]
	}
	return result
}

func indexOf(s, sub string) int {
	for i := 0; i <= len(s)-len(sub); i++ {
		if s[i:i+len(sub)] == sub {
			return i
		}
	}
	return -1
}

// loadEnv reads a simple KEY=VALUE .env file and sets env vars.
func loadEnv(path string) {
	data, err := os.ReadFile(path)
	if err != nil {
		return // .env is optional
	}
	for _, line := range splitStr(string(data), "\n") {
		line = trimSpace(line)
		if line == "" || line[0] == '#' {
			continue
		}
		i := indexOf(line, "=")
		if i < 0 {
			continue
		}
		key := trimSpace(line[:i])
		val := trimSpace(line[i+1:])
		if os.Getenv(key) == "" {
			os.Setenv(key, val)
		}
	}
}

func trimSpace(s string) string {
	for len(s) > 0 && (s[0] == ' ' || s[0] == '\t' || s[0] == '\r' || s[0] == '\n') {
		s = s[1:]
	}
	for len(s) > 0 && (s[len(s)-1] == ' ' || s[len(s)-1] == '\t' || s[len(s)-1] == '\r' || s[len(s)-1] == '\n') {
		s = s[:len(s)-1]
	}
	return s
}
