import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import PushPinIcon from "@mui/icons-material/PushPin";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DOMPurify from "dompurify";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PostMediaSwiper from "./PostMediaSwipper";
import CommentItem from "./CommentItem";
import MessageIcon from "../icons/MessageIcon";
import CommentComposer from "./CommentComposer";
import CommunityContext from "../../context/Community/CommunityContext";
import AuthContext from "../../context/Auth/AuthContext";
import WishModal from "../../containers/Birthdays/WishModal";
import VerifiedIcon from "../icons/VerifiedIcon";

dayjs.extend(relativeTime);
dayjs.locale("es");

const isHtmlContent = (text) => {
  if (!text) return false;
  return /<\/?[a-z][\s\S]*>/i.test(text);
};

// 🏷️ Mapeo visual de categorías para el Chip identificador
const CATEGORY_MAP = {
  "floreciendo-juntas": { label: "General", color: "#D72E7A", bg: "#FFF1F6" },
  servicios: { label: "Servicio", color: "#0284C7", bg: "#F0F9FF" },
  productos: { label: "Producto", color: "#7C3AED", bg: "#F5F3FF" },
};

const PostCard = ({ post }) => {
  const { createToogleReaction } = useContext(CommunityContext);
  const [showComments, setShowComments] = useState(false);
  const { usuario } = useContext(AuthContext);

  const postId = post.id || post._id;
  const categoryConfig =
    CATEGORY_MAP[post.type] || CATEGORY_MAP["floreciendo-juntas"];

  // 💬 Estados para el Modal de Mensaje Directo
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Abrir el modal pasando el usuario autor del post
  const handleOpenMessageModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.06)",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
          },
        }}
      >
        {/* BANNER / PIN DE PUBLICACIÓN DESTACADA */}
        {post.isPinned && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
              backgroundColor: "rgba(215, 46, 122, 0.1)",
              backdropFilter: "blur(4px)",
              borderRadius: "50%",
              p: 0.8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PushPinIcon sx={{ color: "#D72E7A", fontSize: "18px" }} />
          </Box>
        )}

        {/* CABECERA CON USUARIO, MENSAJE DIRECTO Y CHIP DE CATEGORÍA */}
        <CardHeader
          avatar={
            <Avatar
              src={post.user?.profileImage}
              sx={{ width: 42, height: 42, border: "2px solid #FFF1F6" }}
            />
          }
          title={
            <Typography
              fontWeight={700}
              color='#D72E7A'
              fontSize='0.95rem'
              display='inline-flex'
            >
              {post.user?.name || post.user?.nombre}{" "}
              {post.user.isVerified && <VerifiedIcon width={18} />}
            </Typography>
          }
          subheader={
            <Typography fontSize='0.75rem' color='text.secondary'>
              {dayjs(post.createdAt).fromNow()}
            </Typography>
          }
          action={
            <Stack
              direction='row'
              spacing={1}
              sx={{
                mt: 0.5,
                mr: post.isPinned ? 4.5 : 0.5,
                alignItems: "center",
              }}
            >
              {/* 💬 BOTÓN MENSAJE DIRECTO (Solo si no es mi propio post) */}
              {post.userId !== usuario?.id && post?.user && (
                <Tooltip
                  title={`Enviar mensaje privado a ${
                    post.user.name?.split(" ")[0] ||
                    post.user.nombre?.split(" ")[0] ||
                    "usuaria"
                  }`}
                >
                  <IconButton
                    size='small'
                    onClick={() => handleOpenMessageModal(post.user)}
                    sx={{
                      color: "#D72E79",
                      bgcolor: "#FFF0F6",
                      width: 32,
                      height: 32,
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "#FCE4EC",
                        transform: "scale(1.08)",
                      },
                    }}
                  >
                    <ChatBubbleOutlineOutlinedIcon
                      sx={{ fontSize: "1.1rem" }}
                    />
                  </IconButton>
                </Tooltip>
              )}

              {/* 🏷️ CHIP INDICADOR DE CATEGORÍA */}
              {categoryConfig?.label && (
                <Chip
                  label={categoryConfig.label}
                  size='small'
                  sx={{
                    bgcolor: categoryConfig.bg || "#FFF0F6",
                    color: categoryConfig.color || "#D72E79",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: "24px",
                  }}
                />
              )}
            </Stack>
          }
          sx={{ pb: 1 }}
        />

        <CardContent sx={{ pt: 1 }}>
          {/* TÍTULO DEL POST */}
          {post.title && (
            <Typography
              mb={1.5}
              fontWeight={700}
              fontSize='1.08rem'
              color='#1A1A1A'
            >
              {post.title}
            </Typography>
          )}

          {/* CONTENIDO TEXTO / HTML */}
          {isHtmlContent(post.content) ? (
            <Box
              mb={2}
              sx={{
                color: "#333333",
                fontSize: { xs: "0.9rem", sm: "0.95rem" },
                width: "100%",
                "&, & *": {
                  overflowWrap: "anywhere !important",
                  wordBreak: "normal !important",
                  whiteSpace: "pre-line !important",
                  maxWidth: "100% !important",
                },
                "& p": {
                  margin: "0 0 12px 0 !important",
                  lineHeight: "1.6 !important",
                },
                "& p:last-child": {
                  marginBottom: "0 !important",
                },
                "& h1": {
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  fontWeight: 700,
                  margin: "12px 0 6px",
                },
                "& h2": {
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  margin: "10px 0 6px",
                },
                "& h3": {
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  margin: "8px 0 4px",
                },
                "& a": {
                  color: "#D72E7A",
                  fontWeight: 600,
                  textDecoration: "underline",
                  overflowWrap: "anywhere !important",
                },
                "& ul, & ol": {
                  paddingLeft: "20px !important",
                  marginBottom: "12px !important",
                },
                "& .ql-align-center": { textAlign: "center !important" },
                "& .ql-align-right": { textAlign: "right !important" },
                "& .ql-align-justify": { textAlign: "justify !important" },
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content, {
                  ADD_ATTR: ["target"],
                })
                  .replace(/&nbsp;/g, " ")
                  .replace(
                    /<a /g,
                    '<a target="_blank" rel="noopener noreferrer" ',
                  ),
              }}
            />
          ) : (
            <Typography
              mb={2}
              sx={{
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                wordBreak: "normal",
                lineHeight: 1.6,
                color: "#333333",
                fontSize: "0.95rem",
              }}
            >
              {post.content}
            </Typography>
          )}

          {/* ADJUNTOS DE MEDIOS (CARRUSEL O FOTOS) */}
          {post.media?.length > 0 && (
            <Box sx={{ mb: 2, borderRadius: "12px", overflow: "hidden" }}>
              <PostMediaSwiper media={post.media} />
            </Box>
          )}

          {/* BARRA DE ACCIONES (LIKES / COMENTARIOS) */}
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            sx={{ pt: 1, borderTop: "1px solid #F5F5F5" }}
          >
            {/* BOTÓN LIKES */}
            <Stack
              direction='row'
              spacing={0.8}
              alignItems='center'
              onClick={() => createToogleReaction(postId)}
              sx={{
                cursor: "pointer",
                userSelect: "none",
                px: 1.2,
                py: 0.5,
                borderRadius: "20px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#FFF1F6",
                },
              }}
            >
              <IconButton
                size='small'
                disableRipple
                sx={{
                  p: 0,
                  color: post.likedByMe ? "#D72E7A" : "text.secondary",
                }}
              >
                <LocalFloristIcon fontSize='small' />
              </IconButton>

              <Typography
                fontSize='0.85rem'
                fontWeight={600}
                color={post.likedByMe ? "#D72E7A" : "text.secondary"}
              >
                {post.likesCount || 0} Me gusta
              </Typography>
            </Stack>

            {/* BOTÓN COMENTARIOS */}
            <Stack
              direction='row'
              spacing={0.8}
              alignItems='center'
              onClick={() => setShowComments((prev) => !prev)}
              sx={{
                cursor: "pointer",
                userSelect: "none",
                px: 1.2,
                py: 0.5,
                borderRadius: "20px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#FFF1F6",
                },
              }}
            >
              <IconButton
                size='small'
                disableRipple
                sx={{
                  p: 0,
                  color: showComments ? "#D72E7A" : "text.secondary",
                }}
              >
                <MessageIcon width={18} />
              </IconButton>

              <Typography
                fontSize='0.85rem'
                fontWeight={600}
                color={showComments ? "#D72E7A" : "text.secondary"}
              >
                {post.commentsCount || 0}{" "}
                {post.commentsCount === 1 ? "Comentario" : "Comentarios"}
              </Typography>
            </Stack>
          </Stack>

          {/* SECCIÓN DESPLEGABLE DE COMENTARIOS */}
          {showComments && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 2, borderColor: "#F5F5F5" }} />

              <Stack spacing={2} mb={2.5}>
                {post.comments?.map((comment) => (
                  <CommentItem
                    key={comment.id || comment._id}
                    comment={comment}
                  />
                ))}
              </Stack>

              <CommentComposer post_id={postId} />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* 💬 MODAL DE MENSAJE DIRECTO */}
      <WishModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        targetUser={selectedUser}
        type='DIRECT_MESSAGE'
        defaultContextText={post.title}
      />
    </>
  );
};

export default PostCard;
