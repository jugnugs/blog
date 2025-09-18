package endpoints

import (
	"gin/modules/blogs/dto"
	"gin/modules/blogs/repository"
	"gin/resources"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FetchBlog(blogRepository repository.BlogRepository) func(*gin.Context) {
	return func(c *gin.Context) {
		var req dto.FetchBlogRequest
		err := c.ShouldBindUri(&req)
		if err != nil {
			log.Printf("Error parsing the request: %v", err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": resources.GetBadRequestErrorMessage()})
			return
		}

		blogItem, err := blogRepository.FetchBlog(req.Id)
		if err != nil {
			log.Printf("Error fetching the blog post of id %s: %v", req.Id, err.Error())
			switch err.(type) {
			case repository.DataNotFoundError:
				c.JSON(http.StatusNotFound, gin.H{"error": resources.GetNotFoundErrorMessage()})
				return
			default:
				c.JSON(http.StatusInternalServerError, gin.H{"error": resources.GetInternalServerErrorMessage()})
				return
			}
		}

		data := dto.FetchBlogsResponse{
			Id:          blogItem.BlogId,
			Title:       blogItem.Title,
			Subtitle:    blogItem.Subtitle,
			DateCreated: blogItem.DateCreated,
			DateUpdated: blogItem.DateUpdated,
			Keywords:    blogItem.Keywords,
			Content:     blogItem.Content,
		}

		c.JSON(http.StatusOK, data)
	}
}
