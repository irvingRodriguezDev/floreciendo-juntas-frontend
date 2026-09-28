import React, { useContext, useEffect, useState } from "react";
import InvitacionDistribucion from "./Invitation";
import StoresContext from "../../../context/Stores/StoresContext";
import { Typography } from "@mui/material";
import MyStoreCard from "./MyStoreCard";
const Store = () => {
  const { getMyStore, user_store } = useContext(StoresContext);
  useEffect(() => {
    getMyStore();
  }, []);

  return (
    <>
      {user_store === null ? (
        <InvitacionDistribucion />
      ) : (
        <>
          <MyStoreCard store={user_store} />
        </>
      )}
    </>
  );
};

export default Store;
