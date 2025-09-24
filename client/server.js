const express = require("express");
const path = require("path")
const app = express();

app.use(express.static("public"));

app.get(/^\/([^\/]+)(?:\/.*)?$/, (req, res) => {
    const options = {
        root: path.join(__dirname, "public")
    }
    res.sendFile("index.html", options);
});

app.listen("3000", () => {
    console.log("Server running!")
});