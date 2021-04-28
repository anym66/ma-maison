import React, { useState } from "react";

export default function Toggle(props) {
  const [state, setState] = useState(true);
  return (
    <button
      onClick={() => {
        setState(previousState => !previousState);
        props.onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? "Éteindre" : "Allumer"}
    </button>
  );
}