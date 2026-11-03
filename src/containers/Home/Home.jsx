import { Grid } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import BannerHome from "../../components/Banner/BannerHome";
import NewCourses from "../../components/courses/newCourses/NewCourses";
import Lives from "../../components/Home/Lives";
import TopCourses from "../../components/courses/topCourses/TopCourses";
import LatestWinners from "../winners/LatestWinners";
import Systems from "../Systems/Systems";
import RifaSalonSuenos from "../../components/Raffle/Raffle";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Snowfall from "react-snowfall";
import WhyChooseUsSection from "../../components/WhyChose/WhyChoseUsSection";

const Home = () => {
  return (
    <Layout>
      {/* Efecto de nieve opcional si lo tienes activo */}
      {/* <Snowfall
        snowflakeCount={30}
        style={{ position: "fixed", zIndex: 999, pointerEvents: "none" }}
      /> */}

      <Grid
        container
        spacing={3}
        sx={{ mt: 3, padding: { xs: "10px", md: "25px" } }}
      >
        {/* 1. HERO / BANNER PRINCIPAL (Impacto visual inicial con Caro y Video) */}
        <Grid size={12}>
          <BannerHome />
        </Grid>

        {/* 2. NUEVOS LANZAMIENTOS (Lo más reciente para enganchar de inmediato) */}
        <Grid size={12}>
          <NewCourses />
        </Grid>

        {/* 3. PRÓXIMAS CLASES EN VIVO (Dinamismo y conexión directa) */}
        <Grid size={12}>
          <Lives />
        </Grid>

        {/* 4. TENDENCIAS / TOP CURSOS (Los favoritos de la comunidad) */}
        <Grid size={12} id='seccion-cursos'>
          <TopCourses />
        </Grid>

        {/* 5. GANADORAS DEL SORTEO (Prueba social que genera confianza y retención) */}
        {/* <Grid size={12}>
          <LatestWinners />
        </Grid> */}

        {/* 6. LOS 10 SECRETOS (Pilares estratégicos y categorías de formación) */}
        <Grid size={12}>
          <Systems />
        </Grid>

        {/* 7. ¿QUÉ NOS HACE DIFERENTES? (Autoridad y validación de valor) */}
        <Grid size={12}>
          <WhyChooseUsSection />
        </Grid>

        {/* 8. RIFA EL SALÓN DE TUS SUEÑOS (Bloque pesado de conversión final a membresía) */}
        <Grid size={12}>
          <RifaSalonSuenos />
        </Grid>

        {/* 9. REDES SOCIALES (Cierre institucional y comunidad externa) */}
        <Grid size={12}>
          <SocialLinks />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
