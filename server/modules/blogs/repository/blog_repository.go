package repository

import (
	"database/sql"
	"fmt"
	"gin/modules/blogs/repository/entities"

	"github.com/lib/pq"
)

type (
	BlogRepository interface {
		GetBlogs() ([]entities.Blog, error)
		FetchBlog(blogId int) (*entities.Blog, error)
		CreateBlog(blog *entities.Blog) (*int, error)
	}

	blogRepository struct {
		db *sql.DB
	}
)

func NewBlogRepository(db *sql.DB) BlogRepository {
	return &blogRepository{
		db: db,
	}
}

func (br *blogRepository) GetBlogs() ([]entities.Blog, error) {
	rows, err := br.db.Query("SELECT * FROM public.blog_posts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var blogs []entities.Blog

	for rows.Next() {
		var blog entities.Blog
		err := rows.Scan(
			&blog.BlogId,
			&blog.Title,
			&blog.Subtitle,
			&blog.DateCreated,
			&blog.DateUpdated,
			pq.Array(&blog.Keywords),
			&blog.Content,
			&blog.Slug,
		)
		if err != nil {
			return nil, err
		}
		blogs = append(blogs, blog)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return blogs, nil
}

func (br *blogRepository) FetchBlog(blogId int) (*entities.Blog, error) {
	row := br.db.QueryRow("SELECT * FROM public.blog_posts WHERE blogid = $1", blogId)

	var blog entities.Blog

	if err := row.Scan(
		&blog.BlogId,
		&blog.Title,
		&blog.Subtitle,
		&blog.DateCreated,
		&blog.DateUpdated,
		pq.Array(&blog.Keywords),
		&blog.Content,
		&blog.Slug,
	); err != nil {
		if err == sql.ErrNoRows {
			return &blog, DataNotFoundError{Msg: "Blog post data could not be found"}
		}
		return &blog, fmt.Errorf("blogPost %d: could not be parsed", blogId)
	}

	return &blog, nil
}

func (br *blogRepository) CreateBlog(newBlog *entities.Blog) (*int, error) {
	row := br.db.QueryRow("INSERT INTO blog_posts (title, subtitle, dateCreated, dateUpdated, keywords, content, slug) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING blogid", newBlog.Title, newBlog.Subtitle, newBlog.DateCreated, newBlog.DateUpdated, pq.Array(newBlog.Keywords), newBlog.Content, newBlog.Slug)
	if err := row.Scan(&newBlog.BlogId); err != nil {
		return nil, err
	}
	return &newBlog.BlogId, nil
}
