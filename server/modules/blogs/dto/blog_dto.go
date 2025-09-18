package dto

import "time"

type (
	FetchBlogRequest struct {
		Id string `uri:"id" binding:"required"`
	}

	FetchBlogsResponse struct {
		Id          string
		Title       string
		Subtitle    string
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
		DateCreated time.Time
		DateUpdated time.Time
		Keywords    []string
		Content     string
	}

	PostBlogResponse struct {
		Id string
	}
)
