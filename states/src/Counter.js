import "./Counter.css";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </button>
      <div>{count}</div>
    </div>
  );
};

export default Counter;
