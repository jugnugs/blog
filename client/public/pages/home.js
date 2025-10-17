import renderBlogList from "../views/bloglist.js";

const renderHomePage = async () => {
  const blogList = await renderBlogList();
  return `<h1>blog list</h1>
    ${blogList}`;
};

export default renderHomePage;
