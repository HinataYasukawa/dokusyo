package routes

import (
	"dokusyo/backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
    router.GET("/reviews", controllers.GetReviews)
    router.POST("/reviews", controllers.CreateReview)
}
