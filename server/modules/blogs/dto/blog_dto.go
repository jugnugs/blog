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
