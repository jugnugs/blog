import { BlogModel } from "../models/blog.js";

class BlogRepository {
  constructor() {
    this.blogCache = [];
    this.POSTS_PER_PAGE = 5;
  }

  /**
   * Fetch the blog contents and create a new BlogModel.
   * @param {number} blogId
   * @returns BlogModel
   */
  async fetchBlog(blogId) {
    if (this.blogCache.length === 0) {
      await this.fetchPaginatedBlogPosts(1);
    }
    const blog = this.blogCache.find((blog) => blog.id === blogId);
    if (!blog) {
      throw new Error(`Failed to find blog data: id ${blogId}`);
    }
    return blog;
  }

  /**
   *
   * @param {number} pageNumber
   * @returns list of BlogModels
   */
  async fetchPaginatedBlogPosts(pageNumber) {
    let posts = this.blogCache;
    if (posts.length === 0) {
      console.log("fetched blogs");
      const url = "/api/posts.json";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch blog data: status ${res.status}`);
      }
      const data = await res.json();
      posts = data
        .map((item) => {
          return new BlogModel({
            id: item["id"],
            title: item["title"],
            subtitle: item["subtitle"],
            slug: item["slug"],
            dateCreated: item["dateCreated"],
            keywords: item["tags"],
            content: item["content"],
          });
        })
        // @ts-ignore
        .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

      this.blogCache = posts;
    }
    const startIndex = (pageNumber - 1) * this.POSTS_PER_PAGE;
    const endIndex = startIndex + this.POSTS_PER_PAGE;

    const paginatedPosts = posts.slice(startIndex, endIndex);

    return paginatedPosts;
  }

  getTotalPageCount() {
    if (!this.blogCache.length) {
      return 1;
    }
    return 1 + Math.floor((this.blogCache.length - 1) / this.POSTS_PER_PAGE);
  }
}

export default BlogRepository;
