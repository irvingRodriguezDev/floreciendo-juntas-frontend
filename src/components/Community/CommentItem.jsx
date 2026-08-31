import { Avatar, Box, Typography, Button } from "@mui/material";
import { useState, useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import PostMediaSwiper from "./PostMediaSwipper";
import CommunityContext from "../../context/Community/CommunityContext";

dayjs.extend(relativeTime);
dayjs.locale("es");

const CommentItem = ({ comment, onReply, isReply = false }) => {
  const { toggleCommentLike } = useContext(CommunityContext);

  // Estados locales optimistas para likes
  const [isLiked, setIsLiked] = useState(
    comment.isLikedByMe ?? comment.likedByMe ?? false,
  );
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);

  const handleLikeToggle = async () => {
    // Actualización optimista de la UI
    const nextLikedState = !isLiked;
    setIsLiked(nextLikedState);
    setLikesCount((prev) => (nextLikedState ? prev + 1 : prev - 1));

    try {
      if (toggleCommentLike) {
        await toggleCommentLike(comment.id || comment._id);
      }
    } catch (error) {
      // Revertir en caso de error
      setIsLiked(!nextLikedState);
      setLikesCount((prev) => (nextLikedState ? prev - 1 : prev + 1));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.2,
        width: "100%",
        mt: isReply ? 1 : 1.5,
        pl: isReply ? { xs: 1.5, sm: 3 } : 0,
        borderLeft: isReply ? "2px solid #FFF0F6" : "none",
      }}
    >
      {/* AVATAR DEL USUARIO */}
      <Avatar
        src={comment.user?.profileImage}
        alt={comment.user?.name || "Usuario"}
        sx={{
          width: isReply ? 28 : 34,
          height: isReply ? 28 : 34,
          mt: 0.2,
          border: "1px solid rgba(215, 46, 122, 0.15)",
        }}
      >
        {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "U"}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* BURBUJA DE COMENTARIO */}
        <Box
          sx={{
            backgroundColor: isReply ? "#FAFAFA" : "#F5F6F8",
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
            display='block'
          >
            {comment.user?.name ||
              comment.user?.nombre ||
              "Usuario de la comunidad"}
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
            {/* ETANQUETA DE RESPUESTA A USUARIO ESPECÍFICO (@Usuario) */}
            {comment.replyToUser && (
              <Typography
                component='span'
                fontWeight={700}
                color='#D72E7A'
                fontSize='0.85rem'
                sx={{ mr: 0.8 }}
              >
                @{comment.replyToUser.name || comment.replyToUser.nombre}
              </Typography>
            )}
            {comment.content}
          </Typography>
        </Box>

        {/* MEDIA ADJUNTA (FOTOS / VIDEOS) */}
        {comment.media && comment.media.length > 0 && (
          <Box
            sx={{
              mt: 1,
              width: "100%",
              maxWidth: { xs: "220px", sm: "260px" },
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <PostMediaSwiper media={comment.media} />
          </Box>
        )}

        {/* BARRA DE ACCIONES Y METADATOS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.8,
            ml: 1.5,
            mt: 0.4,
          }}
        >
          {/* BOTÓN LIKE */}
          <Button
            onClick={handleLikeToggle}
            disableRipple
            size='small'
            startIcon={
              isLiked ? (
                <FavoriteIcon
                  sx={{ fontSize: "0.85rem !important", color: "#D72E7A" }}
                />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: "0.85rem !important" }} />
              )
            }
            sx={{
              p: 0,
              minWidth: "auto",
              textTransform: "none",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: isLiked ? "#D72E7A" : "text.secondary",
              "&:hover": { backgroundColor: "transparent", color: "#D72E7A" },
            }}
          >
            {likesCount > 0 ? likesCount : "Me gusta"}
          </Button>

          {/* BOTÓN RESPONDER */}
          <Button
            onClick={() => onReply && onReply(comment)}
            disableRipple
            size='small'
            sx={{
              p: 0,
              minWidth: "auto",
              textTransform: "none",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "text.secondary",
              "&:hover": { backgroundColor: "transparent", color: "#D72E7A" },
            }}
          >
            Responder
          </Button>

          {/* FECHA/TIEMPO */}
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ fontSize: "0.7rem" }}
          >
            {dayjs(comment.createdAt).fromNow()}
          </Typography>
        </Box>

        {/* HILO DE RESPUESTAS ANIDADAS */}
        {!isReply && comment.replies && comment.replies.length > 0 && (
          <Box sx={{ mt: 1 }}>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id || reply._id}
                comment={reply}
                onReply={(targetReply) => onReply && onReply(targetReply)}
                isReply={true}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CommentItem;
