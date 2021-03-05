import React, { useState } from "react";

const ProblematicComponent = () => {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <div className="App">Some content</div>

      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        {counter}
      </button>
    </>
  );
};

export default ProblematicComponent;
