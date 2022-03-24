const express = require("express");
const ReactDOMServer = require("react-dom/server");
const { getPage } = require("./react");
const app = express();
const port = 3000;

const renderedPage = ReactDOMServer.renderToString(getPage());

app.get("/", (req, res) => {
  res.send(renderedPage);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
