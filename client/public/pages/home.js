import BlogList from "../views/bloglist.js";

class HomePage {
  constructor() {
    this.headerContents = "blog list";
    this.blogList = new BlogList();
  }

  static async createHomePage() {
    const homePage = new HomePage();
    homePage.blogList = await BlogList.createBlogList();
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
