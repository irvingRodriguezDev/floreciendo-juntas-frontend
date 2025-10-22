import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Collapse,
  Divider,
  Box,
  Button,
  Stack,
  TextField,
  Avatar,
  IconButton,
  CardMedia,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ReactionButtons from "./ReactionButtons";
import Comment from "./Comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es"; // español

dayjs.extend(relativeTime);
dayjs.locale("es");
const PostCard = ({ posts }) => {
  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Stack>
  );
};

const PostItem = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleAddComment = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    const newC = {
      id: Date.now(),
      author: { name: "Usuario actual", profileImage: null },
      content: trimmed,
      reactions: {},
    };

    setComments((prev) => [newC, ...prev]);
    setNewComment("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Stack direction='row' alignItems='center' spacing={2} mb={1.5}>
          <Avatar
            alt={post.author.name}
            src={post.author.profileImage || "/static/images/avatar/1.jpg"}
            sx={{
              width: 48,
              height: 48,
              border: "2px solid #FAD1E3",
              boxShadow: "0 0 0 2px rgba(216,46,136,0.2)",
            }}
          />
          <Box>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: 600, color: "#333" }}
            >
              {post.author.name}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {dayjs(post.createdAt).fromNow()}
            </Typography>
          </Box>
        </Stack>

        {/* Content */}
        <Typography variant='body1' sx={{ mb: 2, color: "#444" }}>
          {post.content}
        </Typography>

        {/* Imagen adjunta */}
        {post.attachment && (
          <Box
            sx={{
              width: "100%",
              maxHeight: 420,
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <CardMedia
              component='img'
              image={post.attachment}
              alt='Post attachment'
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        )}

        {/* Reacciones */}
        <Box sx={{ mb: 1 }}>
          <ReactionButtons target={post} />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Comentarios */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: 0.5,
          }}
        >
          <Button
            size='small'
            onClick={() => setExpanded((prev) => !prev)}
            endIcon={
              expanded ? (
                <ExpandLessIcon sx={{ color: "#D82E7A" }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "#D82E7A" }} />
              )
            }
          >
            <Typography variant='subtitle2' color='#D82E7A' fontWeight={600}>
              {expanded
                ? "Ocultar comentarios"
                : `Ver comentarios (${comments.length})`}
            </Typography>
          </Button>
        </Box>

        {/* Sección de comentarios */}
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            {comments.length > 0 ? (
              comments.map((c) => <Comment key={c.id} comment={c} />)
            ) : (
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ fontStyle: "italic" }}
              >
                No hay comentarios todavía. Sé el primero en comentar 💬
              </Typography>
            )}
          </Stack>

          {/* Input de nuevo comentario */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <TextField
              size='small'
              fullWidth
              placeholder='Escribe un comentario...'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  "& fieldset": {
                    borderColor: "rgba(216,46,136,0.3)",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D82E7A",
                    boxShadow: "0 0 0 4px rgba(216,46,136,0.1)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#D82E7A",
                    boxShadow: "0 0 0 4px rgba(216,46,136,0.15)",
                  },
                },
              }}
            />
            <Button
              variant='contained'
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              sx={{
                bgcolor: "#D82E7A",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#c0256b" },
              }}
            >
              Comentar
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Paper>
  );
};

export default PostCard;
