import { useState } from "react";
import "./Form.css";

export const InitialScreen = ({ send }) => {
  return (
    <div className="form">
      <button onClick={() => send("GO_TO_FORM")}>Please fill form</button>
    </div>
  );
};

export const Form1 = ({ send, savedValue }) => {
  const [value, setValue] = useState(savedValue);

  return (
    <div className="form">
      <input
        id="input1"
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      ></input>
      <div>
        <button onClick={() => send({ type: "CONTINUE", value })}>
          Go to Next
        </button>
      </div>
    </div>
  );
};

export const Form2 = ({ send }) => {
  return (
    <div className="form">
      <input id="input1"></input>
      <div>
        <button onClick={() => send("GO_BACK")}>Go Back</button>
        <button onClick={() => send("CONTINUE")}>Go to Next</button>
      </div>
    </div>
  );
};

export const Form3 = ({ send }) => {
  return (
    <div className="form">
      <input id="input1"></input>
      <div>
        <button onClick={() => send("GO_BACK")}>Go Back</button>
        <button onClick={() => send("SUBMIT")}>Submit</button>
      </div>
    </div>
  );
};

export const FinalScreen = () => {
  return <div className="form">Success</div>;
};
