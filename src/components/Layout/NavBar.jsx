import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position='fixed'
      elevation={scrolled ? 3 : 0}
      sx={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        color: scrolled ? "text.primary" : "#fff",
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 } }}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: "bold",
            color: scrolled ? "primary.main" : "#fff",
            transition: "color 0.3s ease",
          }}
        >
          Bisy <span style={{ color: "#ec4899" }}>LMS</span>
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          <Typography
            sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
          >
            Home
          </Typography>
          <Typography
            sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
          >
            Courses
          </Typography>
          <Typography
            sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
          >
            Blog
          </Typography>
          <Typography
            sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
          >
            Contact
          </Typography>
        </Box>

        <Button
          variant='outlined'
          sx={{
            borderColor: scrolled ? "primary.main" : "#fff",
            color: scrolled ? "primary.main" : "#fff",
            "&:hover": {
              backgroundColor: scrolled ? "primary.main" : "#fff",
              color: scrolled ? "#fff" : "primary.main",
            },
            borderRadius: 2,
            px: 3,
          }}
        >
          Join for Free
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
