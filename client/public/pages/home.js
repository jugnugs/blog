import bloglist from "../views/bloglist.js";

const renderHomePage = () => {
  return `<h1>blog list</h1>
${bloglist}`;
};

export default renderHomePage;
