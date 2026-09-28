import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFE4EC, #FFF)",
        }}
      >
        <Container maxWidth='sm'>
          <Box
            sx={{
              textAlign: "center",
              p: 4,
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 20px 60px rgba(216, 46, 136, 0.25)",
              border: "1px solid rgba(255, 105, 180, 0.25)",
            }}
          >
            <Typography
              variant='h1'
              fontWeight={800}
              sx={{
                color: "#E53888",
                mb: 1,
                fontSize: { xs: "4rem", sm: "5rem" },
              }}
            >
              404
            </Typography>

            <Typography
              variant='h5'
              fontWeight={600}
              sx={{ color: "#3A0D25", mb: 1 }}
            >
              Esta flor no existe 🌸
            </Typography>

            <Typography variant='body1' sx={{ color: "#5E1B3A", mb: 3 }}>
              La página que buscas no floreció o fue movida a otro jardín.
            </Typography>

            <Button
              onClick={() => navigate("/")}
              variant='contained'
              sx={{
                borderRadius: "999px",
                px: 4,
                py: 1.2,
                background: "linear-gradient(135deg, #E53888, #FF7EB3)",
                boxShadow: "0 10px 30px rgba(229, 56, 136, 0.35)",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(135deg, #D92E88, #FF5FA2)",
                },
              }}
            >
              Volver a Floreciendo Juntas
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default NotFound;
