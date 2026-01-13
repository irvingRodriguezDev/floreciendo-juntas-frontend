import { Avatar, Box, Typography, Stack } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostMediaSwiper from "./PostMediaSwipper";

dayjs.extend(relativeTime);
dayjs.locale("es");

const CommentItem = ({ comment }) => {
  return (
    <Box display='flex' gap={1.5}>
      <Avatar src={comment.user.profileImage} sx={{ width: 32, height: 32 }} />

      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            backgroundColor: "#f8f8f8",
            px: 1.5,
            py: 1,
            borderRadius: "14px",
          }}
        >
          <Typography fontWeight={600} fontSize='0.8rem' color='#D72E7A'>
            {comment.user.name}
          </Typography>

          <Typography fontSize='0.85rem'>{comment.content}</Typography>
        </Box>

        {/* Media del comentario */}
        {comment.media && comment.media.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <PostMediaSwiper media={comment.media} />
          </Box>
        )}

        <Typography variant='caption' color='text.secondary' sx={{ ml: 1 }}>
          {dayjs(comment.createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentItem;
