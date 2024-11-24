import { useEffect, useState, RefObject } from "react";

export const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || !(element instanceof Element)) return; // Exit if the ref is not yet attached to an element

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (!(entry.target instanceof Element)) continue;
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(element); // Observe the element

    return () => {
      resizeObserver.disconnect(); // Cleanup observer on unmount
    };
  }, [ref]); // Dependency on ref

  return size; // Return the size
};

export default useResizeObserver;
