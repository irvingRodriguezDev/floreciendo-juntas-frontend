import React from "react";
import BannerHome from "../components/Banner/BannerHome";
import WhyChooseUsSection from "../components/WhyChose/WhyChoseUsSection";
import About from "../components/About/About";
import Layout from "../components/Layout/Layout";
import RifaSalonPro from "../components/Raffle/Raffle";
import { Box, Button } from "@mui/material";

const NewHome = () => {
  return (
    <div>
      {/* <Layout> */}
      <BannerHome />
      <Box sx={{ padding: "30px" }}>
        <Button variant='contained' size='large' sx={{ bgcolor: "#FA71AF" }}>
          suscribete
        </Button>
      </Box>
      <WhyChooseUsSection />
      <About />
      <RifaSalonPro />
      {/* </Layout> */}
    </div>
  );
};

export default NewHome;
