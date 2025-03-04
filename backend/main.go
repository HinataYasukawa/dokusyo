package main

import (
	"dokusyo/database"
	"dokusyo/models"
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

    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello, Book Review App!"})
    })

    r.Run(":8080")
}
