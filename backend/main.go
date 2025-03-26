package main

import (
	"dokusyo/backend/database"
	"dokusyo/backend/models"
	"dokusyo/backend/routes"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// CORSミドルウェア
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		// OPTIONSメソッドのリクエストには200を返して終了
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}

func main() {
    // データベース接続
    database.ConnectDB()

    // マイグレーション
    err := database.DB.AutoMigrate(&models.User{}, &models.Review{})
    if err != nil {
        log.Fatal("Migration failed:", err)
    }

    r := gin.Default()

    // CORS ミドルウェアの追加
    r.Use(corsMiddleware())

    // ルーティングの設定
    routes.SetupRoutes(r)

    // サーバーの起動
    r.Run(":8080")
}
