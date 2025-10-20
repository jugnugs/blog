import BlogRepository from "./api/blog.js";
import NotFoundPage from "./pages/404.js";
import AboutPage from "./pages/about.js";
import BlogPage from "./pages/blogpage.js";
import HomePage from "./pages/home.js";

/**
 * @typedef {object} Page
 * @property {function():Element} buildPageDOM
 */

/**
 * App class that holds the current page being rendered in the main app element.
 */
class App {
  constructor() {
    this.app = document.getElementById("app");
  }

  /**
   * Change the current page of app.
   * @param {Page} page
   */
  changePage(page) {
    this.page = page;
  }

  /**
   * Render the main app element with the current page contents.
   */
  renderApp() {
    if (!this.page) return;
    this.app.innerHTML = "";
    this.app.appendChild(this.page.buildPageDOM());
  }
}

const blogRepository = new BlogRepository();

/**
 * Initialize all initial pages and store reference in routes.
 * @returns Object containing route objects
 */
const buildPageRoutes = async () => {
  const routes = {};
  const homePage = await HomePage.createHomePage(blogRepository);
  routes["/"] = { title: "blog home", page: homePage };
  routes["/about"] = { title: "about", page: new AboutPage() };
  routes["/notfound"] = { title: "404", page: new NotFoundPage() };
  return routes;
};

/**
 * Router class coordinates page changes when the route URL changes.
 */
class Router {
  constructor(routes) {
    this.routes = routes;
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  /**
   * @param {any} data
   */
  notifySubscribers(data) {
    this.subscribers.forEach((fn) => fn(data));
  }

  /**
   * @param {string} title
   * @param {any} page
   */
  routeToPage(title, page) {
    document.title = title;
    this.notifySubscribers(page);
  }

  handleRouteChange() {
    let path = this.getPathFromUrl();
    const route = this.resolveRouteFromPath(path);
    if (route) {
      this.routeToPage(route.title, route.page);
    } else if (/^\/blog\/[a-zA-Z0-9-]+/.test(path)) {
      const subpath = path.split("/")[2];
      const blogId = parseInt(subpath.split("-")[0]);
      const slug = subpath.slice(subpath.indexOf("-") + 1);
      BlogPage.createBlogPage(blogId, blogRepository).then(
        (blogPage) => {
          if (blogPage.blog.slug !== slug) {
            path = `/blog/${blogId}-${blogPage.blog.slug}`;
            history.replaceState(null, "", path);
          }

          this.routes[path] = {
            title: blogPage.blog.title,
            page: blogPage,
          };

          this.handleRouteChange();
        },
        (errorMessage) => {
          console.log(errorMessage);
          const notFoundRoute = this.routes["/notfound"];
          this.routeToPage(notFoundRoute.title, notFoundRoute.page);
          window.history.replaceState(null, "", "/notfound");
        }
      );
    } else {
      const notFoundRoute = this.routes["/notfound"];
      this.routeToPage(notFoundRoute.title, notFoundRoute.page);
      window.history.replaceState(null, "", "/notfound");
    }
  }

  getPathFromUrl() {
    return window.location.pathname || "/";
  }

  /**
   * @param {string} path
   */
  resolveRouteFromPath(path) {
    return this.routes[path];
  }
}

buildPageRoutes().then((routes) => {
  const app = new App();
  const router = new Router(routes);
  router.subscribe((newPage) => {
    app.changePage(newPage);
    app.renderApp();
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    // Check if the clicked element is an anchor with data-link
    if (target instanceof HTMLAnchorElement && target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", target.href);
      router.handleRouteChange();
    }
  });

  window.addEventListener("popstate", () => {
    router.handleRouteChange();
  });

  router.handleRouteChange();
});
