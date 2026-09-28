import { useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Fade,
  Badge,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

// Tus Iconos
import SaloonIcon from "../../icons/SaloonIcon";
import TicketsIcon from "../../icons/TicketsIcon";
import LiveIcon from "../../icons/LiveIcon";
import FlowerIcon from "../../icons/FlowerIcon";
import CommunityIcon from "../../icons/CommunityIcon";
import HomeIcon from "../../icons/HomeIcon";
import DistributionIcon from "../../icons/DistributionIcon";

const MobileAppNavigation = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Manejo seguro de enlace externo para NO romper la PWA Standalone en iOS
  const handleExternalNavigation = (url) => {
    handleCloseMenu();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleInternalNavigation = (path) => {
    handleCloseMenu();
    navigate(path);
  };

  const currentPath = location.pathname;

  return (
    <>
      {/* NAVEGADOR FLOTANTE - GLASS ISLAND */}
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          bottom: "calc(14px + env(safe-area-inset-bottom, 0px))",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 32px)",
          maxWidth: 380,
          height: 66,
          borderRadius: "33px",
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 242, 247, 0.82) 100%)",
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
          border: "1.5px solid rgba(255, 255, 255, 0.95)",
          boxShadow: `
            0 24px 48px -12px rgba(215, 46, 121, 0.25),
            0 8px 16px -4px rgba(0, 0, 0, 0.03),
            inset 0 1.5px 2px rgba(255, 255, 255, 1)
          `,
          zIndex: 1300,
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* 1. COMUNIDAD */}
        <NavItem
          active={currentPath === "/comunidad"}
          onClick={() => navigate("/comunidad")}
          icon={<CommunityIcon width={24} />}
        />

        {/* 2. SECRETOS */}
        <NavItem
          active={currentPath === "/secretos"}
          onClick={() => navigate("/secretos")}
          icon={<FlowerIcon width={24} />}
        />

        {/* 3. FAB CENTRAL – HOME (FLOTANTE CON ECOSISTEMA GLOW) */}
        <Box
          sx={{
            position: "relative",
            top: -18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #FF4B93 0%, #D72E79 50%, #A81452 100%)",
              boxShadow: `
                0 14px 30px -4px rgba(215, 46, 121, 0.55),
                0 6px 12px rgba(0, 0, 0, 0.08),
                inset 0 2.5px 4px rgba(255, 255, 255, 0.5),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2)
              `,
              border: "3.5px solid #FFFFFF",
              transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              "&:hover": {
                transform: "scale(1.05)",
              },
              "&:active": {
                transform: "scale(0.92)",
              },
            }}
          >
            <Badge badgeContent={cartCount} color='error' overlap='circular'>
              <HomeIcon width={28} color='#FFFFFF' />
            </Badge>
          </IconButton>
        </Box>

        {/* 4. LIVES */}
        <NavItem
          active={currentPath === "/lives"}
          onClick={() => navigate("/lives")}
          icon={<LiveIcon width={24} />}
        />

        {/* 5. MÁS OPCIONES */}
        <NavItem
          active={openMenu}
          onClick={handleOpenMenu}
          icon={
            <MoreHorizRoundedIcon
              sx={{
                fontSize: 28,
                color: openMenu ? "#D72E79" : "#A3A3B0",
                transition: "color 0.2s",
              }}
            />
          }
        />
      </Paper>

      {/* MENÚ DESPLEGABLE CON EFECTO GLASS DE LULI / iOS SHEET */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: "26px",
            mb: 2.5,
            p: 1,
            minWidth: 235,
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1.5px solid rgba(255, 255, 255, 0.9)",
            boxShadow:
              "0 24px 48px rgba(215, 46, 121, 0.22), 0 6px 16px rgba(0,0,0,0.04)",
            "& .MuiMenuItem-root": {
              borderRadius: "16px",
              py: 1.3,
              px: 2,
              my: 0.3,
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                backgroundColor: "rgba(215, 46, 121, 0.08)",
                transform: "translateX(4px)",
              },
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleInternalNavigation("/el-salon-de-tus-sueños")}
        >
          <ListItemIcon sx={{ minWidth: "36px !important" }}>
            <SaloonIcon width={22} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{ fontWeight: 600, fontSize: "0.88rem", color: "#1C1C1E" }}
              >
                El Salón de tus Sueños
              </Typography>
            }
          />
        </MenuItem>

        <MenuItem onClick={() => handleInternalNavigation("/distribucion")}>
          <ListItemIcon sx={{ minWidth: "36px !important" }}>
            <DistributionIcon width={22} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{ fontWeight: 600, fontSize: "0.88rem", color: "#1C1C1E" }}
              >
                Distribución
              </Typography>
            }
          />
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleExternalNavigation("https://eventoswapizima.com/")
          }
        >
          <ListItemIcon sx={{ minWidth: "36px !important" }}>
            <TicketsIcon width={22} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{ fontWeight: 600, fontSize: "0.88rem", color: "#1C1C1E" }}
              >
                Eventos & Boletos
              </Typography>
            }
          />
        </MenuItem>
      </Menu>
    </>
  );
};

// BOTÓN INDIVIDUAL CON EFECTO REBOUND & GLOW DOT
const NavItem = ({ active, onClick, icon }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      position: "relative",
      width: 48,
      height: 48,
      borderRadius: "50%",
      transition: "all 0.2s ease",
      "&:active": {
        transform: "scale(0.85)",
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: active ? "#D72E79" : "#A3A3B0",
        transform: active
          ? "translateY(-2px) scale(1.12)"
          : "translateY(0) scale(1)",
        transition:
          "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease",
        filter: active
          ? "drop-shadow(0 4px 10px rgba(215, 46, 121, 0.4))"
          : "none",
      }}
    >
      {icon}
    </Box>

    {/* Micro-indicador Neón Activo */}
    <Box
      sx={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        backgroundColor: "#D72E79",
        position: "absolute",
        bottom: 4,
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0)",
        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: "0 0 8px #D72E79",
      }}
    />
  </Box>
);

export default MobileAppNavigation;
