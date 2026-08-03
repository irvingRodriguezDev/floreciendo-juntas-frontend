import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Stack,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import { alerts } from "../../utils/Alerts";
import { MethodPost } from "../../config/Service";

const MAIN_PINK = "#D72E79";

const WishModal = ({
  open,
  onClose,
  targetUser,
  onSuccess,
  type = "BIRTHDAY_WISH", // "BIRTHDAY_WISH" o "DIRECT_MESSAGE"
  defaultContextText = "", // Ej: el título del post si viene de una publicación
}) => {
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  // Nombre formateado de la persona
  const displayName = targetUser?.name || targetUser?.nombre || "Usuaria";
  const parts = displayName.trim().split(" ");
  const firstName = parts.length > 1 ? `${parts[0]} ${parts[1]}` : parts[0];

  const isBirthday = type === "BIRTHDAY_WISH";

  useEffect(() => {
    if (targetUser) {
      if (isBirthday) {
        // Mensaje por defecto para Cumpleaños
        setMessageText(
          `¡Feliz cumpleaños, ${firstName}! 🎂🎉 Te deseo un año lleno de mucho éxito, bendiciones y alegría. ¡A seguir floreciendo juntas! ✨💖`,
        );
      } else if (defaultContextText) {
        // Mensaje por defecto para Posts/Publicaciones
        setMessageText(
          `¡Hola ${firstName}! Vi tu publicación sobre "${defaultContextText}" y me pareció muy genial... ✨`,
        );
      } else {
        // Mensaje genérico para Chat Directo
        setMessageText(`¡Hola ${firstName}! Te envío un mensaje... ✨`);
      }
    }
  }, [targetUser, firstName, type, defaultContextText]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !targetUser?.id) return;

    try {
      setLoading(true);

      await MethodPost("/messages/wish-birthday", {
        receiverId: targetUser.id,
        messageText: messageText.trim(),
        type: type, // Enviamos dinámicamente si es BIRTHDAY_WISH o DIRECT_MESSAGE
      });

      alerts.success(
        isBirthday ? "¡Abrazo enviado! 🎉" : "¡Mensaje enviado! 💬",
        isBirthday
          ? `Tu felicitación fue enviada con éxito a ${firstName}.`
          : `Tu mensaje privado fue enviado a ${firstName}.`,
      );

      if (onSuccess) onSuccess(targetUser.id);

      onClose();
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alerts.error(
        "Ocurrió un error",
        error.response?.data?.message || "No pudimos enviar tu mensaje.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!targetUser) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 1,
          background: "linear-gradient(135deg, #FFFFFF 0%, #FFF0F6 100%)",
        },
      }}
    >
      {/* Botón de Cierre */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose} size='small' sx={{ color: "#757575" }}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>

      {/* Encabezado con Avatar */}
      <DialogContent sx={{ pt: 0, textAlign: "center" }}>
        <Stack alignItems='center' spacing={1.5} sx={{ mb: 2 }}>
          <Avatar
            src={
              targetUser.profileImage
                ? `${targetUser.profileImage}`
                : `${import.meta.env.VITE_CDN_URL}/production/statics/FLOR+ROSA+CONVEN.png`
            }
            alt={displayName}
            sx={{
              width: 72,
              height: 72,
              border: `3px solid ${MAIN_PINK}`,
              boxShadow: "0px 4px 12px rgba(215, 46, 121, 0.2)",
            }}
          />

          <Box textAlign='center'>
            <Typography
              variant='h6'
              sx={{ fontWeight: 800, color: MAIN_PINK, lineHeight: 1.2 }}
            >
              {isBirthday
                ? `¡Celebra a ${firstName}! 🎂`
                : `Escríbele a ${firstName} 💬`}
            </Typography>
            <Typography variant='body2' sx={{ color: "#616161", mt: 0.5 }}>
              {isBirthday
                ? "Escríbele un mensaje privado de cumpleaños"
                : "Inicia una conversación privada de apoyo o consulta"}
            </Typography>
          </Box>
        </Stack>

        {/* Input de Mensaje */}
        <TextField
          multiline
          rows={4}
          fullWidth
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder={
            isBirthday ? "Escribe un lindo deseo..." : "Escribe tu mensaje..."
          }
          variant='outlined'
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              bgcolor: "#FFFFFF",
              "& fieldset": {
                borderColor: "#FCE4EC",
              },
              "&:hover fieldset": {
                borderColor: MAIN_PINK,
              },
              "&.Mui-focused fieldset": {
                borderColor: MAIN_PINK,
              },
            },
          }}
        />
      </DialogContent>

      {/* Acciones */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          fullWidth
          onClick={handleSendMessage}
          disabled={loading || !messageText.trim()}
          variant='contained'
          startIcon={isBirthday ? <FavoriteIcon /> : <SendIcon />}
          sx={{
            bgcolor: MAIN_PINK,
            color: "#FFFFFF",
            borderRadius: "50px",
            py: 1.2,
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.95rem",
            boxShadow: "0px 4px 12px rgba(215, 46, 121, 0.25)",
            "&:hover": {
              bgcolor: "#B82363",
            },
          }}
        >
          {loading
            ? "Enviando..."
            : isBirthday
              ? "Enviar felicitación 💖"
              : "Enviar mensaje 💬"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WishModal;
