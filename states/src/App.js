import "./App.css";
import Counter from "./Counter";
import Vault from "./Vault";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="counters">
          <Counter counterId={1}></Counter>
          <Counter counterId={2}></Counter>
          <Counter counterId={3}></Counter>
        </div>
        <div className="vault">
          <Vault></Vault>
        </div>
      </div>
    </div>
  );
}

export default App;
