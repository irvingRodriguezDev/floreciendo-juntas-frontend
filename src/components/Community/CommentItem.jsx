import { Avatar, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostMediaSwiper from "./PostMediaSwipper";

dayjs.extend(relativeTime);
dayjs.locale("es");

const CommentItem = ({ comment }) => {
  return (
    <Box display='flex' gap={1.2} sx={{ width: "100%" }}>
      {/* AVATAR DEL USUARIO */}
      <Avatar
        src={comment.user?.profileImage}
        alt={comment.user?.name || "Usuario"}
        sx={{
          width: 34,
          height: 34,
          mt: 0.2,
          border: "1px solid rgba(215, 46, 122, 0.15)",
        }}
      >
        {/* Fallback de inicial por si no hay imagen de perfil */}
        {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "U"}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* BURBUJA DE COMENTARIO */}
        <Box
          sx={{
            backgroundColor: "#F5F6F8",
            px: 1.8,
            py: 1,
            borderRadius: "16px",
            display: "inline-block",
            maxWidth: "100%",
            border: "1px solid rgba(0,0,0,0.03)",
          }}
        >
          {/* NOMBRE DEL USUARIO */}
          <Typography
            fontWeight={700}
            fontSize='0.8rem'
            color='#D72E7A'
            sx={{ mb: 0.2 }}
          >
            {comment.user?.name || "Usuario de la comunidad"}
          </Typography>

          {/* CONTENIDO DEL COMENTARIO */}
          <Typography
            fontSize='0.85rem'
            color='#2C2C2C'
            sx={{
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              lineHeight: 1.45,
            }}
          >
            {comment.content}
          </Typography>
        </Box>

        {/* MEDIA DEL COMENTARIO (FOTOS/VIDEOS ADJUNTOS) */}
        {comment.media && comment.media.length > 0 && (
          <Box
            sx={{
              mt: 1,
              width: "100%",
              maxWidth: { xs: "240px", sm: "280px" },
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <PostMediaSwiper media={comment.media} />
          </Box>
        )}

        {/* FECHA/TIEMPO DEL COMENTARIO */}
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ display: "block", ml: 1.5, mt: 0.3, fontSize: "0.7rem" }}
        >
          {dayjs(comment.createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentItem;
