import renderHomePage from "./pages/home.js";
import renderAboutPage from "./pages/about.js";
import BlogPage from "./pages/blogpage.js";

const routes = {
  "/": { title: "blog home", content: renderHomePage },
  "/about": { title: "about", content: renderAboutPage },
  "/notfound": { title: "404", content: () => "page not found" },
};

/**
 * Updates the contents of the app div with the results of renderPage,
 * and change the title.
 * @param {function(*): string} renderPage
 * @param {string} title
 */
function updateApp(renderPage, title) {
  document.getElementById("app").innerHTML = renderPage();
  document.title = title;
}

class Router {
  constructor(routes) {
    this.routes = routes;
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  handleRouteChange() {
    const path = this.getPathFromUrl();
    const route = this.resolveRouteFromPath(path);
    if (route) {
      updateApp(route.content, route.title);
    } else if (/^\/blog\/[a-zA-Z0-9-]+/.test(path)) {
      const subpath = path.split("/")[2];
      BlogPage.initialize(subpath).then(
        (blogPage) => {
          this.routes[path] = {
            title: blogPage.blog.title,
            content: () => blogPage.renderBlogPage(),
          };
          this.handleRouteChange();
        },
        (errorMessage) => {
          console.log(errorMessage);
          updateApp(this.routes["/notfound"].content, "404");
          window.history.replaceState(null, "", "/notfound");
        }
      );
    } else {
      updateApp(this.routes["/notfound"].content, "404");
      window.history.replaceState(null, "", "/notfound");
    }
  }

  getPathFromUrl() {
    return window.location.pathname || "/";
  }

  resolveRouteFromPath(path) {
    return this.routes[path];
  }
}

const router = new Router(routes);

window.addEventListener("DOMContentLoaded", () => {
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
