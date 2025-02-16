import cupcake from "@/assets/cupcake/cupcake.png";
import styles from "./cupcake.module.css";
import {useCallback, useEffect, useRef, useState} from "react";

const ROTATION_SPEED = 10;
const SHAKE_SPEED = 100;
const REDUCE_SPEED = 15;
const MAX_SHAKE = 25;

export default function CupcakeWindow() {
  const [count, setCount] = useState(0);

  const cupcakeRef = useRef<HTMLImageElement | null>(null);
  const shakeRef = useRef(0);

  const handleClick = useCallback(() => {
    shakeRef.current += 2;
    if (shakeRef.current > MAX_SHAKE) shakeRef.current = MAX_SHAKE;
    setCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let frameRequestId = -1;
    let lastTime = performance.now();

    let rotate = 0;

    const onNewFrame: FrameRequestCallback = (time) => {
      if (!cupcakeRef.current) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      const shake = Math.sin((time / 1000) * SHAKE_SPEED);
      const x = Math.sin(rotate) * shakeRef.current * shake;
      const y = -Math.cos(rotate) * shakeRef.current * shake;
      cupcakeRef.current.style.translate = `${x}px ${y}px`;

      rotate = (rotate + deltaTime * ROTATION_SPEED) % (2 * Math.PI);
      shakeRef.current -= deltaTime * REDUCE_SPEED;
      if (shakeRef.current < 0) shakeRef.current = 0;
      frameRequestId = requestAnimationFrame(onNewFrame);
    };

    frameRequestId = requestAnimationFrame(onNewFrame);

    return () => {
      cancelAnimationFrame(frameRequestId);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Click on cupcake! Get more cupcake!</h4>

      <h2>{count}</h2>

      <img src={cupcake} height="150px" className={styles.cupcake} ref={cupcakeRef} onClick={handleClick} />
    </div>
  );
}
