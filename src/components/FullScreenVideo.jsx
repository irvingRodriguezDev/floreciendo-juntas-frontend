import React from "react";
import "./VideoPlayer.css";
import video from "../assets/video/14436214_3840_2160_60fps.mp4";
const VideoPlayer = () => {
  return (
    <div className='video-container'>
      <video className='video-player' autoPlay muted loop playsInline controls>
        <source src={video} type='video/mp4' />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className='video-gradient'></div>
    </div>
  );
};

export default VideoPlayer;
