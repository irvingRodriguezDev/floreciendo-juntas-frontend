import { useRef, useEffect } from "react";

export const useChatAutoScroll = (items, disabled) => {
  const listRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;

    const threshold = 20;
    isAtBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el || disabled) return;

    if (isAtBottomRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [items, disabled]);

  return { listRef, handleScroll };
};
