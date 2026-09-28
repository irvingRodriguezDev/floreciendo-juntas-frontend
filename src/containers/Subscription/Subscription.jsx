import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import SubscriptionButton from "../../components/Payment/SubscriptionButton";
import { Box } from "@mui/material";
import AuthContext from "../../context/Auth/AuthContext";
const Subscription = () => {
  const { autenticado, usuario } = useContext(AuthContext);
  const isSuscribed = usuario.isSubscribed;

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          background: "linear-gradient(to top, #fff 0%, #F7BED3 100%)",
          display: "flex",
          justifyContent: "center", // eje horizontal
          alignItems: "center", // eje vertical 👈 clave
        }}
      >
        <SubscriptionButton userId={usuario ? usuario.id : null} />
      </Box>
    </Layout>
  );
};

export default Subscription;
