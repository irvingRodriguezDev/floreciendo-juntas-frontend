import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import AuthContext from "../../context/Auth/AuthContext";
import { Box, Button, Grid } from "@mui/material";
import UserProfileCard from "./UserProfileCard";
import ProfileBanner from "../../components/Banner/ProfileBanner";
import ProfileLayout from "./ProfileLayout";
const Profile = () => {
  const { autenticado } = useContext(AuthContext);
  return (
    <Layout>
      {/* <Grid container spacing={2}>
        <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <ProfileBanner />
        </Grid>
      </Grid> */}
      <ProfileLayout />
    </Layout>
  );
};

export default Profile;
