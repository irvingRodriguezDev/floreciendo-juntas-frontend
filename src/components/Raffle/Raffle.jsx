import { useContext } from "react";
import { Box, Grid, alpha } from "@mui/material";

import AuthContext from "../../context/Auth/AuthContext";
import BannerMarquee from "../Home/RifaSalon/BannerMarquee";
import ColumnRigth from "../Home/RifaSalon/ColumnRigth";
import ColumnLeft from "../Home/RifaSalon/ColumnLeft";
import { useHoliday } from "../../context/Holiday/HolidayContext";

export default function RifaSalonPro() {
  const { usuario } = useContext(AuthContext);

  // Sincronizado con el estado de tu autenticación
  const isSubscribed = Boolean(usuario?.isSubscribed || usuario?.roleId === 3);
  const { isHolidayMode } = useHoliday();
  return (
    <Box
      sx={{
        width: "100%",
        background: `
          linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%),
          radial-gradient(circle at top left, rgba(232,62,140,0.06), transparent 70%)
        `,
        borderRadius: "32px",
        py: { xs: 6, md: 10 },
        px: { xs: 3, sm: 6, md: 8 },
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha("#E53888", 0.08),
        boxShadow: "0 20px 40px rgba(232, 62, 140, 0.04)",
        position: "relative",
      }}
    >
      {isHolidayMode && (
        <Box
          sx={{
            position: "absolute",
            marginTop: { xs: -6, lg: 7 },
            display: "flex",
            rigth: { xs: 0 },
            justifyContent: "flex-end",
          }}
        >
          <Box
            component='img'
            src='https://cdn.floreciendojuntas.com/production/statics/xmas/deco-xmas.png'
            alt='Campanas Navideñas'
            sx={{
              opacity: 0.5,
              width: { xs: 90, sm: 110, md: 150, lg: 200 },
              height: { xs: 90, sm: 110, md: 150, lg: 200 },
              objectFit: "contain", // Asegura que la imagen mantenga su proporción sin deformarse
            }}
          />
        </Box>
      )}
      {/* 🎀 BANNER DE MARQUEE EDITORIAL SUPERIOR */}
      <BannerMarquee />
      <Grid
        container
        spacing={{ xs: 5, md: 8 }}
        alignItems='center'
        justifyContent='center'
        sx={{ maxWidth: "1300px", margin: "0 auto" }}
      >
        {/* Columna Izquierda: Mensaje de Beneficios */}
        <ColumnLeft />
        {/* Columna Derecha: Tarjeta de Suscripción de Alta Conversión */}
        <ColumnRigth isSubscribed={isSubscribed} />
      </Grid>
      {isHolidayMode && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            component='img'
            src='https://cdn.floreciendojuntas.com/production/statics/xmas/sferas-xmas.png'
            alt='Campanas Navideñas'
            sx={{
              width: { xs: 90, sm: 110, md: 150, lg: 200 },
              height: { xs: 90, sm: 110, md: 150, lg: 200 },
              objectFit: "contain", // Asegura que la imagen mantenga su proporción sin deformarse
              zIndex: 30,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
