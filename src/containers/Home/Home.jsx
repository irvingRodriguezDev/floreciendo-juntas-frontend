import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import Layout from "../../components/Layout/Layout";
import BannerHome from "../../components/Banner/BannerHome";
import About from "../../components/About/About";
import Systems from "../Systems/Systems";
import NewCourses from "../../components/courses/newCourses/NewCourses";
import TopCourses from "../../components/courses/topCourses/TopCourses";
import WhyChooseUsSection from "../../components/WhyChose/WhyChoseUsSection";
import LatestEventsSection from "../../components/events/LatestEventsSections";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
const Home = () => {
  return (
    <Layout>
      <Grid container spacing={2} sx={{ mt: 10, padding: "25px" }}>
        <Grid size={12}>
          <BannerHome />
        </Grid>
        <Grid size={12}>
          <About />
        </Grid>
        <Grid size={12}>
          <Systems />
        </Grid>
        <Grid size={12}>
          <NewCourses />
        </Grid>
        <Grid size={12}>
          <TopCourses />
        </Grid>
        <Grid size={12}>
          <WhyChooseUsSection />
        </Grid>
        <Grid size={12}>
          <LatestEventsSection />
        </Grid>
        <Grid size={12}>
          <SocialLinks />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
