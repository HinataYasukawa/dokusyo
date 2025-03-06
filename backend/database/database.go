package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
    dsn := "host=127.0.0.1 user=user password=password dbname=book_review port=5432 sslmode=disable TimeZone=Asia/Tokyo"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    // 文字化け回避のためにデフォルトのエンコーディングを設定
    db.Exec("SET client_encoding TO 'UTF8';")

    DB = db
}
