import { useEffect, useState } from "react";

export const useCountAnimation = (
  endValue: number,
  duration: number = 1000,
  startValue: number = 0
) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      setCount(startValue + (endValue - startValue) * easeOutQuart(progress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [endValue, duration, startValue]);

  return count;
};

// Easing function for smooth animation
const easeOutQuart = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};
