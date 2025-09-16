package main

import (
	"gin/middleware"
	"gin/modules/blogs"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()
	r.SetTrustedProxies(nil)
	r.Use(middleware.AddCors())

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	blogs.InitializeModule(r)

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
