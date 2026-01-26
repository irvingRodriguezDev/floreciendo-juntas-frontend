// components/PostCommentItem.jsx
import { Avatar, Box, Typography } from "@mui/material";

export default function PostCommentItem({ comment }) {
  return (
    <Box id={`comment-${comment.id}`} sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Avatar src={comment.user.profileImage} />
      <Box>
        <Typography variant='subtitle2'>{comment.user.name}</Typography>
        <Typography variant='body2'>{comment.content}</Typography>
      </Box>
    </Box>
  );
}
