/** Model class for representing a blog. */
class BlogModel {
  /**
   * @typedef {object} Blog
   * @property {string} id
   * @property {string} title
   * @property {string} subtitle
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
   * Fetch the blog from the server and create a new BlogModel.
   * @param {string} blogId
   * @returns BlogModel
   */
  static async fetchNewBlog(blogId) {
    const url = `http://localhost:8080/blog/${blogId}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch blog data: status ${res.status}`);
    }
    const data = await res.json();
    const newBlog = new BlogModel({
      id: data["Id"],
      title: data["Title"],
      subtitle: data["Subtitle"],
      dateCreated: data["DateCreated"],
      dateUpdated: data["DateUpdated"],
      keywords: data["Keywords"],
      content: data["Content"],
    });
    return newBlog;
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
