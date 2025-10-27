const fs = require("fs");
const matter = require("gray-matter");

const postsArray = [];
const blogsDir = __dirname + "/public/blogs";
const manifestDir = __dirname + "/public/api/posts.json";

console.log("[LOG]: Begin generating blog manifest file...");
try {
  const filenames = fs.readdirSync(blogsDir);
  filenames.forEach((filename) => {
    const content = fs.readFileSync(blogsDir + "/" + filename, "utf-8");
    const formattedPost = {
      ...matter(content).data,
      content: matter(content).content,
    };
    postsArray.push(formattedPost);
  });
  const jsonString = JSON.stringify(postsArray, null, 2);
  fs.writeFileSync(manifestDir, jsonString);
  console.log("[LOG]: Finished generating file.");
} catch (err) {
  console.error("[ERR]: Error trying to generate file: ", err);
}
console.log("---------------------------");
