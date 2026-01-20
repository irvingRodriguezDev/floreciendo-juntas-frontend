import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Grid, Typography } from "@mui/material";
import SystemBanner from "../../../components/Banner/SystemBanner";
import { useParams } from "react-router-dom";
import MethodGet from "../../../config/Service";
import CoursesContext from "../../../context/Courses/CoursesContext";
import SearchCourse from "../../../components/courses/SearchCourses";
import { useDebounce } from "use-debounce";
import PinkSpinner from "../../../components/Loading/PinkSpinner";
import AllCourses from "../../../components/courses/AllCourses/AllCourses";
import Pagination from "../../../components/Pagination/Pagination";
import VideoFull from "../../../components/fullscreen/VideoFull";
const BySystemId = () => {
  const params = useParams();
  const { getCoursesBySystemId, courses, currentPage, totalPages, totalItems } =
    useContext(CoursesContext);
  const { id } = params;
  const [system, setSystem] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 600);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  useEffect(() => {
    let url = `/systems/${id}`;
    MethodGet(url)
      .then((res) => {
        setSystem(res.data);
      })
      .catch((error) => {
        console.log(
          error,
          "ocurrio un error al obtener la informacion del sistema",
        );
      });
  }, [id]);
  useEffect(() => {
    setLoading(true);

    if (debouncedSearch.trim() === "") {
      getCoursesBySystemId(id, page, rowsPerPage);
    } else {
      getCoursesBySystemId(id, undefined, undefined, debouncedSearch);
    }

    // Simulamos un pequeño retraso visual antes de ocultar el spinner
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id, page, rowsPerPage, debouncedSearch]);
  // 2. Función CORRECTA para cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {system && system.system_icon && <VideoFull url={system.system_icon} />}

      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid size={12}>
          <SystemBanner
            systemName={system ? system.name.trim("") : ""}
            description={system ? system.description.trim("") : ""}
          />
        </Grid>
        <Grid size={12}>
          <SearchCourse setSearch={setSearch} />
        </Grid>
      </Grid>
      {/* Contenido principal */}
      {loading ? (
        <PinkSpinner label='Cargando cursos' />
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
            {courses.length > 0 ? (
              courses.map((c, index) => (
                <Grid
                  key={index}
                  size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <AllCourses courses={c} />
                </Grid>
              ))
            ) : (
              <Grid size={12} sx={{ textAlign: "center", py: 6 }}>
                <Typography
                  sx={{
                    color: "#D82E7A",
                    fontWeight: 500,
                    fontSize: "1.05rem",
                  }}
                >
                  Cada proceso florece a su tiempo 🌷 Por ahora no hay cursos
                  disponibles en esta etapa pero pronto habrá nuevos caminos.
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

export default BySystemId;
