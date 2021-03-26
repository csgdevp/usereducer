import React, { useReducer, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// function Counter() {
//   const [sum, dispatch] = useReducer((state, action) => {
//     return state + action;
//   }, 0);
//   return (
//     <>
//       {sum}
//       <button onClick={() => dispatch(1)}>Add 1</button>
//     </>
//   );
// }

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: state.length,
          name: action.name,
        },
      ];
    case "remove":
      return state.filter((_, index) => index !== action.index);
    case "clear":
      return [];
    default:
      return state;
  }
};

function ShoppingList() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer(reducer, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "add",
      name: inputRef.current.value,
    });
    inputRef.current.value = "";
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => dispatch({ type: "remove", index })}>
              X
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "clear" })}>Clear</button>
    </>
  );
}

const reducer1 = (state, action) => {
  switch (action.type) {
    case "advance":
      return (state + 1) % 4;
    case "off":
      return 0;
    default:
      return state;
  }
};

function Room() {
  const [lightLevel, dispatch] = useReducer(reducer1, 0);
  return (
    <>
      <button onClick={() => dispatch({ type: "advance" })}>
        Change Level
      </button>
      <h1>You are on Level: {describeLightLevel(lightLevel)}</h1>
      <button onClick={() => dispatch({ type: "off" })}>Turn Off</button>
    </>
  );
}

function describeLightLevel(level) {
  switch (level) {
    case 0:
      return "off";
    case 1:
      return "low";
    case 2:
      return "medium";
    case 3:
      return "high";
    default:
      return "broken";
  }
}

const reducer2 = (state, action) => {
  switch (action.type) {
    case "keypress":
      // if the lock is already unlocked, leave it alone
      if (state.status === "unlocked") {
        return state;
      }

      // if this key matches the next one in the sequence, keep it
      if (action.value === parseInt(state.combo[state.nextKeyIndex], 10)) {
        const nextKeyIndex = state.nextKeyIndex + 1;
        return {
          ...state,
          nextKeyIndex,
          status: nextKeyIndex === state.combo.length ? "unlocked" : "locked",
        };
      } else {
        // if this key was wrong, reset
        return {
          ...state,
          nextKeyIndex: 0,
        };
      }

    default:
      return state;
  }
};

function Keypad({ combo }) {
  const [lock, dispatch] = useReducer(reducer2, {
    combo,
    status: "locked",
    nextKeyIndex: 0,
  });

  return (
    <>
      <p>Enter the correct combination:</p>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <button
          key={i}
          onClick={() => dispatch({ type: "keypress", value: i })}
        >
          {i}
        </button>
      ))}
      <p>The lock is {lock.status}</p>
      <p>You've gotten {lock.nextKeyIndex} keys correct.</p>
    </>
  );
}

ReactDOM.render(<Keypad combo="1234" />, document.getElementById("root"));
