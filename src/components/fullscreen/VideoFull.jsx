import { useRef, useState } from "react";
import "./VideoFull.css";

const VideoFull = ({ url }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // ⬅ inicia en pausa

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className='video-container'>
      <video
        ref={videoRef}
        className='video-player'
        loop
        playsInline
        controls
        controlsList='nodownload noplaybackrate'
        disablePictureInPicture
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={url} type='video/mp4' />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Botón central Play / Pause */}
      <button
        className='video-play-button'
        onClick={togglePlay}
        aria-label='Reproducir o pausar video'
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>

      <div className='video-overlay' />
      <div className='video-gradient' />
    </section>
  );
};

export default VideoFull;
