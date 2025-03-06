package controllers

import (
	"bytes"
	"dokusyo/backend/database"
	"dokusyo/backend/models"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 感想一覧を取得
func GetReviews(c *gin.Context) {
    var reviews []models.Review
    database.DB.Find(&reviews)
    c.JSON(http.StatusOK, reviews)
}

// 新しい感想を投稿
func CreateReview(c *gin.Context) {
    var review models.Review

    // クライアントから送信された JSON を確認
    jsonData, _ := c.GetRawData()
    fmt.Println("Received JSON:", string(jsonData))

    // 読み取ったデータを元にリクエストのボディを再セット
    c.Request.Body = io.NopCloser(bytes.NewBuffer(jsonData))

    if err := c.ShouldBindJSON(&review); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Go 内部で受け取ったデータを確認
    fmt.Println("Parsed Review:", review.BookTitle, review.Content)

    database.DB.Create(&review)
    c.JSON(http.StatusCreated, review)
}
