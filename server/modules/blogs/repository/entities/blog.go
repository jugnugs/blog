package entities

import "time"

type Blog struct {
	BlogId      string
	Title       string
	Subtitle    string
	Slug        string
	DateCreated time.Time
	DateUpdated time.Time
	Keywords    []string
	Content     string
}
