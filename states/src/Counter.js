import { useDispatch, useSelector } from "react-redux";
import "./Counter.css";
import { incrementCounter, selectCount } from "./redux";

const Counter = ({ counterId }) => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount)({ counterId });

  return (
    <div className="counter">
      <button
        onClick={() => {
          dispatch(incrementCounter({ counterId }));
        }}
      >
        Click me
      </button>
      <div>{count}</div>
    </div>
  );
};

export default Counter;
