import { useEffect, useRef, useState } from "react";

export function useNavbarScroll({
  threshold = 5,
  menuOpen = false,
} = {}) {
  const lastScroll = useRef(window.scrollY);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return;

      const current = window.scrollY;
      const delta = current - lastScroll.current;

      const isAtTop = current <= 50;
      setAtTop(isAtTop);

      if (Math.abs(delta) < threshold) {
        lastScroll.current = current;
        return;
      }

      if (delta > 0) {
        setHidden(true);
      } else if (delta < 0) {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, menuOpen]);

  return { hidden, atTop };
}
