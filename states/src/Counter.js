import "./Counter.css";

const Counter = ({ count, setCount }) => {
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
