const options = { year: "numeric", month: "long", day: "numeric" };

/**
 *
 * @param {string} date
 */
const formatDate = (date) => {
  // @ts-ignore
  return new Date(date).toLocaleDateString("en-US", options);
};

export { formatDate };
