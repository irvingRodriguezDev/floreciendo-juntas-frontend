import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const BarAnswers = ({
  QUICK_REACTIONS,
  handleSendReply,
  setReplyText,
  setIsTyping,
  replyText,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 12,
        left: 12,
        right: 12,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          bgcolor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(6px)",
          borderRadius: "20px",
          py: 0.5,
        }}
      >
        {QUICK_REACTIONS.map((emoji) => (
          <Typography
            key={emoji}
            onClick={() => handleSendReply(emoji)}
            sx={{
              fontSize: "22px",
              cursor: "pointer",
              transition: "transform 0.1s",
              "&:hover": { transform: "scale(1.3)" },
            }}
          >
            {emoji}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          fullWidth
          size='small'
          placeholder={`Responder a ${storyGroup?.userName || "historia"}...`}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => {
            if (!replyText) setIsTyping(false);
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(6px)",
              borderRadius: "25px",
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "#D82E7A" },
            },
          }}
          InputProps={{
            endAdornment: replyText.trim() ? (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => handleSendReply()}
                  disabled={sendingMessage}
                  sx={{ color: "#D82E7A" }}
                >
                  <SendIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Box>
    </Box>
  );
};

export default BarAnswers;
