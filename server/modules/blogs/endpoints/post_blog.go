package endpoints

import (
	"gin/modules/blogs/dto"
	"gin/modules/blogs/repository"
	"gin/modules/blogs/repository/entities"
	"gin/resources"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PostBlog(blogRepository repository.BlogRepository) func(*gin.Context) {
	return func(c *gin.Context) {
		var req dto.PostBlogRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			log.Printf("Error parsing the request: %v", err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		blogEntity := &entities.Blog{
			Title:       req.Title,
			Subtitle:    req.Subtitle,
			Slug:        req.Slug,
			DateCreated: req.DateCreated,
			DateUpdated: req.DateUpdated,
			Keywords:    req.Keywords,
			Content:     req.Content,
		}

		createdBlogId, err := blogRepository.CreateBlog(blogEntity)
		if err != nil {
			log.Printf("Error creating new blog post: %v", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": resources.GetInternalServerErrorMessage()})
			return
		}

		res := dto.PostBlogResponse{
			Id: *createdBlogId,
		}

		c.JSON(http.StatusOK, res)
	}
}
