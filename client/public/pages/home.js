import bloglist from "../views/bloglist.js";

const renderHomePage = () => {
  return `<h2>Home Page</h2>
${bloglist}`;
};

export default renderHomePage;
