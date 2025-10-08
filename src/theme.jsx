import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#F5CBD0", // rosa claro
      main: "#F1BDCE", // rosa medio
      dark: "#E893B5", // rosa intenso
      contrastText: "#fff",
    },
    secondary: {
      main: "#E893B5",
      contrastText: "#fff",
    },
    background: {
      default: "#FBFAFF", // fondo general
      paper: "#F8E7F0", // fondo de tarjetas/papers
    },
    text: {
      primary: "#E893B5",
      secondary: "#333",
    },
  },
});

export default theme;
