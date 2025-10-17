/**
 * 404 page for when requested page does not exist.
 */
class NotFoundPage {
  constructor() {
    this.headerContents = "page not found.";
  }

  buildPageDOM() {
    const container = document.createElement("article");
    const header = document.createElement("h3");
    header.textContent = this.headerContents;
    container.appendChild(header);
    return container;
  }
}

export default NotFoundPage;
