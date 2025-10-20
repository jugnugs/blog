import BlogList from "../views/bloglist.js";

class HomePage {
  constructor(blogRepository) {
    this.headerContents = "blog list";
    this.blogList = new BlogList();
    this.blogRepository = blogRepository;
  }

  static async createHomePage(blogRepository) {
    const homePage = new HomePage(blogRepository);
    const blogList = await homePage.blogRepository.fetchPaginatedBlogPosts(1);
    homePage.blogList = new BlogList(blogList);
    return homePage;
  }

  buildPageDOM() {
    const container = document.createElement("article");
    const header = document.createElement("h1");
    header.textContent = this.headerContents;
    container.appendChild(header);
    container.appendChild(this.blogList.buildBlogListDOM());
    return container;
  }
}

export default HomePage;
