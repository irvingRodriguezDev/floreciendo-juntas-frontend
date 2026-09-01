// Estilos limpios y de alto contraste para las cajas de texto
const InputStyles = {
  mb: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#FFFFFF", // Fondo blanco sólido para lectura perfecta
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
    padding: "16px 18px",
    fontSize: "15px",
    fontWeight: "500",
  },
  "& .MuiInputLabel-root": {
    color: "#6B7280",
    fontSize: "15px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#E53888",
    fontWeight: "700",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "13px",
    marginLeft: "6px",
  },
};

export default InputStyles;
