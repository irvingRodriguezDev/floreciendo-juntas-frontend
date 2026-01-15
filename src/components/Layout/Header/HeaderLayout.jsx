import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";

import HeaderLogo from "./HeaderLogo";
import DesktopNav from "./DesktopNav";

const HeaderLayout = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // <900px

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='relative'
        elevation={scrolled ? 6 : 0}
        sx={{
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          background: scrolled
            ? "linear-gradient(180deg, rgba(229,83,140,0.06), rgba(255,255,255,0.12))"
            : "linear-gradient(180deg, rgba(229,83,140,0.05), rgba(0,0,0,0.06))",
          backdropFilter: "blur(14px)",
          transition: "all .4s ease",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          <HeaderLogo scrolled={scrolled} />

          {!isMobile && <DesktopNav />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderLayout;
