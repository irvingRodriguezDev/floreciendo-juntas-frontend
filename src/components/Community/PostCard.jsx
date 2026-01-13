import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostMediaSwiper from "./PostMediaSwipper";
import CommentItem from "./CommentItem";
import MessageIcon from "../icons/MessageIcon";
import CommentComposer from "./CommentComposer";
import CommunityContext from "../../context/Community/CommunityContext";

dayjs.extend(relativeTime);
dayjs.locale("es");

const PostCard = ({ post }) => {
  const { createToogleReaction } = useContext(CommunityContext);
  const [showComments, setShowComments] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
      }}
    >
      <CardHeader
        avatar={<Avatar src={post.user?.profileImage} />}
        title={
          <Typography fontWeight={700} color='#D72E7A'>
            {post.user.name}
          </Typography>
        }
        subheader={
          <Typography fontSize='0.75rem' color='text.secondary'>
            {dayjs(post.createdAt).fromNow()}
          </Typography>
        }
      />

      <CardContent>
        <Typography mb={2} fontWeight='bold'>
          {post.title}
        </Typography>

        <Typography mb={2}>{post.content}</Typography>

        {post.media && <PostMediaSwiper media={post.media} />}

        {/* Acciones */}
        <Stack direction='row' spacing={3} alignItems='center' sx={{ mt: 1 }}>
          {/* ❤️ Likes */}
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <IconButton
              onClick={() => createToogleReaction(post.id)}
              size='small'
              sx={{
                p: 0.5,
                color: post.likedByMe ? "#d82e7a" : "text.secondary",
                transition: "all .2s ease",
                "&:hover": {
                  transform: "scale(1.15)",
                  color: "#d82e7a",
                },
              }}
            >
              <LocalFloristIcon />
            </IconButton>

            <Typography
              fontSize='0.85rem'
              fontWeight={600}
              color={post.likedByMe ? "#F971AF" : "text.secondary"}
            >
              {post.likesCount || 0}
            </Typography>
          </Stack>

          {/* 💬 Comentarios */}
          <Stack
            direction='row'
            spacing={0.5}
            alignItems='center'
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => setShowComments((prev) => !prev)}
          >
            <IconButton
              size='small'
              sx={{
                p: 0.5,
                color: showComments ? "#F971AF" : "text.secondary",
                transition: "all .2s ease",
                "&:hover": {
                  transform: "scale(1.15)",
                  color: "#F971AF",
                },
              }}
            >
              <MessageIcon width={18} />
            </IconButton>

            <Typography
              fontSize='0.85rem'
              fontWeight={600}
              color={showComments ? "#F971AF" : "text.secondary"}
            >
              {post.commentsCount || 0}
            </Typography>
          </Stack>
        </Stack>

        {/* Comentarios */}
        {showComments && (
          <>
            <Divider sx={{ my: 2 }} />

            <Stack spacing={2} mb={2}>
              {post.comments?.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </Stack>

            <CommentComposer post_id={post.id} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
