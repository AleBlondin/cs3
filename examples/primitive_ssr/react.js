const React = require("react");

const getPage = () => {
  const child = React.createElement("div", {}, new Date().toISOString());
  const element = React.createElement("div", { className: "container" }, child);

  return element;
};

exports.getPage = getPage;
