import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  Fade,
  Backdrop,
  Chip,
  Divider,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { User, Phone, Mail, X, Save } from "lucide-react"; // Usando lucide para frescura
import AuthContext from "../../context/Auth/AuthContext";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 450 },
  bgcolor: "background.paper",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(229,56,136,0.15)",
  p: 4,
  outline: "none",
  background: "linear-gradient(to bottom right, #ffffff, #fff9fb)",
};

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "rgba(255,255,255,0.6)",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "rgba(216,46,136,0.15)",
    },
    "&:hover fieldset": {
      borderColor: "#D82E7A",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D82E7A",
      boxShadow: "0 4px 12px rgba(216,46,136,0.08)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#888",
    "&.Mui-focused": { color: "#D82E7A" },
  },
};

const ModalUpdateUser = ({ open, onClose }) => {
  const { usuario, UpdateUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    tiktokUsername: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario && open) {
      setForm({
        name: usuario.name || "",
        phone: usuario.phone || "",
        email: usuario.email || "",
        tiktokUsername: usuario.tiktokUsername || "",
      });
    }
  }, [usuario, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await UpdateUser(form);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          style: { backgroundColor: "rgba(216,46,122,0.1)" },
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 800,
                  color: "#D82E7A",
                  letterSpacing: "-0.5px",
                }}
              >
                Editar Perfil
              </Typography>
              <Typography variant='body2' sx={{ color: "#888" }}>
                Mantén tu información actualizada
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{ color: "#bbb", "&:hover": { color: "#D82E7A" } }}
            >
              <X size={20} />
            </IconButton>
          </Box>

          <Stack spacing={2.5}>
            <TextField
              label='Nombre Completo'
              name='name'
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <User size={18} color='#D82E7A' />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label='Teléfono'
              name='phone'
              value={form.phone}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone size={18} color='#D82E7A' />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label='Correo Electrónico'
              name='email'
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Mail size={18} color='#D82E7A' />
                  </InputAdornment>
                ),
              }}
            />
            <Divider sx={{ my: 1, borderColor: "rgba(216,46,122,0.15)" }}>
              <Chip
                label='Usuario Tiktok'
                sx={{
                  bgcolor: "rgba(216,46,122,0.1)",
                  color: "#D82E7A",
                  fontWeight: "bold",
                }}
              />
            </Divider>

            <TextField
              label='Usuario Tiktok'
              name='tiktokUsername'
              autoComplete='off'
              value={form.tiktokUsername || ""}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AlternateEmailIcon size={18} color='#D82E7A' />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant='contained'
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              startIcon={!loading && <Save size={18} />}
              sx={{
                bgcolor: "#D82E7A",
                borderRadius: "14px",
                py: 1.8,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 8px 20px rgba(216,46,122,0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#c02567",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 25px rgba(216,46,122,0.4)",
                },
                "&.Mui-disabled": {
                  bgcolor: "rgba(216,46,122,0.5)",
                  color: "white",
                },
              }}
            >
              {loading ? "Sincronizando..." : "Guardar Cambios"}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalUpdateUser;
