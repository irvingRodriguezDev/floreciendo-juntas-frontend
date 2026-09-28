import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  TextField,
  InputAdornment,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll"; // 👈 Icono para palomitas dobles
import ChatContext from "../../context/Chat/ChatContext";
import AuthContext from "../../context/Auth/AuthContext";
import dayjs from "dayjs";
import { MethodPost } from "../../config/Service";

const inputStyles = {
  mb: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#FFFFFF",
    transition: "all 0.2s ease-in-out",
    "& fieldset": {
      borderColor: "#FCE7F3",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#E53888",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E53888",
      boxShadow: "0 0 0 4px rgba(229, 56, 136, 0.15)",
    },
  },
  "& .MuiInputBase-input": {
    color: "#1F2937",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
  },
};

const MAIN_PINK = "#D72E79";

const InboxDrawer = () => {
  const {
    openInboxDrawer,
    toggleInboxDrawer,
    conversations,
    getConversations,
    activeConversation,
    setActiveConversation,
    messages,
    loading,
  } = useContext(ChatContext);

  const { usuario } = useContext(AuthContext);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (openInboxDrawer) {
      getConversations();
    }
  }, [openInboxDrawer]);

  const handleSendMessage = async () => {
    if (!replyText.trim() || !activeConversation) return;

    try {
      setSending(true);
      const receiverId = activeConversation.otherUser.id;

      await MethodPost("/messages/wish-birthday", {
        receiverId,
        messageText: replyText.trim(),
        type: "DIRECT_MESSAGE",
      });

      setReplyText("");
      setActiveConversation(activeConversation);
      getConversations();
    } catch (error) {
      console.error("Error al responder mensaje:", error);
    } finally {
      setSending(false);
    }
  };

  // Helper para renderizar los iconos de lectura tipo WhatsApp
  const renderStatusIcon = (status) => {
    if (status === "sent_unread") {
      return (
        <DoneAllIcon
          sx={{
            fontSize: 16,
            color: "#9E9E9E",
            mr: 0.5,
            verticalAlign: "middle",
          }}
        />
      );
    }
    if (status === "sent_read") {
      return (
        <DoneAllIcon
          sx={{
            fontSize: 16,
            color: MAIN_PINK,
            mr: 0.5,
            verticalAlign: "middle",
          }}
        />
      );
    }
    return null;
  };

  return (
    <Drawer
      anchor='right'
      open={openInboxDrawer}
      onClose={() => {
        toggleInboxDrawer(false);
        setActiveConversation(null);
      }}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          borderRadius: { sm: "20px 0 0 20px" },
          bgcolor: "#FAF8F9",
        },
      }}
    >
      {/* 🟢 ENCABEZADO DEL DRAWER */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#FFFFFF",
          borderBottom: "1px solid #F3E5F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction='row' alignItems='center' spacing={1}>
          {activeConversation && (
            <IconButton
              size='small'
              onClick={() => setActiveConversation(null)}
              sx={{ color: MAIN_PINK }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          <Typography variant='h6' sx={{ fontWeight: 800, color: MAIN_PINK }}>
            {activeConversation
              ? activeConversation.otherUser?.name || "Chat"
              : "Bandeja de Entrada 💬"}
          </Typography>
        </Stack>

        <IconButton
          onClick={() => {
            toggleInboxDrawer(false);
            setActiveConversation(null);
          }}
          size='small'
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* 🔴 CONTENIDO: VISTA DE CHAT O VISTA DE LISTA */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            py={5}
          >
            <CircularProgress sx={{ color: MAIN_PINK }} />
          </Box>
        ) : activeConversation ? (
          /* ================= VISTA DE MENSAJES (CHAT ACTIVO) ================= */
          <Box
            sx={{
              flex: 1,
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              overflowY: "auto",
            }}
          >
            {messages.map((msg) => {
              const isMine = Number(msg.senderId) === Number(usuario?.id);

              return (
                <Box
                  key={msg.id}
                  sx={{
                    alignSelf: isMine ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      px: 2,
                      borderRadius: isMine
                        ? "18px 18px 2px 18px"
                        : "18px 18px 18px 2px",
                      bgcolor: isMine ? MAIN_PINK : "#FFFFFF",
                      color: isMine ? "#FFFFFF" : "#212121",
                      border: isMine ? "none" : "1px solid #F8BBD0",
                      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <Typography variant='body2' sx={{ whiteSpace: "pre-line" }}>
                      {msg.body}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        display: "block",
                        textAlign: "right",
                        mt: 0.5,
                        opacity: 0.75,
                        fontSize: "0.68rem",
                      }}
                    >
                      {dayjs(msg.createdAt).format("HH:mm")}
                    </Typography>
                  </Paper>
                </Box>
              );
            })}
          </Box>
        ) : (
          /* ================= VISTA DE LISTA DE CONVERSACIONES ================= */
          <List sx={{ p: 0 }}>
            {conversations.length === 0 ? (
              <Box textAlign='center' py={6} px={3}>
                <Typography
                  variant='body2'
                  sx={{ color: "#757575", fontWeight: 500 }}
                >
                  Aún no tienes mensajes recibidos ni enviados.
                </Typography>
              </Box>
            ) : (
              conversations.map((conv) => {
                const other = conv.otherUser;
                const isUnread = conv.isUnread;

                return (
                  <React.Fragment key={conv.id}>
                    <ListItem
                      button
                      onClick={() => setActiveConversation(conv)}
                      sx={{
                        py: 1.5,
                        px: 2,
                        bgcolor: isUnread ? "#FFF0F5" : "transparent", // 🌟 Fondo rosa claro si NO está leído
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: isUnread ? "#FFE4E1" : "#FFF0F6",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={
                            other?.profileImage ||
                            "https://cdn.floreciendojuntas.com/production/statics/FLOR+ROSA+CONVEN.png"
                          }
                          sx={{ border: `2px solid ${MAIN_PINK}` }}
                        />
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <Typography
                            variant='subtitle2'
                            sx={{ fontWeight: isUnread ? 800 : 600 }}
                          >
                            {other?.name || "Usuaria"}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant='body2'
                            noWrap
                            sx={{
                              color: isUnread ? "#212121" : "#616161",
                              fontWeight: isUnread ? 700 : 400,
                              fontSize: "0.82rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {/* Renderizar palomita gris / rosa si el mensaje fue enviado por mí */}
                            {renderStatusIcon(conv.status)}
                            {conv.lastMessage?.body || "Mensaje enviado"}
                          </Typography>
                        }
                      />

                      <Stack alignItems='flex-end' spacing={0.5} sx={{ ml: 1 }}>
                        <Typography
                          variant='caption'
                          sx={{
                            color: isUnread ? MAIN_PINK : "#9E9E9E",
                            fontWeight: isUnread ? 700 : 400,
                            fontSize: "0.72rem",
                          }}
                        >
                          {dayjs(conv.lastMessageAt).format("DD/MM")}
                        </Typography>

                        {/* 🔴 Indicador rosa pulsante para mensajes sin leer */}
                        {isUnread && (
                          <Badge
                            color='primary'
                            variant='dot'
                            sx={{
                              "& .MuiBadge-badge": {
                                backgroundColor: MAIN_PINK,
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                              },
                            }}
                          />
                        )}
                      </Stack>
                    </ListItem>
                    <Divider component='li' sx={{ borderColor: "#F8BBD0" }} />
                  </React.Fragment>
                );
              })
            )}
          </List>
        )}
      </Box>

      {/* 🟡 INPUT PARA RESPONDER (Solo si hay un chat activo) */}
      {activeConversation && (
        <Box
          sx={{
            p: 1.5,
            bgcolor: "#FFFFFF",
            borderTop: "1px solid #F3E5F5",
          }}
        >
          <TextField
            fullWidth
            size='small'
            placeholder='Escribe una respuesta...'
            value={replyText}
            sx={inputStyles}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    disabled={sending || !replyText.trim()}
                    onClick={handleSendMessage}
                    sx={{ color: MAIN_PINK }}
                  >
                    <SendIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: "25px", bgcolor: "#FAF8F9" },
            }}
          />
        </Box>
      )}
    </Drawer>
  );
};

export default InboxDrawer;
