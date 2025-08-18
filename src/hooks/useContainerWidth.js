import { useEffect, useState } from "react";

export default function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    
    return () => ro.disconnect();
  }, [ref]);

  return width;
}
