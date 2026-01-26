export const useSound = (soundPath) => {
  const audio = new Audio(soundPath);
  audio.volume = 0.6;

  const play = () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return play;
};
