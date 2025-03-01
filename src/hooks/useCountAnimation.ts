import { animate } from "framer-motion";
import { useEffect, useState } from "react";

export const useCountAnimation = (
  endValue: number,
  duration: number = 1,
  startValue: number = 0
) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    const controls = animate(startValue, endValue, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => {
        setCount(Math.round(value * 100) / 100);
      },
    });

    return controls.stop;
  }, [endValue, duration, startValue]);

  return count;
};
