import buildBlogCard from "../components/blog_card.js";

/**
 * UI component for rendering a list of blogs.
 * Supports pagination.
 */
class BlogList {
  constructor(blogList) {
    this.data = blogList;
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
