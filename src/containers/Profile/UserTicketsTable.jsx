import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
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
import Pagination from "../../components/Pagination/Pagination";

const UserTicketsTable = () => {
  const { usuario } = useContext(AuthContext);
  const {
    tickets,
    getTicketsByUser,
    getCalendarLinks,
    calendarLoading,
    ticketsPagination,
    downloadTicket,
  } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loadingCalendar, setLoadingCalendar] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (usuario?.id) {
      getTicketsByUser(usuario.id, page, rowsPerPage);
    }
  }, [usuario, page, rowsPerPage]);

  const handleCalendarMenuOpen = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleCalendarMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const handleAddToCalendar = async (provider) => {
    if (!selectedTicket) return;

    setLoadingCalendar(true);

    try {
      // Obtener los links del backend
      const calendarData = await getCalendarLinks(selectedTicket.id);

      // Según el provider, abrir el link correspondiente o descargar
      switch (provider) {
        case "google":
          window.open(calendarData.google, "_blank");
          setSnackbar({
            open: true,
            message: "Abriendo Google Calendar...",
            severity: "success",
          });
          break;

        case "apple":
          // Descargar archivo .ics
          window.open(calendarData.apple, "_blank");
          setSnackbar({
            open: true,
            message: "Descargando archivo de calendario...",
            severity: "success",
          });
          break;

        case "outlook":
          window.open(calendarData.outlook, "_blank");
          setSnackbar({
            open: true,
            message: "Abriendo Outlook Calendar...",
            severity: "success",
          });
          break;

        case "yahoo":
          window.open(calendarData.yahoo, "_blank");
          setSnackbar({
            open: true,
            message: "Abriendo Yahoo Calendar...",
            severity: "success",
          });
          break;

        case "ics":
          // Descarga directa del archivo
          const link = document.createElement("a");
          link.href = calendarData.ics;
          link.download = `evento-${selectedTicket.Event.title
            .toLowerCase()
            .replace(/\s+/g, "-")}.ics`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setSnackbar({
            open: true,
            message: "Archivo descargado exitosamente",
            severity: "success",
          });
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error al agregar al calendario:", error);
      setSnackbar({
        open: true,
        message: "Error al obtener el calendario. Intenta nuevamente.",
        severity: "error",
      });
    } finally {
      setLoadingCalendar(false);
      handleCalendarMenuClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
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

  if (tickets.length === 0) {
    return (
      <Typography
        textAlign='center'
        variant='h6'
        sx={{ mt: 4, color: "#E53888" }}
      >
        No tienes boletos vigentes 🥺
      </Typography>
    );
  }

  return (
    <Paper elevation={12} sx={{ padding: "20px", borderRadius: "16px" }}>
      <Typography
        variant='h5'
        color={"#E53888"}
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Cada acceso🎟️ es una semilla de aprendizaje y crecimiento para que sigas
        floreciendo🌸 en el mundo del nail art 💅🏻
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          mt: 3,
        }}
      >
        {tickets ? (
          <>
            <Table>
              <TableHead sx={{ bgcolor: "#FDE6F0" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#E53888",
                      textAlign: "center",
                    }}
                  >
                    Evento
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#E53888",
                      textAlign: "center",
                    }}
                  >
                    Fecha
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#E53888",
                      textAlign: "center",
                    }}
                  >
                    Ubicación
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#E53888",
                      textAlign: "center",
                    }}
                  >
                    Precio
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#E53888",
                      textAlign: "center",
                    }}
                  >
                    Código
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#E53888",
                      textAlign: "center",
                    }}
                  >
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} hover>
                    <TableCell sx={{ textAlign: "center" }}>
                      {ticket.Event.title}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {FormatDate(ticket.Event.startDate)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {ticket.Event.location}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {formatMexicanCurrency(Number(ticket.Event.price))}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "monospace", textAlign: "center" }}
                    >
                      {ticket.code}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        {/* Botón Descargar PDF */}
                        <Button
                          variant='contained'
                          size='small'
                          sx={{
                            bgcolor: "#E53888",
                            "&:hover": { bgcolor: "#D32F71" },
                            textTransform: "none",
                          }}
                          startIcon={<ConfirmationNumberIcon />}
                          onClick={() => downloadTicket(ticket, usuario)}
                        >
                          Descargar
                        </Button>

                        {/* Botón Calendario */}
                        <Button
                          variant='outlined'
                          size='small'
                          sx={{
                            borderColor: "#E53888",
                            color: "#E53888",
                            "&:hover": {
                              borderColor: "#D32F71",
                              bgcolor: "rgba(229, 56, 136, 0.04)",
                            },
                            textTransform: "none",
                          }}
                          startIcon={
                            loadingCalendar &&
                            selectedTicket?.id === ticket.id ? (
                              <CircularProgress
                                size={16}
                                sx={{ color: "#E53888" }}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ padding: "20px" }}>
              <Pagination
                currentPage={ticketsPagination.currentPage}
                totalPages={ticketsPagination.totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          </>
        ) : (
          <PinkSpinner />
        )}
      </TableContainer>

      {/* Menú desplegable de opciones de calendario */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCalendarMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            minWidth: 220,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #f0f0f0" }}>
          <Typography variant='caption' color='text.secondary' fontWeight={600}>
            Agregar a:
          </Typography>
        </Box>

        <MenuItem onClick={() => handleAddToCalendar("google")}>
          <ListItemIcon>
            <GoogleIcon sx={{ color: "#4285f4" }} />
          </ListItemIcon>
          <ListItemText>Google Calendar</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAddToCalendar("apple")}>
          <ListItemIcon>
            <AppleIcon sx={{ color: "#000" }} />
          </ListItemIcon>
          <ListItemText>Apple Calendar</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAddToCalendar("outlook")}>
          <ListItemIcon>
            <EmailIcon sx={{ color: "#0078d4" }} />
          </ListItemIcon>
          <ListItemText>Outlook</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAddToCalendar("yahoo")}>
          <ListItemIcon>
            <EventAvailableIcon sx={{ color: "#6001d2" }} />
          </ListItemIcon>
          <ListItemText>Yahoo Calendar</ListItemText>
        </MenuItem>

        <Box sx={{ borderTop: "1px solid #f0f0f0", mt: 1 }} />

        <MenuItem onClick={() => handleAddToCalendar("ics")}>
          <ListItemIcon>
            <DownloadIcon sx={{ color: "#6b7280" }} />
          </ListItemIcon>
          <ListItemText>Descargar archivo .ics</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UserTicketsTable;
