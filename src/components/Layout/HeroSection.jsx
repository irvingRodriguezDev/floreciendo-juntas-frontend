import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import heroImage from "../../assets/video/example-1.png"; // Cambia por tu imagen real

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ec4899, #8b5cf6)",
        color: "white",
        display: "flex",
        alignItems: "center",
        px: { xs: 2, md: 10 },
        pt: { xs: 10, md: 12 },
      }}
    >
      <Grid container spacing={4} alignItems='center'>
        {/* Texto */}
        <Grid xs={12} md={6}>
          <Typography variant='h2' sx={{ fontWeight: "bold", mb: 3 }}>
            Your Course <br />
            <Typography
              component='span'
              sx={{ color: "#fbcfe8", fontWeight: "bold" }}
            >
              To Success
            </Typography>
          </Typography>

          <Typography variant='body1' sx={{ mb: 5, color: "#fce7f3" }}>
            Loo you mug lurgy baking cakes boot cracking goal morish up the duff
            haggle hotpot faff about no biggie burke, is bleeder bamboozled bite
            your.
          </Typography>

          <Button
            variant='contained'
            sx={{
              backgroundColor: "#fff",
              color: "#ec4899",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#fce7f3",
              },
            }}
          >
            Ready to Get Started?
          </Button>
        </Grid>

        {/* Imagen */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 4, md: 0 },
          }}
        >
          <Box
            component='img'
            src={heroImage}
            alt='Hero'
            sx={{
              width: "80%",
              maxWidth: 500,
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.2))",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
