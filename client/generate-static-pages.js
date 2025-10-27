const fs = require("fs");
// @ts-ignore
const posts = require("./public/api/posts.json");

const outputDir = __dirname + "/dist/pages";

/**
 * @param {string} title
 * @param {string} subtitle
 * @param {string} content
 * @returns {string}
 */
function createPageHtml(title, subtitle, content) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
      <link href="/main.css" rel="stylesheet">
  </head>
  <body>
      <nav>
        <a href="/" data-link>Home</a>
        <a href="/about" data-link>About</a>
      </nav>

      <main id="app">
        <!-- The static content for this post is injected here for crawlers -->
        <article>
            <h2>${title}</h2>
            <h3>${subtitle}</h3>
            <div class="post-content">${content}</div>
        </article>
      </main>

      <footer></footer>

      <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.7/purify.min.js"></script>
      <script type="module" src="/app.js"></script>
  </body>
</html>`;
}

function generateStaticPages() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`[LOG] Created output directory: ${outputDir}`);
  }

  posts.forEach((post) => {
    const filePath = outputDir + `/${post.id + "-" + post.slug}.html`;
    const constructedHTML = createPageHtml(
      post.title,
      post.subtitle,
      post.content
    );

    fs.writeFileSync(filePath, constructedHTML.trim());
  });
}

console.log("[LOG]: Begin generating static pages for SEO..");
try {
  generateStaticPages();
  console.log("[LOG]: Finished generating pages.");
} catch (err) {
  console.error("[ERR]: Error trying to generate pages: ", err);
}
console.log("---------------------------");
