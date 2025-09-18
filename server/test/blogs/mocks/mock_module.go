package mocks

import (
	"gin/modules/blogs/endpoints"
	"gin/modules/blogs/repository"

	"github.com/gin-gonic/gin"
)

func InitializeMockBlogModule(blogRepository *repository.BlogRepository) *gin.Engine {
	server := gin.Default()

	blogRoutes := server.Group("/blog")
	{
		blogRoutes.GET("", endpoints.GetBlogs(*blogRepository))
		blogRoutes.GET("/:id", endpoints.FetchBlog(*blogRepository))
		blogRoutes.POST("", endpoints.PostBlog(*blogRepository))
	}
	return server
}
