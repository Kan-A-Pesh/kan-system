import {useEffect, useRef, useState} from "react";

export default function DebugWindow() {
  const refreshCount = useRef(0);
  const refreshElement = useRef<HTMLSpanElement | null>(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!refreshElement.current) return;
    refreshCount.current++;
    refreshElement.current.textContent = refreshCount.current.toString();
  });

  return (
    <div>
      <h4>Hello world!</h4>
      <p>
        Refresh count: <span ref={refreshElement}></span>
      </p>
      <h5>Super counter game</h5>
      <button onClick={() => setCount((prev) => prev + 1)}>Click to increase count: {count}</button>
    </div>
  );
}
