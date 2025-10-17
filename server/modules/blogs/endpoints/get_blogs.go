package endpoints

import (
	"gin/modules/blogs/dto"
	"gin/modules/blogs/repository"
	"gin/resources"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetBlogs(blogRepository repository.BlogRepository) func(*gin.Context) {
	return func(c *gin.Context) {
		blogs, err := blogRepository.GetBlogs()
		if err != nil {
			log.Printf("Error fetching blog posts: %v", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": resources.GetInternalServerErrorMessage()})
			return
		}

		responseData := make([]dto.FetchBlogsResponse, len(blogs))
		for i, blogItem := range blogs {
			responseData[i] = dto.FetchBlogsResponse{
				Id:          blogItem.BlogId,
				Title:       blogItem.Title,
				Subtitle:    blogItem.Subtitle,
				Slug:        blogItem.Slug,
				DateCreated: blogItem.DateCreated,
				DateUpdated: blogItem.DateUpdated,
				Keywords:    blogItem.Keywords,
				Content:     blogItem.Content,
			}
		}

		c.JSON(http.StatusOK, responseData)
	}
}
