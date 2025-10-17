/** Model class for representing a blog. */
class BlogModel {
  /**
   * @typedef {object} Blog
   * @property {string} id
   * @property {string} title
   * @property {string} subtitle
   * @property {string} slug
   * @property {string} dateCreated
   * @property {string} dateUpdated
   * @property {string[]} keywords
   * @property {string} content
   */

  /**
   * @param {Blog} newBlog
   */
  constructor(newBlog) {
    this.updateProperties(newBlog);
  }

  /**
   * Map properties to the BlogModel
   * @param {Blog} newBlog
   * @return void
   */
  updateProperties(newBlog) {
    this.id = newBlog.id;
    this.title = newBlog.title;
    this.subtitle = newBlog.subtitle;
    this.slug = newBlog.slug;
    this.dateCreated = newBlog.dateCreated;
    this.dateUpdated = newBlog.dateUpdated;
    this.keywords = newBlog.keywords;
    this.content = newBlog.content;
  }
}

class BlogListModel {
  /**
   * @param {Blog[]} blogs
   */
  constructor(blogs) {
    this.blogs = blogs;
  }

  /**
   * Get blog details by blogId
   * @param {string} blogId
   * @return Blog
   */
  getBlog(blogId) {
    return this.blogs.find((blog) => blog.id == blogId);
  }
}

export { BlogModel, BlogListModel };
