package mocks

import (
	"gin/modules/blogs/repository"
	"gin/modules/blogs/repository/entities"
	"time"
)

type mockBlogRepository struct{}

func NewMockBlogRepository() repository.BlogRepository {
	return &mockBlogRepository{}
}

type mockError struct{}

func (m mockError) Error() string {
	return "this is a mock error."
}

var blogData = []entities.Blog{
	{
		BlogId:      1,
		Title:       "Blog Post #1",
		Subtitle:    "",
		DateCreated: time.Now(),
		DateUpdated: time.Now(),
		Keywords:    []string{},
		Content:     "This is my first blog post.",
	},
	{
		BlogId:      2,
		Title:       "Blog Post #2",
		Subtitle:    "",
		DateCreated: time.Now(),
		DateUpdated: time.Now(),
		Keywords:    []string{},
		Content:     "This is my second blog post.",
	},
	{
		BlogId:      3,
		Title:       "Blog Post #3",
		Subtitle:    "",
		DateCreated: time.Now(),
		DateUpdated: time.Now(),
		Keywords:    []string{},
		Content:     "This is my third blog post.",
	},
}

func (br *mockBlogRepository) GetBlogs() ([]entities.Blog, error) {
	return blogData, nil
}

func (br *mockBlogRepository) FetchBlog(blogId int) (*entities.Blog, error) {
	for _, blog := range blogData {
		if blog.BlogId == blogId {
			return &blog, nil
		}
	}
	return nil, repository.DataNotFoundError{}
}

func (br *mockBlogRepository) CreateBlog(newBlog *entities.Blog) (*int, error) {
	res := 4
	return &res, nil
}

type mockFaultyBlogRepository struct{}

func NewMockFaultyBlogRepository() repository.BlogRepository {
	return &mockFaultyBlogRepository{}
}

func (br *mockFaultyBlogRepository) GetBlogs() ([]entities.Blog, error) {
	return nil, &mockError{}
}

func (br *mockFaultyBlogRepository) FetchBlog(blogId int) (*entities.Blog, error) {
	return nil, &mockError{}
}

func (br *mockFaultyBlogRepository) CreateBlog(newBlog *entities.Blog) (*int, error) {
	return nil, &mockError{}
}
