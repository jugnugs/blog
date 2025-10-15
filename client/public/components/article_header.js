import { formatDate } from "../utils/date.js";

/**
 *
 * @param {string} title
 * @param {string} subtitle
 * @param {string} dateCreated
 * @returns
 */
const renderArticleHeader = (title, subtitle, dateCreated) => {
  return `<header>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <div>Written ${formatDate(dateCreated)}</div>
  </header>`;
};

export default renderArticleHeader;
