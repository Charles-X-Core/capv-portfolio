import { useEffect, useRef, useState } from "react";

export function useNavbarScroll({
  threshold = 5,
  menuOpen = false,
} = {}) {
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return;

      const current = window.scrollY;
      const delta = current - lastScroll.current;

      setAtTop(current <= 10);

      if (Math.abs(delta) < threshold) return;

      if (delta > 0 && current > 50) {
        setHidden(true);
      }

      if (delta < 0) {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, menuOpen]);

  return { hidden, atTop };
}
