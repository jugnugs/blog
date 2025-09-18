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
		FetchBlog(blogId string) (*entities.Blog, error)
		CreateBlog(blog *entities.Blog) (*string, error)
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

func (br *blogRepository) FetchBlog(blogId string) (*entities.Blog, error) {
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
	); err != nil {
		if err == sql.ErrNoRows {
			return &blog, DataNotFoundError{Msg: "Blog post data could not be found"}
		}
		return &blog, fmt.Errorf("blogPost %s: could not be parsed", blogId)
	}

	return &blog, nil
}

func (br *blogRepository) CreateBlog(newBlog *entities.Blog) (*string, error) {
	_, err := br.db.Exec("INSERT INTO blog_posts (blogId, title, subtitle, dateCreated, dateUpdated, keywords, content) VALUES ($1, $2, $3, $4, $5, $6, $7)", newBlog.BlogId, newBlog.Title, newBlog.Subtitle, newBlog.DateCreated, newBlog.DateUpdated, pq.Array(newBlog.Keywords), newBlog.Content)
	if err != nil {
		return nil, err
	}
	return &newBlog.BlogId, nil
}
