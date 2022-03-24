const express = require("express");
const ReactDOMServer = require("react-dom/server");
const { getPage } = require("./react");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const renderedPage = ReactDOMServer.renderToString(getPage());

  res.send(renderedPage);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
