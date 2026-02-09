import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";

import { MethodPut } from "../../config/Service";
import AuthContext from "../../context/Auth/AuthContext";
const inputStyles = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    "& fieldset": {
      borderColor: "rgba(216,46,136,0.3)",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#D82E7A",
      boxShadow: "0 0 0 4px rgba(216,46,136,0.1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D82E7A",
      boxShadow: "0 0 0 4px rgba(216,46,136,0.2)",
    },
  },
  "& .MuiInputBase-input": {
    color: "#333",
    padding: "16px 20px",
    fontSize: "16px",
  },
  "& .MuiInputLabel-root": {
    color: "#D82E7A",
    fontWeight: "500",
    fontSize: "16px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#D82E7A",
    fontWeight: "600",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "14px",
    marginLeft: "8px",
  },
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ModalUpdateUser = ({ open, onClose }) => {
  const { usuario, UpdateUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // 1️⃣ Precargar datos
  useEffect(() => {
    if (usuario) {
      setForm({
        name: usuario.name || "",
        phone: usuario.phone || "",
        email: usuario.email || "",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      UpdateUser(form);

      // 2️⃣ Actualizar usuario en contexto

      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant='h6' mb={2}>
          Actualizar información
        </Typography>

        <Stack spacing={2}>
          <TextField
            label='Nombre'
            name='name'
            value={form.name}
            onChange={handleChange}
            fullWidth
            sx={inputStyles}
          />

          <TextField
            label='Teléfono'
            name='phone'
            value={form.phone}
            onChange={handleChange}
            fullWidth
            sx={inputStyles}
          />

          <TextField
            label='Correo'
            name='email'
            value={form.email}
            onChange={handleChange}
            fullWidth
            sx={inputStyles}
          />

          <Button
            variant='contained'
            sx={{ bgcolor: "#d82f7a" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalUpdateUser;
