import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CardEvent from "../../components/events/CardEvent";
import { Grid, Typography } from "@mui/material";
import EventsBanner from "../../components/Banner/EventsBanner";
import EventsContext from "../../context/Events/EventsContext";
import { useDebounce } from "use-debounce";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import Pagination from "../../components/Pagination/Pagination";
import SearchCourse from "../../components/courses/SearchCourses";

const Events = () => {
  const { getAllEvents, events, currentPage, totalPages } =
    useContext(EventsContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      await getAllEvents(
        debouncedSearch.trim() === "" ? page : undefined,
        debouncedSearch.trim() === "" ? rowsPerPage : undefined,
        debouncedSearch
      );
      setLoading(false);
    };
    fetchEvents();
  }, [page, rowsPerPage, debouncedSearch]);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Banner y Buscador */}
      <Grid container spacing={2}>
        <Grid size={12}>
          <EventsBanner />
        </Grid>
        <Grid size={12}>
          <SearchCourse
            setSearch={setSearch}
            title={"Tu próximo evento para florecer juntas comienza aquí 💫🌸"}
            placeholder={"Ej: Chistmas Nails"}
          />
        </Grid>
      </Grid>

      {/* Contenido principal */}
      {loading ? (
        <PinkSpinner label='Cargando eventos' />
      ) : (
        <>
          <Grid
            container
            spacing={3}
            justifyContent='center'
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              paddingY: 4,
            }}
          >
            {events.length > 0 ? (
              events.map((c) => (
                <Grid key={c.id} size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                  <CardEvent event={c} />
                </Grid>
              ))
            ) : (
              <Grid size={12} sx={{ textAlign: "center" }}>
                <Typography variant='body1' color='text.secondary'>
                  No se encontraron eventos en próximas fechas 🥺
                </Typography>
              </Grid>
            )}
          </Grid>

          {search === "" && (
            <Grid container justifyContent='center' sx={{ paddingBottom: 5 }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Grid>
          )}
        </>
      )}
    </Layout>
  );
};

export default Events;
