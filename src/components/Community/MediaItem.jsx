import { Box } from "@mui/material";
import { useMediaReady } from "../../hooks/useMediaReady";
import VideoPlayerCommunity from "./VideoPlayerCommunity";

const MediaItem = ({ item, isActive }) => {
  const ready = useMediaReady(item.url, item.type);
  if (!ready) return null;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: item.type === "video" ? "300px" : "auto", // ✅ Altura mínima solo para videos
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {item.type === "image" ? (
        <Box
          component='img'
          src={item.url}
          alt=''
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "80vh",
            display: "block",
            objectFit: "contain",
            imageOrientation: "from-image",
            borderRadius: 2,
          }}
        />
      ) : (
        <VideoPlayerCommunity src={item.url} isActive={isActive} />
      )}
    </Box>
  );
};

export default MediaItem;
