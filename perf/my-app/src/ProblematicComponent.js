import React, { useEffect, useState } from "react";

const complexCounterUpdate = (counter) => {
  console.log({ counter });
  Array.from(Array(200)).map((index) => {
    console.log(index);
  });
};

const ProblematicComponent = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    complexCounterUpdate(counter);
  }, [counter]);

  return (
    <>
      <div className="App">Some content</div>

      <button
        onClick={() => {
          complexCounterUpdate(counter);
          setCounter(counter + 1);
        }}
      >
        {counter}
      </button>
    </>
  );
};

export default ProblematicComponent;
