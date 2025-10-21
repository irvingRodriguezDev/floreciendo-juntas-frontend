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
} from "@mui/material";
import ReactionButtons from "./ReactionButtons";
import Comment from "./Comment";

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newC = {
      id: Date.now(),
      author: "Usuario actual",
      content: newComment,
      reactions: {},
    };
    setComments([newC, ...comments]);
    setNewComment("");
  };

  return (
    <Card sx={{ borderRadius: "16px" }}>
      <CardContent>
        <Typography variant='subtitle2' color='text.secondary'>
          {post.author}
        </Typography>
        <Typography variant='body1' sx={{ mt: 1 }}>
          {post.content}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <ReactionButtons target={post} />
        </Box>

        <Divider sx={{ my: 1 }} />

        <Button size='small' onClick={() => setExpanded(!expanded)}>
          {expanded
            ? "Ocultar comentarios"
            : `Ver comentarios (${comments.length})`}
        </Button>

        <Collapse in={expanded}>
          <Stack spacing={1} sx={{ mt: 1 }}>
            {comments.map((c) => (
              <Comment key={c.id} comment={c} />
            ))}
          </Stack>

          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
              size='small'
              fullWidth
              placeholder='Escribe un comentario...'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant='contained' onClick={handleAddComment}>
              Comentar
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default PostCard;
