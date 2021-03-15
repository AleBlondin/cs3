import "./App.css";
import Counter from "./Counter";
import Vault from "./Vault";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="counters">
          <Counter></Counter>
          <Counter></Counter>
          <Counter></Counter>
        </div>
        <div className="vault">
          <Vault></Vault>
        </div>
      </div>
    </div>
  );
}

export default App;
