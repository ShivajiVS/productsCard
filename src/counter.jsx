import CounterButton from "./counterButton";
import { useCallback } from "react";
import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h2>counter value is : {counter}</h2>
      <CounterButton increment={increment}></CounterButton>
    </div>
  );
}
