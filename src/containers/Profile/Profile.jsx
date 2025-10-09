import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import AuthContext from "../../context/Auth/AuthContext";
import UserCard from "./UserCard";
const Profile = () => {
  const { autenticado } = useContext(AuthContext);
  return (
    <Layout>
      <UserCard />
    </Layout>
  );
};

export default Profile;
