/**
 *
 * @param {number} currentPage
 * @param {number} totalPageCount
 */
const buildPageNavigation = (currentPage, totalPageCount) => {
  const container = document.createElement("div");
  container.className = "page-nav";

  const prevPageButton = document.createElement("a");
  prevPageButton.href = `/?page=${currentPage - 1}`;
  prevPageButton.dataset.paginate = "";
  prevPageButton.textContent = "<";
  if (currentPage === 1) {
    prevPageButton.style.visibility = "hidden";
  }
  container.appendChild(prevPageButton);

  const pageNumberDisplay = document.createElement("div");
  pageNumberDisplay.textContent = `${currentPage.toString()}/${totalPageCount} `;
  container.appendChild(pageNumberDisplay);

  const nextPageButton = document.createElement("a");
  nextPageButton.href = `/?page=${currentPage + 1}`;
  nextPageButton.dataset.paginate = "";
  nextPageButton.textContent = ">";
  if (currentPage === totalPageCount) {
    nextPageButton.style.visibility = "hidden";
  }
  container.appendChild(nextPageButton);

  return container;
};

export default buildPageNavigation;
