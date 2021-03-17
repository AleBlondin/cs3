import { useState } from "react";
import "./App.css";
import Counter from "./Counter";
import Vault from "./Vault";

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  return (
    <div className="App">
      <div className="container">
        <div className="counters">
          <Counter counterId={1}></Counter>
          <Counter counterId={2}></Counter>
          <Counter counterId={3}></Counter>
        </div>
        <div className="vault">
          <Vault counts={[count1, count2, count3]}></Vault>
        </div>
      </div>
    </div>
  );
}

export default App;
