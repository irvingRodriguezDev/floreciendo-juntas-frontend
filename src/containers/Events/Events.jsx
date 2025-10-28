import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import BannerEvents from "../../components/events/BannerEvents";
import CardEvent from "../../components/events/CardEvent";
import { Grid } from "@mui/material";
import EventsBanner from "../../components/Banner/EventsBanner";
import EventsContext from "../../context/Events/EventsContext";
const Events = () => {
  const { getAllEvents, events } = useContext(EventsContext);
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Layout>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Grid size={12} sx={{ mt: 5 }}>
          <EventsBanner />
        </Grid>
        <Grid size={12} sx={{}}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: { xs: 2, md: 10 },
            }}
          >
            {events.map((e, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <CardEvent event={e} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Events;
