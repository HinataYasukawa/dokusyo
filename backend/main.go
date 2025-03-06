package main

import (
	"dokusyo/backend/database"
	"dokusyo/backend/models"
	"dokusyo/backend/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
    // データベース接続
    database.ConnectDB()

    // マイグレーション
    err := database.DB.AutoMigrate(&models.Review{})
    if err != nil {
        log.Fatal("Migration failed:", err)
    }

    r := gin.Default()

    // ルーティングの設定
    routes.SetupRoutes(r)

    r.Run(":8080")
}
