import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      minHeight='100vh' // ocupa toda la altura de la pantalla
    >
      <Header />
      <Box component='main' flex={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
