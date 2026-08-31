import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import CoursesContext from "../../context/Courses/CoursesContext";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

const RecognitionSection = ({ courseId, safeUserName }) => {
  const { downloadCertificate } = useContext(CoursesContext);
  return (
    <Box
      sx={{
        mt: 3.5,
        p: { xs: 3, md: 4 },
        borderRadius: "24px",
        backgroundColor: "#FFF4FA",
        border: "1px dashed #E53888",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          mb: 2,
          border: "1px solid #FCE7F3",
        }}
      >
        🌸
      </Box>
      <Typography
        variant='h6'
        sx={{
          fontWeight: 900,
          color: "#1F2937",
          letterSpacing: "-0.5px",
          mb: 0.5,
        }}
      >
        ¡Tu reconocimiento está listo!
      </Typography>

      <Typography
        variant='body2'
        sx={{ color: "#6B7280", maxWidth: "400px", mb: 3, lineHeight: 1.5 }}
      >
        Felicidades por concluir tus horas de práctica. Ya puedes descargar tu
        reconocimiento oficial firmado por las instructoras de Wapizima.
      </Typography>

      <Button
        variant='contained'
        onClick={() => downloadCertificate(courseId, safeUserName || "")}
        endIcon={<SimCardDownloadIcon sx={{ fontSize: "18px" }} />}
        sx={{
          width: { xs: "100%", sm: "auto" },
          minWidth: "240px",
          backgroundColor: "#E53888",
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: "0.9rem",
          textTransform: "none",
          borderRadius: "14px",
          px: 4,
          py: 1.4,
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#C2185B",
            boxShadow: "none",
          },
        }}
      >
        Descargar Reconocimiento
      </Button>
    </Box>
  );
};

export default RecognitionSection;
