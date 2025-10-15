package dto

import "time"

type (
	FetchBlogRequest struct {
		Id int `uri:"id" binding:"required"`
	}

	FetchBlogsResponse struct {
		Id          int
		Title       string
		Subtitle    string
		Slug        string
		DateCreated time.Time
		DateUpdated time.Time
		Keywords    []string
		Content     string
	}

	GetBlogsResponse struct {
		Data []FetchBlogsResponse
	}

	PostBlogRequest struct {
		Title       string
		Subtitle    string
		Slug        string
		DateCreated time.Time
		DateUpdated time.Time
		Keywords    []string
		Content     string
	}

	PostBlogResponse struct {
		Id int
	}
)
