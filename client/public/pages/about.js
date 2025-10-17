class AboutPage {
  constructor() {
    this.headerContents = "blog list";
    this.description =
      "This is a thoughts and ideas dumping site for my own personal use. My goal is to get more comfortable with sharing my thoughts with others as unfiltered as possible. My hope is that this will channel more creative ideas and lead to more output of those ideas. Even if they don’t necessarily lead to anything. It’s all about proliferation.";
  }

  buildPageDOM() {
    const container = document.createElement("article");
    const header = document.createElement("h1");
    header.textContent = this.headerContents;
    container.appendChild(header);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = this.description;
    container.appendChild(descriptionElement);
    return container;
  }
}

export default AboutPage;
