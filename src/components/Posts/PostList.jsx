import React from "react";
import { Stack } from "@mui/material";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default PostList;
