import buildPageNavigation from "../components/page_navigation.js";
import BlogList from "../views/bloglist.js";

class HomePage {
  constructor(blogRepository) {
    this.headerContents = "blog list";
    this.blogList = new BlogList();
    this.blogRepository = blogRepository;
    this.pageNumber = 1;
    this.totalPageCount = 1;
  }

  static async createHomePage(blogRepository) {
    const homePage = new HomePage(blogRepository);
    homePage.changePage(1);
    return homePage;
  }

  /**
   * Page the homepage with updated blog list contents
   * @param {number} pageNumber
   */
  async changePage(pageNumber) {
    this.pageNumber = pageNumber;
    const blogList =
      await this.blogRepository.fetchPaginatedBlogPosts(pageNumber);
    this.totalPageCount = this.blogRepository.getTotalPageCount();
    this.blogList = new BlogList(blogList);
  }

  buildPageDOM() {
    const container = document.createElement("article");
    const header = document.createElement("h1");
    header.textContent = this.headerContents;
    container.appendChild(header);
    container.appendChild(this.blogList.buildBlogListDOM());

    container.appendChild(
      buildPageNavigation(this.pageNumber, this.totalPageCount)
    );
    return container;
  }
}

export default HomePage;
