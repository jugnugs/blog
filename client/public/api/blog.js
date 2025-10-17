import { BlogModel } from "../models/blog.js";

class BlogApiClient {
  constructor() {
    this.BASE_URL = `http://localhost:8080`;
  }

  /**
   * Fetch list of blogs
   * @returns list of BlogModels
   */
  async fetchBlogList() {
    const url = `${this.BASE_URL}/blog`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch blog list data: status ${res.status}`);
    }
    const data = await res.json();
    return data.map((item) => {
      return new BlogModel({
        id: item["Id"],
        title: item["Title"],
        subtitle: item["Subtitle"],
        slug: item["Slug"],
        dateCreated: item["DateCreated"],
        dateUpdated: item["DateUpdated"],
        keywords: item["Keywords"],
        content: item["Content"],
      });
    });
  }
}

export default BlogApiClient;
