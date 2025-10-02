import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const BannerEvents = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 0 }}>
      <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            width: "96%",
            height: "350px",
            backgroundColor: "rgba(238, 158, 234, 0.2)",
            // borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(11px)",
            border: "1px solid rgba(238, 158, 234, 0.3)",
            paddingTop: { xs: 10, md: 15 },
            paddingLeft: { xs: 3, md: 10 },
          }}
        >
          <Typography variant='h3' color='#E53888' textAlign='left'>
            All Events 🎉
          </Typography>
          <Typography variant='subtitle1' color='white' textAlign='left'>
            Event that help beginner designers become true unicorns.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BannerEvents;
