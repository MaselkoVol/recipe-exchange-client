import { useEffect, useRef, useCallback } from "react";

export type DebouncerType = {
  debounce: () => void;
  instantCallback?: () => void;
  delay: number;
};

export function useDebounce({ debounce, instantCallback, delay }: DebouncerType) {
  // contins timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // triggers function
  const trigger = useCallback(() => {
    if (instantCallback) {
      instantCallback();
    }

    // cancel previous call
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // set new deley for the call
    timerRef.current = setTimeout(() => {
      debounce();
    }, delay);
  }, [debounce, instantCallback, delay]);

  return trigger;
}
