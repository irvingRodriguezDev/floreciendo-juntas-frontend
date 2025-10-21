import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";

const Wall = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Irving Rodríguez",
      content: "¡Hola a todos! Probando el nuevo muro 💬",
      reactions: { like: 2 },
      comments: [
        {
          id: 11,
          author: "Ana",
          content: "Se ve increíble 😍",
          reactions: { love: 2 },
        },
        {
          id: 12,
          author: "Luis",
          content: "Buen trabajo 👏",
          reactions: { like: 1 },
        },
      ],
    },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleCreatePost = (content) => {
    const newPost = {
      id: Date.now(),
      author: "Usuario actual",
      content,
      reactions: {},
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setOpenModal(false);
  };

  return (
    <Box sx={{ maxWidth: "75%", mx: "auto", mt: 4 }}>
      <Stack spacing={2}>
        <Button
          variant='contained'
          sx={{ bgcolor: "#D82E7A", borderRadius: "12px" }}
          onClick={() => setOpenModal(true)}
        >
          Crear publicación
        </Button>

        <CreatePostModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreatePost}
        />

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </Box>
  );
};

export default Wall;
