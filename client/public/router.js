import renderHomePage from "./pages/home.js";
import renderAboutPage from "./pages/about.js";
import renderNotFoundPage from "./pages/404.js";
import BlogPage from "./pages/blogpage.js";

const routes = {
  "/": { title: "blog home", renderContent: renderHomePage },
  "/about": { title: "about", renderContent: renderAboutPage },
  "/notfound": { title: "404", renderContent: renderNotFoundPage },
};

/**
 * Updates the contents of the app div with the results of renderPage,
 * and change the title.
 * @param {function(*): string} renderPage
 * @param {string} title
 */
async function updateApp(renderPage, title) {
  document.getElementById("app").innerHTML = await renderPage();
  document.title = title;
}

class Router {
  constructor(routes) {
    this.routes = routes;
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  handleRouteChange() {
    let path = this.getPathFromUrl();
    const route = this.resolveRouteFromPath(path);
    if (route) {
      updateApp(route.renderContent, route.title);
    } else if (/^\/blog\/[a-zA-Z0-9-]+/.test(path)) {
      const subpath = path.split("/")[2];
      const blogId = subpath.split("-")[0];
      const slug = subpath.slice(subpath.indexOf("-") + 1);
      BlogPage.initialize(blogId).then(
        (blogPage) => {
          if (blogPage.blog.slug !== slug) {
            path = `/blog/${blogId}-${blogPage.blog.slug}`;
            history.replaceState(null, "", path);
          }

          this.routes[path] = {
            title: blogPage.blog.title,
            renderContent: () => blogPage.renderBlogPage(),
          };

          this.handleRouteChange();
        },
        (errorMessage) => {
          console.log(errorMessage);
          updateApp(this.routes["/notfound"].renderContent, "404");
          window.history.replaceState(null, "", "/notfound");
        }
      );
    } else {
      updateApp(this.routes["/notfound"].renderContent, "404");
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
