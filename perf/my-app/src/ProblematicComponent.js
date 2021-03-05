import React from "react";

const ProblematicComponent = () => {
  return (
    <>
      <div className="App">Some content</div>

      <button
        onClick={() => {
          console.log("clicked");
        }}
      >
        Click me
      </button>
    </>
  );
};

export default ProblematicComponent;
