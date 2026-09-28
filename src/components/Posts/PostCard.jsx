import React, { useContext, useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  Divider,
  Box,
  Button,
  Stack,
  TextField,
  Avatar,
  CardMedia,
  Paper,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReactionButtons from "./ReactionButtons";
import Comment from "./Comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import PostsContext from "../../context/Posts/PostsContext";
import AuthContext from "../../context/Auth/AuthContext";

dayjs.extend(relativeTime);
dayjs.locale("es");

const PostCard = ({ posts = [] }) => {
  const { getReactionsForPosts, reactionsSummary } = useContext(PostsContext);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (posts && posts.length && usuario?.id) {
      const postIds = posts.map((p) => p.id);
      getReactionsForPosts(postIds, usuario.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario?.id, posts?.length]);

  if (!posts || !posts.length) return null;

  return (
    <Stack spacing={2.5} sx={{ width: "100%" }}>
      {posts.map((post) => {
        const reactionsData = reactionsSummary[post.id] || {
          summary: {},
          userReaction: null,
        };

        return (
          <PostItem
            key={post.id}
            post={{
              ...post,
              reactions: reactionsData.summary,
              userReaction: reactionsData.userReaction,
            }}
          />
        );
      })}
    </Stack>
  );
};

const PostItem = ({ post }) => {
  const { createComment, reactionsSummary } = useContext(PostsContext);
  const { usuario } = useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");

  const comments = post.comments || [];

  const handleAddComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    const data = {
      userId: usuario?.id,
      postId: post.id,
      comment: trimmed,
    };

    await createComment(data, usuario?.id);
    setNewComment("");
  };

  return (
    <Paper
      elevation={0} // 100% Look plano e impecable
      sx={{
        borderRadius: "24px",
        backgroundColor: "#ffffff",
        border: "1px solid #F3F4F6",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        {/* Cabecera de Autor Editorial */}
        <Stack direction='row' alignItems='center' spacing={2} mb={2}>
          <Avatar
            alt={post.author?.name}
            src={post.author?.profileImage}
            sx={{
              width: 44,
              height: 44,
              backgroundColor: "#FFF5F7",
              color: "#E53888",
              fontWeight: "bold",
              fontSize: "14px",
              border: "1px solid #FCE7F3",
            }}
          >
            {post.author?.name?.charAt(0).toUpperCase() || "A"}
          </Avatar>
          <Box>
            <Typography
              variant='subtitle2'
              sx={{
                fontWeight: "800",
                color: "#1F2937",
                lineHeight: 1.2,
                mb: 0.3,
              }}
            >
              {post.author?.name || "Alumna Wapizima"}
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "#9CA3AF", fontWeight: 500 }}
            >
              {dayjs(post.createdAt).fromNow()}
            </Typography>
          </Box>
        </Stack>

        {/* Cuerpo del Texto */}
        <Typography
          variant='body1'
          sx={{
            mb: 2,
            color: "#374151",
            lineHeight: 1.6,
            fontSize: "0.98rem",
            whiteSpace: "pre-line", // Mantiene saltos de línea de la alumna
          }}
        >
          {post.content}
        </Typography>

        {/* Imagen Adjunta Tipo Galería */}
        {post.attachments && (
          <Box
            sx={{
              width: "100%",
              maxHeight: 460,
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#F9FAFB",
              border: "1px solid #F3F4F6",
              mb: 2.5,
            }}
          >
            <CardMedia
              component='img'
              image={post.attachments}
              alt='Avance de práctica'
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                maxHeight: 460,
              }}
            />
          </Box>
        )}

        {/* Barra de Acciones e Interacción */}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mt: 1, pt: 1 }}
        >
          {/* Componente de Reacciones */}
          <Box>
            <ReactionButtons
              target={{
                ...post,
                reactions: reactionsSummary[post.id] || {},
                userReaction: post.userReaction || null,
              }}
            />
          </Box>

          {/* Gatillo Desplegable Comentarios */}
          <Button
            size='small'
            onClick={() => setExpanded((prev) => !prev)}
            startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: "18px" }} />}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              textTransform: "none",
              color: expanded ? "#E53888" : "#6B7280",
              fontWeight: "bold",
              fontSize: "13px",
              borderRadius: "10px",
              px: 1.5,
              py: 0.5,
              "&:hover": {
                backgroundColor: "#FFF5F7",
                color: "#E53888",
              },
            }}
          >
            {comments.length === 0
              ? "Comentar"
              : `${comments.length} comentarios`}
          </Button>
        </Stack>

        {/* Sección Expandible de Comentarios en Bloque Dedicado */}
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Box
            sx={{
              mt: 2.5,
              p: 2,
              borderRadius: "18px",
              backgroundColor: "#F9FAFB", // Contenedor sutil para anidar respuestas
              border: "1px solid #F3F4F6",
            }}
          >
            <Stack spacing={2} sx={{ mb: 2 }}>
              {comments.length > 0 ? (
                comments.map((c) => <Comment key={c.id} comment={c} />)
              ) : (
                <Typography
                  variant='caption'
                  sx={{
                    color: "#9CA3AF",
                    fontStyle: "italic",
                    display: "block",
                    py: 1,
                  }}
                >
                  No hay comentarios todavía en esta publicación.
                </Typography>
              )}
            </Stack>

            <Divider sx={{ my: 1.5, borderColor: "#E5E7EB" }} />

            {/* Input de Respuesta Tipo Cápsula */}
            <Stack direction='row' alignItems='center' gap={1.5}>
              <TextField
                size='small'
                fullWidth
                placeholder='Escribe una respuesta a tus compañeras...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#ffffff",
                    fontSize: "0.9rem",
                    "& fieldset": {
                      borderColor: "#E5E7EB",
                    },
                    "&:hover fieldset": { borderColor: "#F472B6" },
                    "&.Mui-focused fieldset": { borderColor: "#E53888" },
                  },
                }}
              />
              <Button
                variant='contained'
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                sx={{
                  backgroundColor: "#E53888",
                  color: "white",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 2.5,
                  fontSize: "13px",
                  boxShadow: "none",
                  height: "38px",
                  "&:hover": {
                    backgroundColor: "#C2185B",
                    boxShadow: "none",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#E5E7EB",
                    color: "#9CA3AF",
                  },
                }}
              >
                Responder
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
    </Paper>
  );
};

export default PostCard;
