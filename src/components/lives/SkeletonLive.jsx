import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

const SkeletonLive = () => {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #F3F4F6",
        boxShadow: "none",
      }}
    >
      <Skeleton variant='rectangular' height={220} animation='wave' />
      <CardContent sx={{ p: 2.5 }}>
        <Skeleton variant='text' width='80%' height={28} />
        <Skeleton variant='text' width='50%' height={20} sx={{ mt: 1 }} />
        <Skeleton
          variant='rounded'
          width={110}
          height={28}
          sx={{ mt: 2, borderRadius: "50px" }}
        />
      </CardContent>
    </Card>
  );
};

export default SkeletonLive;
