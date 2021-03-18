import React, { useState } from "react";

const Counter = ({ title = "Some content" }) => {
  const [count, setCounter] = useState(0);

  return (
    <>
      <div className="App">Some content</div>

      <button
        onClick={() => {
          setCounter(count + 1);
        }}
      >
        Click me
      </button>
      {count}
    </>
  );
};

export default Counter;
