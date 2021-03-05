import React from "react";

const ProblematicComponent = () => {
  let counter = 0;

  return (
    <>
      <div className="App">Some content</div>

      <button
        onClick={() => {
          counter += 1;
          console.log({ counter });
        }}
      >
        {counter}
      </button>
    </>
  );
};

export default ProblematicComponent;
