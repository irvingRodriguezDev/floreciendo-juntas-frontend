import Layout from "../../components/Layout/Layout";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import SearchCourse from "../../components/courses/SearchCourses";
import CoursesBanner from "../../components/Banner/CoursesBanner";
import CoursesContext from "../../context/Courses/CoursesContext";
import { useContext, useEffect, useState } from "react";
import AllCourses from "../../components/courses/AllCourses/AllCourses";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Common/Spinner";
import { useDebounce } from "use-debounce";
const Courses = () => {
  const {
    courses,
    getAllCoursesPaginate,
    currentPage, // Viene del Contexto (Metadata de la API)
    totalPages, // Viene del Contexto (Metadata de la API)
  } = useContext(CoursesContext);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 600);

  useEffect(() => {
    setLoading(true);

    if (debouncedSearch.trim() === "") {
      getAllCoursesPaginate(page, rowsPerPage);
    } else {
      getAllCoursesPaginate(undefined, undefined, debouncedSearch);
    }

    // Simulamos un pequeño retraso visual antes de ocultar el spinner
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [page, rowsPerPage, debouncedSearch]);

  // 2. Función CORRECTA para cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Banner y Buscador */}
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid size={12}>
          <CoursesBanner />
        </Grid>
        <Grid size={12}>
          <SearchCourse setSearch={setSearch} />
        </Grid>
      </Grid>

      {/* Contenido principal */}
      {loading ? (
        <Spinner message='Cargando cursos...' />
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
              <Grid size={12} style={{ textAlign: "center" }}>
                <p>No se encontraron cursos.</p>
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

export default Courses;
