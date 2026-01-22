import { useEffect, useState } from "react";

export const useMediaReady = (src, type) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!src) return;

    if (type === "image") {
      const img = new Image();
      img.src = src;
      img.onload = () => setReady(true);
    }

    if (type === "video") {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "metadata";
      video.onloadedmetadata = () => setReady(true);
    }
  }, [src, type]);

  return ready;
};
