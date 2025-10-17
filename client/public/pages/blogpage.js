import BlogApiClient from "../api/blog.js";
import buildArticleHeader from "../components/article_header.js";

/** Class representing the contents of a blog page. */
class BlogPage {
  static blogApiClient = new BlogApiClient();

  /**
   * Constructor for a blog page, do not call directly.
   * Use createBlogPage method.
   * @param {string} blogId
   */
  constructor(blogId) {
    this.blogId = blogId;
    this.blog = {};
  }

  /**
   * Public constructor of BlogPage.
   * Fetches blog contents after creation.
   * @param {string} blogId
   * @returns
   */
  static async createBlogPage(blogId) {
    const newPage = new BlogPage(blogId);
    newPage.blog = await BlogPage.blogApiClient.fetchBlog(newPage.blogId);
    return newPage;
  }

  /**
   * @returns Root element of constructed Page DOM.
   */
  buildPageDOM() {
    const container = document.createElement("article");
    const articleHeader = buildArticleHeader(
      this.blog.title,
      this.blog.subtitle,
      this.blog.dateCreated
    );
    container.appendChild(articleHeader);

    const articleBody = document.createElement("div");
    // @ts-ignore
    // eslint-disable-next-line no-undef
    articleBody.innerHTML = DOMPurify.sanitize(marked.parse(this.blog.content));
    container.appendChild(articleBody);

    return container;
  }
}

export default BlogPage;
