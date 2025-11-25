import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

import { motion } from "framer-motion";

import UserContext from "../../context/User/UserContext";
import AuthContext from "../../context/Auth/AuthContext";

import PinkSpinner from "../../components/Loading/PinkSpinner";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import FormatDate from "../../utils/FormatDate";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import EmailIcon from "@mui/icons-material/Email";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DownloadIcon from "@mui/icons-material/Download";
import DiamondIcon from "@mui/icons-material/Diamond";

import Pagination from "../../components/Pagination/Pagination";

const PRIMARY_PINK = "#E53888";

const UserTicketsCards = () => {
  const { usuario } = useContext(AuthContext);

  const {
    tickets,
    getTicketsByUser,
    getCalendarLinks,
    ticketsPagination,
    downloadTicket,
  } = useContext(UserContext);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [loadingCalendar, setLoadingCalendar] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // === Obtener boletos ===
  useEffect(() => {
    if (usuario?.id) {
      getTicketsByUser(usuario.id, page, rowsPerPage);
    }
  }, [usuario, page, rowsPerPage]);

  // === Manejo del menú ===
  const handleCalendarMenuOpen = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleCalendarMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  // === Añadir al calendario ===
  const handleAddToCalendar = async (provider) => {
    if (!selectedTicket) return;

    setLoadingCalendar(true);

    try {
      const calendarData = await getCalendarLinks(selectedTicket.id);

      switch (provider) {
        case "google":
          window.open(calendarData.google, "_blank");
          break;
        case "apple":
          window.open(calendarData.apple, "_blank");
          break;
        case "outlook":
          window.open(calendarData.outlook, "_blank");
          break;
        case "yahoo":
          window.open(calendarData.yahoo, "_blank");
          break;
        case "ics":
          const link = document.createElement("a");
          link.href = calendarData.ics;
          link.download = `evento-${selectedTicket.Event.title
            .toLowerCase()
            .replace(/\s+/g, "-")}.ics`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        default:
          break;
      }

      setSnackbar({
        open: true,
        message: "Acción realizada correctamente",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al agregar al calendario",
        severity: "error",
      });
    } finally {
      setLoadingCalendar(false);
      handleCalendarMenuClose();
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= ticketsPagination.totalPages &&
      newPage !== page
    ) {
      setPage(newPage);
      window.scrollTo({ top: 1000, behavior: "smooth" });
    }
  };

  // === Si no hay tickets ===
  if (!tickets || tickets.length === 0) {
    return (
      <Typography
        textAlign='center'
        variant='h6'
        sx={{ mt: 4, color: PRIMARY_PINK }}
      >
        No tienes boletos vigentes 🥺
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant='h5'
        sx={{ color: PRIMARY_PINK, fontWeight: 600, mb: 3 }}
      >
        Cada acceso 🎟️ es una semilla para seguir floreciendo 🌸
      </Typography>

      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={ticket.id}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              sx={{
                p: 3,
                borderRadius: "18px",
                background: "linear-gradient(135deg,#FFF5FA,#FFE3EE)",
                boxShadow: "0 6px 14px rgba(229,56,136,0.15)",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                position: "relative",
              }}
            >
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  {/* INFORMACIÓN */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: PRIMARY_PINK,
                        fontSize: "1.2rem",
                      }}
                    >
                      {ticket.Event.title}
                    </Typography>

                    <Typography sx={{ color: "#444", mt: 1 }}>
                      📅 Fecha: <b>{FormatDate(ticket.Event.startDate)}</b>
                    </Typography>

                    <Typography sx={{ color: "#444" }}>
                      📍 Ubicación: <b>{ticket.Event.location}</b>
                    </Typography>

                    <Typography sx={{ color: "#444" }}>
                      💵 Precio:{" "}
                      <b>{formatMexicanCurrency(Number(ticket.Event.price))}</b>
                    </Typography>

                    <Typography
                      sx={{
                        color: "#333",
                        mt: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                      }}
                    >
                      🎟️ Código: {ticket.code}
                    </Typography>
                  </Box>
                </Grid>

                {/* ACCIONES */}
                <Grid size={12}>
                  <Box
                    sx={{
                      minWidth: 180,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 1.2,
                    }}
                  >
                    {/* Descargar */}
                    <Button
                      variant='contained'
                      sx={{
                        bgcolor: PRIMARY_PINK,
                        "&:hover": { bgcolor: "#C52F75" },
                        textTransform: "none",
                      }}
                      startIcon={<ConfirmationNumberIcon />}
                      onClick={() => downloadTicket(ticket, usuario)}
                    >
                      Descargar
                    </Button>

                    {/* Calendario */}
                    <Button
                      variant='outlined'
                      sx={{
                        borderColor: PRIMARY_PINK,
                        color: PRIMARY_PINK,
                        "&:hover": {
                          borderColor: "#C52F75",
                          bgcolor: "rgba(229,56,136,0.05)",
                        },
                        textTransform: "none",
                      }}
                      startIcon={
                        loadingCalendar && selectedTicket?.id === ticket.id ? (
                          <CircularProgress
                            size={16}
                            sx={{ color: PRIMARY_PINK }}
                          />
                        ) : (
                          <CalendarMonthIcon />
                        )
                      }
                      onClick={(e) => handleCalendarMenuOpen(e, ticket)}
                      disabled={loadingCalendar}
                    >
                      Calendario
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, padding: "10px" }}>
        <Pagination
          currentPage={ticketsPagination.currentPage}
          totalPages={ticketsPagination.totalPages}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* MENU CALENDAR */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCalendarMenuClose}
      >
        <MenuItem onClick={() => handleAddToCalendar("google")}>
          <ListItemIcon>
            <GoogleIcon />
          </ListItemIcon>
          <ListItemText>Google Calendar</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAddToCalendar("apple")}>
          <ListItemIcon>
            <AppleIcon />
          </ListItemIcon>
          <ListItemText>Apple Calendar</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAddToCalendar("outlook")}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>Outlook</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAddToCalendar("yahoo")}>
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText>Yahoo Calendar</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAddToCalendar("ics")}>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <ListItemText>Descargar archivo .ics</ListItemText>
        </MenuItem>
      </Menu>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserTicketsCards;
