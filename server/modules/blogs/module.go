package blogs

import (
	"database/sql"
	"gin/middleware"
	"gin/modules/blogs/endpoints"
	"gin/modules/blogs/repository"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func InitializeModule(server *gin.Engine) {
	dbString := os.Getenv("CONNECTION_STRING")
	apiKey := os.Getenv("API_KEY")

	// initialize the connection pool
	db, err := sql.Open("postgres", dbString)
	if err != nil {
		log.Fatal(err)
	}
	// register db service once
	blogRepository := repository.NewBlogRepository(db)

	blogRoutes := server.Group("/blog")
	{
		blogRoutes.GET("", endpoints.GetBlogs(blogRepository))
		blogRoutes.GET("/:id", endpoints.FetchBlog(blogRepository))
		blogRoutes.POST("", middleware.AuthorizeWithAPIKey(apiKey), endpoints.PostBlog(blogRepository))
	}
}
