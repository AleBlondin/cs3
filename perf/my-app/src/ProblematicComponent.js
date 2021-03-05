import React, { useEffect, useState } from "react";

const complexCounterUpdate = (counter) => {
  console.log({ counter });
  Array.from(Array(200)).map((index) => {
    console.log(index);
  });
};

const ProblematicComponent = () => {
  const [counter, setCounter] = useState({counterValue: 0});

  useEffect(() => {
    complexCounterUpdate(counter.counterValue);
  }, [counter]);

  return (
    <>
      <div className="App">Some content</div>

      <button
        onClick={() => {
          setCounter({ counterValue: 0 });
        }}
      >
        {counter.counterValue}
      </button>
    </>
  );
};

export default ProblematicComponent;
