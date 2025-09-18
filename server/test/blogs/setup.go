package blogs

import (
	"gin/test/blogs/mocks"

	"github.com/gin-gonic/gin"
)

func SetupErrorTest() *gin.Engine {
	br := mocks.NewMockFaultyBlogRepository()
	return mocks.InitializeMockBlogModule(&br)
}

func SetupTest() *gin.Engine {
	br := mocks.NewMockBlogRepository()
	return mocks.InitializeMockBlogModule(&br)
}
