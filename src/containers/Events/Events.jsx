import React from "react";
import Layout from "../../components/Layout/Layout";
import BannerEvents from "../../components/events/BannerEvents";
import CardEvent from "../../components/events/CardEvent";
import { Grid } from "@mui/material";
const Events = () => {
  const events = [
    {
      img: "https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/event/grid-type-01.jpg",
      title: "International Education Fair 2024",
      date: "11 Jan 2024",
      time: "8:00 am - 5:00 pm",
      location: "IAC Building",
      id: 1,
    },
    {
      img: "https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/event/grid-type-02.jpg",
      title: "International Education Fair 2024",
      date: "15 Feb 2024",
      time: "8:00 am - 5:00 pm",
      location: "IAC Building",
      id: 2,
    },
    {
      img: "https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/event/grid-type-03.jpg",
      title: "International Education Fair 2024",
      date: "12 Jan 2024",
      time: "8:00 am - 5:00 pm",
      location: "IAC Building",
      id: 3,
    },
    {
      img: "https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/event/grid-type-05.jpg",
      title: "International Education Fair 2024",
      date: "19 Jan 2024",
      time: "8:00 am - 5:00 pm",
      location: "IAC Building",
      id: 4,
    },
  ];
  return (
    <Layout>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid size={12} sx={{ mt: 13 }}>
          <BannerEvents />
        </Grid>
        <Grid size={12} sx={{ mt: { xs: -15, md: -25 } }}>
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
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
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
