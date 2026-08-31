import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export const useIvsLivePlayer = (playbackUrl) => {
  const videoRef = useRef(null);
  const ivsPlayerRef = useRef(null);
  const bufferTimeoutRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [videoOrientation, setVideoOrientation] = useState("landscape");
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    let plyrPlayer = null;

    const initPlayer = () => {
      if (!window.IVSPlayer || !videoRef.current) return;
      try {
        const ivsPlayer = window.IVSPlayer.create();
        ivsPlayerRef.current = ivsPlayer;

        ivsPlayer.attachHTMLVideoElement(videoRef.current);
        ivsPlayer.load(playbackUrl);

        ivsPlayer.setMuted(true);
        ivsPlayer.setVolume(1.0);
        ivsPlayer.play();

        const { PlayerState, PlayerEventType } = window.IVSPlayer;

        ivsPlayer.addEventListener(PlayerEventType.INITIALIZED, () => {
          const quality = ivsPlayer.getQuality();
          setVideoOrientation(
            quality.height > quality.width ? "portrait" : "landscape",
          );
        });

        ivsPlayer.addEventListener(PlayerState.BUFFERING, () => {
          bufferTimeoutRef.current = setTimeout(() => {
            setIsSlowConnection(true);
          }, 2500);
        });

        ivsPlayer.addEventListener(PlayerState.PLAYING, () => {
          if (bufferTimeoutRef.current) clearTimeout(bufferTimeoutRef.current);
          setIsSlowConnection(false);
        });

        ivsPlayer.addEventListener(PlayerEventType.ERROR, (err) => {
          console.warn("IVS Network/Playback Error:", err);
          setIsSlowConnection(true);
        });

        plyrPlayer = new Plyr(videoRef.current, {
          controls: [],
          autoplay: true,
          clickToPlay: false,
        });

        setLoading(false);
      } catch (err) {
        console.error("IVS Player error:", err);
      }
    };

    const timer = setTimeout(initPlayer, 500);

    return () => {
      clearTimeout(timer);
      if (bufferTimeoutRef.current) clearTimeout(bufferTimeoutRef.current);
      if (plyrPlayer) plyrPlayer.destroy();
      if (ivsPlayerRef.current) {
        ivsPlayerRef.current.pause();
        ivsPlayerRef.current.delete();
      }
    };
  }, [playbackUrl]);

  const handleReloadPlayer = () => {
    if (ivsPlayerRef.current) {
      ivsPlayerRef.current.load(playbackUrl);
      ivsPlayerRef.current.play();
    }
    setIsSlowConnection(false);
  };

  return {
    videoRef,
    ivsPlayerRef,
    loading,
    videoOrientation,
    isSlowConnection,
    handleReloadPlayer,
  };
};
