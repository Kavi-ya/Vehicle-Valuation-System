package db

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

// Connect opens and verifies the SQLite connection.
func Connect() {
	dbPath := "db/aw-associates.db"
	
	var err error
	DB, err = sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatalf("[DB] Failed to open: %v", err)
	}
	if err = DB.Ping(); err != nil {
		log.Fatalf("[DB] Failed to ping SQLite: %v", err)
	}
	
	// Optional: Enable foreign keys and busy timeout for SQLite
	DB.Exec("PRAGMA foreign_keys = ON;")
	DB.Exec("PRAGMA busy_timeout = 5000;")
	
	// Auto-migration
	_, err = DB.Exec("ALTER TABLE valuations ADD COLUMN current_owner TEXT DEFAULT '';")
	if err != nil {
		log.Printf("[DB] Auto-migration error (can be ignored if column exists): %v", err)
	}

	_, err = DB.Exec("ALTER TABLE valuations ADD COLUMN country_used TEXT DEFAULT '';")
	if err != nil {
		log.Printf("[DB] Auto-migration error for country_used (can be ignored if column exists): %v", err)
	}

	_, err = DB.Exec("ALTER TABLE valuations ADD COLUMN yard TEXT DEFAULT '';")
	if err != nil {
		log.Printf("[DB] Auto-migration error for yard (can be ignored if column exists): %v", err)
	}

	_, err = DB.Exec("ALTER TABLE valuations ADD COLUMN inspect_location TEXT DEFAULT '';")
	if err != nil {
		log.Printf("[DB] Auto-migration error for inspect_location (can be ignored if column exists): %v", err)
	}
	
	log.Println("[DB] Connected to SQLite successfully.")
}
