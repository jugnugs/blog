package middleware

import (
	"gin/resources"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthorizeWithAPIKey(apiKey string) gin.HandlerFunc {
	return func(c *gin.Context) {
		headerKey := c.Request.Header.Get("X-API-Key")
		if headerKey != apiKey {
			log.Print("Unauthorized attempt to access resources.")
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": resources.GetNotAuthorizedMessage()})
		}
		c.Next()
	}
}
