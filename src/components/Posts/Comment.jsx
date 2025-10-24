import React, { useContext } from "react";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { motion } from "framer-motion";
import AuthContext from "../../context/Auth/AuthContext"; // Asegúrate de importar tu contexto correcto
import PostsContext from "../../context/Posts/PostsContext";

dayjs.extend(relativeTime);
dayjs.locale("es");

const Comment = ({ comment }) => {
  const { deleteComment } = useContext(PostsContext);
  const { usuario } = useContext(AuthContext);

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
    } catch (err) {
      console.error("Error al eliminar comentario:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: "16px",
          backgroundColor: "#fff5f8",
          border: "1px solid #f9c6d3",
          boxShadow: "0 2px 6px rgba(229, 56, 136, 0.05)",
          "&:hover": { boxShadow: "0 3px 10px rgba(229, 56, 136, 0.1)" },
          transition: "all 0.3s ease",
        }}
      >
        <Stack direction='row' spacing={1.5} alignItems='flex-start'>
          <Avatar
            src={comment.user?.profileImage}
            alt={comment.user?.name}
            sx={{ width: 36, height: 36, border: "2px solid #f9c6d3" }}
          />
          <Box sx={{ flex: 1 }}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography
                variant='subtitle2'
                sx={{ color: "#E53888", fontWeight: 600 }}
              >
                {comment.user?.name || "Usuario"}
              </Typography>

              {/* Mostrar el botón eliminar solo si el usuario es el autor */}
              {usuario?.id === comment.user?.id && (
                <Tooltip title='Eliminar comentario' arrow>
                  <IconButton
                    size='small'
                    onClick={() => handleDelete(comment.id)}
                    sx={{
                      color: "#E53888",
                      "&:hover": {
                        backgroundColor: "rgba(229, 56, 136, 0.08)",
                      },
                    }}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>

            <Typography
              variant='body2'
              sx={{
                mt: 0.5,
                color: "#4a4a4a",
                lineHeight: 1.4,
              }}
            >
              {comment.content}
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "#a0a0a0", fontStyle: "italic" }}
            >
              {dayjs(comment.createdAt).fromNow()}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </motion.div>
  );
};

export default Comment;
