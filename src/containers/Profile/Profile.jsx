import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import AuthContext from "../../context/Auth/AuthContext";
const Profile = () => {
  const { autenticado } = useContext(AuthContext);
  console.log(autenticado);

  return <Layout>Profile</Layout>;
};

export default Profile;
