package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)

// ─── Very simple in-memory "JWT" (demo — replace with real JWT in production) ─

var secretKey = "aw-associates-secret-key-2025"

// Session store (in production use Redis or a DB)
var sessions = map[string]SessionData{}

type SessionData struct {
	UserID   uint
	Username string
	Role     string
	Branch   string
	Expires  time.Time
}

func CreateToken(userID uint, username, role, branch string) string {
	token := encodeSimple(username + "|" + role + "|" + branch)
	sessions[token] = SessionData{
		UserID:   userID,
		Username: username,
		Role:     role,
		Branch:   branch,
		Expires:  time.Now().Add(24 * time.Hour),
	}
	return token
}

func ValidateToken(token string) (*SessionData, bool) {
	data, ok := sessions[token]
	if !ok {
		return nil, false
	}
	if time.Now().After(data.Expires) {
		delete(sessions, token)
		return nil, false
	}
	return &data, true
}

// ─── Middleware ───────────────────────────────────────────────────────────────

func Auth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := extractToken(r)
		session, ok := ValidateToken(token)
		if !ok {
			writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
			return
		}
		// Attach session info via header for downstream handlers
		r.Header.Set("X-User-ID",   fmt.Sprint(session.UserID))
		r.Header.Set("X-Username",  session.Username)
		r.Header.Set("X-Role",      session.Role)
		r.Header.Set("X-Branch",    session.Branch)
		next(w, r)
	}
}

func AdminOnly(next http.HandlerFunc) http.HandlerFunc {
	return Auth(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("X-Role") != "admin" {
			writeJSON(w, http.StatusForbidden, map[string]string{"error": "Admin access required"})
			return
		}
		next(w, r)
	})
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin",  "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

func extractToken(r *http.Request) string {
	bearer := r.Header.Get("Authorization")
	if strings.HasPrefix(bearer, "Bearer ") {
		return strings.TrimPrefix(bearer, "Bearer ")
	}
	// Also check cookie
	cookie, err := r.Cookie("auth_token")
	if err == nil {
		return cookie.Value
	}
	return ""
}

func writeJSON(w http.ResponseWriter, code int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(v)
}

// Very simple encoding — NOT cryptographically secure, demo only
func encodeSimple(s string) string {
	encoded := make([]byte, len(s))
	for i, c := range s {
		encoded[i] = byte(c) ^ byte(secretKey[i%len(secretKey)])
	}
	// Hex-encode
	const hx = "0123456789abcdef"
	out := make([]byte, len(encoded)*2)
	for i, b := range encoded {
		out[i*2]   = hx[b>>4]
		out[i*2+1] = hx[b&0xf]
	}
	return string(out)
}
