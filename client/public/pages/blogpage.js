import renderArticleHeader from "../components/article_header.js";
import { BlogModel } from "../models/blog.js";

/** Class representing the contents of a blog page. */
class BlogPage {
  /**
   * Constructor for a blog page, do not call directly.
   * Use initialize method.
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
  static async initialize(blogId) {
    const newPage = new BlogPage(blogId);
    await newPage.updatePageContents();
    return newPage;
  }

  /**
   * Fetch the blog page contents using the stored blogId.
   */
  async updatePageContents() {
    this.blog = await BlogModel.fetchNewBlog(this.blogId);
  }

  /**
   * @returns HTML for the blog page
   */
  renderBlogPage() {
    return `<article>
            ${renderArticleHeader(this.blog.title, this.blog.subtitle, this.blog.dateCreated)}
            ${
              // @ts-ignore
              // eslint-disable-next-line no-undef
              DOMPurify.sanitize(marked.parse(this.blog.content))
            }
            </article>`;
  }
}

export default BlogPage;
