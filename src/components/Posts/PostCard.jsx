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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ReactionButtons from "./ReactionButtons";
import Comment from "./Comment";

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
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        transition: "all 0.2s ease-in-out",
        "&:hover": { boxShadow: "0 6px 14px rgba(0,0,0,0.1)" },
      }}
    >
      <CardContent>
        {/* Header */}
        <Stack direction='row' alignItems='center' spacing={1}>
          <Avatar
            alt={post.author.name}
            src={post.author.profileImage || "/static/images/avatar/1.jpg"}
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant='subtitle2' color='text.secondary'>
            {post.author.name}
          </Typography>
        </Stack>

        {/* Content */}
        <Typography variant='body1' sx={{ mt: 1, mb: 1 }}>
          {post.content}
        </Typography>

        {/* Reactions */}
        <ReactionButtons target={post} />

        <Divider sx={{ my: 1 }} />

        {/* Comments toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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
            {expanded ? (
              <Typography variant='subtitle2' color='#D82E7A'>
                Ocultar comentarios
              </Typography>
            ) : (
              <Typography variant='subtitle2' color='#D82E7A'>
                Ver comentarios ({comments.length})
              </Typography>
            )}
          </Button>
        </Box>

        {/* Comments Section */}
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Stack spacing={1} sx={{ mt: 1 }}>
            {comments.length > 0 ? (
              comments.map((c) => <Comment key={c.id} comment={c} />)
            ) : (
              <Typography variant='body2' color='text.secondary'>
                No hay comentarios todavía. Sé el primero en comentar.
              </Typography>
            )}
          </Stack>

          {/* New comment input */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
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
                    boxShadow: "0 0 0 4px rgba(216,46,136,0.2)",
                  },
                },
              }}
            />
            <Button
              variant='contained'
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              sx={{ bgcolor: "#D82E7A", borderRadius: "12px" }}
            >
              Comentar
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default PostCard;
