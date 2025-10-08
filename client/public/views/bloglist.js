const data = ["testid", "fe0c4f55-f754-40c8-8b34-c9145d51a953", "orange"];

const renderList = () => {
  return data
    .map((d) => `<a href="/blog/${d}" data-link>${d}</h3><br>`)
    .join("");
};

const html = `${renderList()}`;

export default html;
