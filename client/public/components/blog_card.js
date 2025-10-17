import { formatDate } from "../utils/date.js";

/**
 *
 * @param {string} title
 * @param {string} dateCreated
 * @param {string} subtitle
 * @param {string[]} tags
 */
const renderBlogCard = (title, dateCreated, subtitle, tags, link) => {
  return `<article class="blog-card">
    <h3><a href="/blog/${link}" data-link>${title}</a></h3>
    <div>${formatDate(dateCreated)}</div>
    <div>${subtitle}</div>
    <ul>
      ${tags.map((tag) => `<li>#${tag}</li>`).join("")}
    </ul>
  </article>
  `;
};

export default renderBlogCard;
