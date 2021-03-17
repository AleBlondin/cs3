import { useMachine } from "@xstate/react";
import { assign, Machine } from "xstate";
import "./App.css";
import { FinalScreen, Form1, Form2, Form3, InitialScreen } from "./Form";

const formMachine = Machine({
  id: "form tunnel",
  initial: "idle",
  context: {
    value1: "",
  },
  states: {
    idle: {
      on: {
        GO_TO_FORM: "form_1",
      },
    },
    form_1: {
      on: {
        CONTINUE: "form_2",
      },
    },
    form_2: {
      on: {
        CONTINUE: "form_3",
        GO_BACK: "form_1",
      },
      entry: assign({
        value1: (_context, event) => event.value,
      }),
    },
    form_3: {
      on: {
        SUBMIT: "success",
        GO_BACK: "form_2",
      },
    },
    success: {
      type: "final",
    },
  },
});

function App() {
  const [current, send] = useMachine(formMachine);
  console.log({ current });

  return (
    <div className="App">
      <div className="container">
        {current.value === "idle" ? (
          <InitialScreen send={send}></InitialScreen>
        ) : null}
        {current.value === "form_1" ? (
          <Form1 send={send} savedValue={current.context.value1}></Form1>
        ) : null}
        {current.value === "form_2" ? <Form2 send={send}></Form2> : null}
        {current.value === "form_3" ? <Form3 send={send}></Form3> : null}
        {current.value === "success" ? <FinalScreen></FinalScreen> : null}
      </div>
    </div>
  );
}

export default App;
