import BlogApiClient from "../api/blog.js";
import renderBlogCard from "../components/blog_card.js";

const renderBlogList = async () => {
  const blogApiClient = new BlogApiClient();
  const data = await blogApiClient.fetchBlogList();

  return `<div class="blog-list">
    ${data
      .map((d) =>
        renderBlogCard(
          d.title,
          d.dateCreated,
          d.subtitle,
          d.keywords,
          `${d.id}-${d.slug}"`
        )
      )
      .join("")}
    </div>`;
};

export default renderBlogList;
