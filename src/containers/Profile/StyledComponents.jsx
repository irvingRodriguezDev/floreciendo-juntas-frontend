import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

// --- Paleta de Colores Rosado/Morado ---
const primaryPink = "#e651ad"; // Rosa principal
const secondaryPurple = "#7b1fa2"; // Morado oscuro
const glassColor = "rgba(255, 255, 255, 0.2)"; // Blanco semi-transparente para el glass
const glassBorder = "1px solid rgba(255, 255, 255, 0.4)";

// --- 1. Banner Principal (Fondo Degradado y Hojas) ---
export const StyledBanner = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(3),
  // Degradado Rosado/Morado como el fondo
  background: `linear-gradient(90deg, ${secondaryPurple} 0%, ${primaryPink} 100%)`,
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  minHeight: 250,
}));

// --- 2. Contenedor con Efecto Glassmorphism (Responsivo) ---
export const StyledGlassContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})(({ theme, isMobile }) => ({
  // Alineación general del texto y contenido
  textAlign: "center",
  padding: isMobile ? theme.spacing(2) : theme.spacing(3),
  maxWidth: "95%",
  width: 900,

  // ESTILOS GLASSMORPHISM
  backgroundColor: glassColor, // Color semi-transparente
  backdropFilter: "blur(10px)", // El filtro blur es clave para el glassmorphism
  WebkitBackdropFilter: "blur(10px)", // Soporte para navegadores Webkit
  borderRadius: theme.spacing(2),
  border: glassBorder, // Borde más claro y sutil
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", // Sombra para profundidad

  // Posicionamiento
  position: "relative",
  zIndex: 10, // Asegura que esté sobre las hojas
}));

// --- 3. Caja del Avatar e Info de Contacto ---
export const StyledAvatarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // Se mueve a la izquierda, replicando el diseño original
  position: "absolute",
  left: 30,
  bottom: -30,
  zIndex: 20,

  // Responsividad: en móvil, lo centramos y ajustamos el margen
  [theme.breakpoints.down("sm")]: {
    position: "static",
    marginTop: theme.spacing(2),
    justifyContent: "center",
    left: "auto",
    bottom: "auto",
  },
}));

// --- 4. Decoración de Hojas (Usando Pseudo-elementos o una imagen SVG) ---
// NOTA: Para un idéntico 100%, deberás usar una imagen SVG de las hojas.
// Si no tienes el SVG, puedes usar un ícono de MUI con rotación como alternativa.
// Aquí asumiremos que tienes una imagen de hoja (leaf-decoration.svg).
export const StyledLeafDecoration = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 150, // Ajusta el tamaño de la decoración
  height: "100%",
  top: 0,
  zIndex: 5,

  // Esto es un placeholder. ¡Reemplaza con tu imagen SVG!
  backgroundImage: "url('/leaf-decoration.svg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  opacity: 0.6, // Las hojas tienen un tono semi-transparente

  // Responsividad
  [theme.breakpoints.down("md")]: {
    width: 100,
    opacity: 0.4,
  },
  [theme.breakpoints.down("sm")]: {
    display: "none", // Ocultar en móviles para ahorrar espacio
  },
}));

// --- 5. Ícono de Red Social ---
export const StyledSocialIcon = styled(IconButton)(({ theme }) => ({
  color: "#444",
  margin: theme.spacing(0, 0.5),
  "&:hover": {
    color: primaryPink,
    backgroundColor: "transparent",
  },
}));

// --- 6. Caja de Biografía y Bestseller ---
export const StyledContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  backgroundColor: "white",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[1],
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

// --- 7. Caja Bestseller ---
export const StyledBestsellerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f3e5f5", // Tono lavanda/rosa claro
  color: secondaryPurple,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  width: 120,
  minHeight: 100,
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));
