import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import Navbar from "./NavBar";
import HeroSection from "./HeroSection";

const Layout = ({ children }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      minHeight='100vh' // ocupa toda la altura de la pantalla
    >
      {/* <Navbar />
      <HeroSection /> */}
      <Header />
      <Box component='main' flex={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
