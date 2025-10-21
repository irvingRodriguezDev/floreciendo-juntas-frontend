import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import ReactionButtons from "./ReactionButtons";

const Comment = ({ comment }) => {
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 1,
        borderRadius: "12px",
        backgroundColor: "#fafafa",
      }}
    >
      <Typography variant='subtitle2' color='text.secondary'>
        {comment.author}
      </Typography>
      <Typography variant='body2'>{comment.content}</Typography>
      <Box sx={{ mt: 0.5 }}>
        <ReactionButtons target={comment} isComment />
      </Box>
    </Paper>
  );
};

export default Comment;
