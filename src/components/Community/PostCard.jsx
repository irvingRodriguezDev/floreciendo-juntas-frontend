import {
  Avatar,
  Box,
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
import PushPinIcon from "@mui/icons-material/PushPin";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DOMPurify from "dompurify";

import PostMediaSwiper from "./PostMediaSwipper";
import CommentItem from "./CommentItem";
import MessageIcon from "../icons/MessageIcon";
import CommentComposer from "./CommentComposer";
import CommunityContext from "../../context/Community/CommunityContext";

dayjs.extend(relativeTime);
dayjs.locale("es");

const isHtmlContent = (text) => {
  if (!text) return false;

  return /<\/?[a-z][\s\S]*>/i.test(text);
};

const PostCard = ({ post }) => {
  const { createToogleReaction } = useContext(CommunityContext);
  const [showComments, setShowComments] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {post.isPinned && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 1,
            zIndex: 1,
            transform: "rotate(45deg)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))",
            borderRadius: "0 20px 0 20px",
          }}
        >
          <PushPinIcon sx={{ color: "#D72E7A", fontSize: "24px" }} />
        </Box>
      )}

      <CardHeader
        avatar={<Avatar src={post.user?.profileImage} />}
        title={
          <Typography fontWeight={700} color='#D72E7A'>
            {post.user?.name}
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

        {/* CONTENIDO */}
        {isHtmlContent(post.content) ? (
          <Box
            mb={2}
            sx={{
              wordBreak: "break-word",

              "& p": {
                margin: "0 0 10px 0",
              },

              "& h1": {
                fontSize: "2rem",
                fontWeight: 700,
                margin: "12px 0",
              },

              "& h2": {
                fontSize: "1.6rem",
                fontWeight: 700,
                margin: "10px 0",
              },

              "& h3": {
                fontSize: "1.3rem",
                fontWeight: 700,
                margin: "8px 0",
              },

              "& ul, & ol": {
                paddingLeft: "24px",
                marginBottom: "10px",
              },

              "& li": {
                marginBottom: "4px",
              },

              "& blockquote": {
                borderLeft: "4px solid #D72E7A",
                paddingLeft: "12px",
                margin: "10px 0",
                color: "#666",
                fontStyle: "italic",
              },

              "& a": {
                color: "#1976d2",
                textDecoration: "underline",
              },

              "& img": {
                maxWidth: "100%",
                borderRadius: "8px",
              },

              "& .ql-align-center": {
                textAlign: "center",
              },

              "& .ql-align-right": {
                textAlign: "right",
              },

              "& .ql-align-justify": {
                textAlign: "justify",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content, {
                ADD_ATTR: ["target"],
              }).replace(
                /<a /g,
                '<a target="_blank" rel="noopener noreferrer" '
              ),
            }}
          />
        ) : (
          <Typography
            mb={2}
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {post.content}
          </Typography>
        )}

        {post.media?.length > 0 && (
          <PostMediaSwiper media={post.media} />
        )}

        {/* Acciones */}
        <Stack direction='row' spacing={3} alignItems='center' sx={{ mt: 1 }}>
          {/* Likes */}
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

          {/* Comentarios */}
          <Stack
            direction='row'
            spacing={0.5}
            alignItems='center'
            sx={{
              cursor: "pointer",
              userSelect: "none",
            }}
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
                <CommentItem
                  key={comment.id}
                  comment={comment}
                />
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