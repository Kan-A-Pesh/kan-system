import {useEffect, useState} from "react";

export default function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    });

    return () => clearInterval(interval);
  }, []);

  return <span title={time.toLocaleString()}>{time.toLocaleTimeString()}</span>;
}
