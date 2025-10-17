import BlogApiClient from "../api/blog.js";
import buildBlogCard from "../components/blog_card.js";

/**
 * UI component for rendering a list of blogs.
 * Supports pagination.
 */
class BlogList {
  static blogApiClient = new BlogApiClient();

  constructor() {
    this.data = [];
  }

  static async createBlogList() {
    const blogList = new BlogList();
    blogList.data = await BlogList.blogApiClient.fetchBlogList();
    return blogList;
  }

  buildBlogListDOM() {
    const container = document.createElement("div");
    container.className = "blog-list";
    this.data.forEach((d) => {
      const item = buildBlogCard(
        d.title,
        d.dateCreated,
        d.subtitle,
        d.keywords,
        `${d.id}-${d.slug}`
      );
      container.appendChild(item);
    });
    return container;
  }
}

export default BlogList;
