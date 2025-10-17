import { formatDate } from "../utils/date.js";

/**
 *
 * @param {string} title
 * @param {string} subtitle
 * @param {string} dateCreated
 * @returns Header element containing article descriptions.
 */
const buildArticleHeader = (title, subtitle, dateCreated) => {
  const container = document.createElement("header");
  const titleElement = document.createElement("h1");
  titleElement.textContent = title;
  container.appendChild(titleElement);

  const subtitleElement = document.createElement("h2");
  subtitleElement.textContent = subtitle;
  container.appendChild(subtitleElement);

  const dateElement = document.createElement("div");
  dateElement.textContent = `Written ${formatDate(dateCreated)}`;
  container.appendChild(dateElement);

  return container;
};

export default buildArticleHeader;
