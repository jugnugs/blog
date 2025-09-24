import renderHomePage from "./pages/home.js";
import renderAboutPage from "./pages/about.js";
import renderBlogPage from "./pages/blogpage.js";

const routes = {
    "/": { title: "blog home", content: renderHomePage},
    "/about": { title: "about", content: renderAboutPage},
    "/blog": { title: "blog", content: renderBlogPage}
};

class Router {
    constructor(routes) {
        this.routes = routes;
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    handleRouteChange() {
        const path = this.getPathFromUrl();
        console.log(path)
        const route = this.resolveRouteFromPath(path);
        if (route) {
            switch (path) {
                case "/blog":
                    const subpath = "test"
                    document.getElementById("app").innerHTML = route.content(subpath);
                    break;
                default:
                    document.getElementById("app").innerHTML = route.content();
            }
            document.title = route.title;
        } else {
            document.getElementById("app").innerHTML = "page not found";
            document.title = "404";
        }
    }

    getPathFromUrl() {
        const path = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
        if (!path) return "/";
        return "/".concat(path);
    }

    resolveRouteFromPath(path) {
        const route = this.routes[path];
        if (!route) return routes["/"];
        return route;
    }
}

const router = new Router(routes)

window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", e => {
        const target = e.target;
        // Check if the clicked element is an anchor with data-link
        if (target instanceof HTMLAnchorElement && target.matches("[data-link]")) {
            e.preventDefault();
            history.pushState(null, "", target.href);
            router.handleRouteChange(); 
        }
    });

    window.addEventListener("popstate", (e) => {
        router.handleRouteChange();
    })

    router.handleRouteChange();
});