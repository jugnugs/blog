const data = ["1-first-journey-go", "2-second-test", "3-test-slug"];

const renderList = () => {
  return data
    .map((d) => `<a href="/blog/${d}" data-link>${d}</h3><br>`)
    .join("");
};

const html = `${renderList()}`;

export default html;
