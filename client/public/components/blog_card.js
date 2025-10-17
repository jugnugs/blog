import { formatDate } from "../utils/date.js";

/**
 * @param {string} title
 * @param {string} dateCreated
 * @param {string} subtitle
 * @param {string[]} tags
 * @param {string} link
 * @returns Card element containing blog description.
 */
const buildBlogCard = (title, dateCreated, subtitle, tags, link) => {
  const container = document.createElement("article");
  container.className = "blog-card";

  const titleElement = document.createElement("h3");
  const blogLinkElement = document.createElement("a");
  blogLinkElement.href = `/blog/${link}`;
  blogLinkElement.dataset.link = "";
  blogLinkElement.textContent = title;
  titleElement.appendChild(blogLinkElement);
  container.appendChild(titleElement);

  const dateElement = document.createElement("div");
  dateElement.textContent = formatDate(dateCreated);
  container.appendChild(dateElement);

  const subtitleElement = document.createElement("div");
  subtitleElement.textContent = subtitle;
  container.appendChild(subtitleElement);

  const tagListElement = document.createElement("ul");
  tags.forEach((tag) => {
    const tagElement = document.createElement("li");
    tagElement.textContent = tag;
    tagListElement.appendChild(tagElement);
  });
  container.appendChild(tagListElement);

  return container;
};

export default buildBlogCard;
