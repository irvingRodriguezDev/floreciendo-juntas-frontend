import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

import Pagination from "../../components/Pagination/Pagination";

const PRIMARY_PINK = "#E53888";
const DARK_PINK = "#C52F75";
const LIGHT_PINK = "#FFF0F7";
const BORDER_PINK = "#F9CEDF";

const TicketSkeleton = () => (
  <Box
    sx={{
      borderRadius: "20px",
      overflow: "hidden",
      background: "linear-gradient(135deg, #FFF5FA, #FFE3EE)",
      border: `1px solid ${BORDER_PINK}`,
      p: 3,
      height: 220,
      position: "relative",
    }}
  >
    {[80, 60, 50, 40].map((w, i) => (
      <Box
        key={i}
        sx={{
          height: 14,
          width: `${w}%`,
          borderRadius: 2,
          bgcolor: "rgba(229,56,136,0.1)",
          mb: 1.5,
          animation: "pulse 1.5s ease-in-out infinite",
          animationDelay: `${i * 0.15}s`,
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.4 },
            "50%": { opacity: 0.9 },
          },
        }}
      />
    ))}
    <Box
      sx={{
        position: "absolute",
        bottom: 24,
        left: 24,
        right: 24,
        display: "flex",
        gap: 1.5,
      }}
    >
      {[1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            flex: 1,
            height: 38,
            borderRadius: "10px",
            bgcolor: "rgba(229,56,136,0.12)",
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
            "@keyframes pulse": {
              "0%, 100%": { opacity: 0.4 },
              "50%": { opacity: 0.9 },
            },
          }}
        />
      ))}
    </Box>
  </Box>
);

const TicketCard = ({
  ticket,
  usuario,
  downloadTicket,
  onCalendarOpen,
  downloadingId,
  index,
}) => {
  const isDownloading = downloadingId === ticket.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
    >
      <Box
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          background: "linear-gradient(145deg, #ffffff 0%, #FFF5FA 100%)",
          border: `1px solid ${BORDER_PINK}`,
          boxShadow: "0 4px 20px rgba(229,56,136,0.08)",
          transition: "box-shadow 0.25s ease, transform 0.25s ease",
          "&:hover": {
            boxShadow: "0 10px 32px rgba(229,56,136,0.18)",
            transform: "translateY(-3px)",
          },
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: 4,
            background: `linear-gradient(90deg, ${PRIMARY_PINK}, #F9A8D4, ${PRIMARY_PINK})`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
            "@keyframes shimmer": {
              "0%": { backgroundPosition: "0% 0%" },
              "100%": { backgroundPosition: "200% 0%" },
            },
          }}
        />

        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                color: "#1a0d13",
                fontSize: "1.05rem",
                lineHeight: 1.3,
                flex: 1,
                pr: 1,
              }}
            >
              {ticket.Event.title}
            </Typography>
            <Chip
              icon={<LocalActivityIcon sx={{ fontSize: "14px !important" }} />}
              label='Activo'
              size='small'
              sx={{
                bgcolor: "rgba(229,56,136,0.1)",
                color: PRIMARY_PINK,
                fontWeight: 600,
                fontSize: "10px",
                height: 24,
                border: `1px solid ${BORDER_PINK}`,
                flexShrink: 0,
              }}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 0.8, mb: 2.5 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeIcon
                sx={{ fontSize: 15, color: PRIMARY_PINK, flexShrink: 0 }}
              />
              <Typography sx={{ fontSize: "13px", color: "#5a3a47" }}>
                {FormatDate(ticket.Event.startDate)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon
                sx={{ fontSize: 15, color: PRIMARY_PINK, flexShrink: 0 }}
              />
              <Typography
                sx={{ fontSize: "13px", color: "#5a3a47", lineHeight: 1.3 }}
              >
                {ticket.Event.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ConfirmationNumberIcon
                sx={{ fontSize: 15, color: PRIMARY_PINK, flexShrink: 0 }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#5a3a47",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                {ticket.code}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              bgcolor: "rgba(229,56,136,0.08)",
              border: `1px solid ${BORDER_PINK}`,
              borderRadius: "8px",
              px: 1.5,
              py: 0.5,
              mb: 2.5,
            }}
          >
            <Typography
              sx={{ fontSize: "13px", color: PRIMARY_PINK, fontWeight: 700 }}
            >
              {formatMexicanCurrency(Number(ticket.Event.price))}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.2 }}>
            <Button
              fullWidth
              variant='contained'
              size='small'
              startIcon={
                isDownloading ? (
                  <CircularProgress size={14} sx={{ color: "#fff" }} />
                ) : (
                  <DownloadIcon />
                )
              }
              disabled={isDownloading}
              onClick={() => downloadTicket(ticket, usuario)}
              sx={{
                bgcolor: PRIMARY_PINK,
                "&:hover": { bgcolor: DARK_PINK },
                "&:disabled": {
                  bgcolor: "rgba(229,56,136,0.4)",
                  color: "#fff",
                },
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(229,56,136,0.3)",
              }}
            >
              {isDownloading ? "Generando..." : "Descargar"}
            </Button>

            <Button
              fullWidth
              variant='outlined'
              size='small'
              startIcon={<CalendarMonthIcon />}
              onClick={(e) => onCalendarOpen(e, ticket)}
              sx={{
                borderColor: BORDER_PINK,
                color: PRIMARY_PINK,
                "&:hover": {
                  borderColor: PRIMARY_PINK,
                  bgcolor: "rgba(229,56,136,0.05)",
                },
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                borderRadius: "10px",
              }}
            >
              Calendario
            </Button>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

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
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [calendarLoadingId, setCalendarLoadingId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (!usuario?.id) return;
    const fetchTickets = async () => {
      setLoading(true);
      try {
        await getTicketsByUser(page, rowsPerPage);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [page, rowsPerPage]);

  const handleDownload = useCallback(
    async (ticket, usuario) => {
      setDownloadingId(ticket.id);
      try {
        await downloadTicket(ticket, usuario);
      } catch {
        setSnackbar({
          open: true,
          message: "Error al descargar el boleto",
          severity: "error",
        });
      } finally {
        setDownloadingId(null);
      }
    },
    [downloadTicket],
  );

  const handleCalendarMenuOpen = (e, ticket) => {
    setAnchorEl(e.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleCalendarMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const handleAddToCalendar = async (provider) => {
    if (!selectedTicket) return;
    setCalendarLoadingId(selectedTicket.id);
    try {
      const calendarData = await getCalendarLinks(selectedTicket.id);
      if (provider === "ics") {
        const link = document.createElement("a");
        link.href = calendarData.ics;
        link.download = `evento-${selectedTicket.Event.title.toLowerCase().replace(/\s+/g, "-")}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const urls = {
          google: calendarData.google,
          apple: calendarData.apple,
          outlook: calendarData.outlook,
          yahoo: calendarData.yahoo,
        };
        window.open(urls[provider], "_blank");
      }
      setSnackbar({
        open: true,
        message: "¡Evento agregado al calendario!",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Error al agregar al calendario",
        severity: "error",
      });
    } finally {
      setCalendarLoadingId(null);
      handleCalendarMenuClose();
    }
  };

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= ticketsPagination.totalPages &&
      newPage !== page
    ) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) return <PinkSpinner />;

  if (!tickets || tickets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 4,
            borderRadius: "20px",
            background: "linear-gradient(135deg, #FFF5FA, #FFE3EE)",
            border: `1px dashed ${BORDER_PINK}`,
          }}
        >
          <Typography sx={{ fontSize: "3rem", mb: 2 }}>🎟️</Typography>
          <Typography
            variant='h6'
            sx={{ color: PRIMARY_PINK, fontWeight: 700, mb: 1 }}
          >
            Aún no tienes boletos
          </Typography>
          <Typography sx={{ color: "#9a6e7e", fontSize: "14px" }}>
            Cuando compres un boleto aparecerá aquí para descargarlo cuando
            quieras.
          </Typography>
        </Box>
      </motion.div>
    );
  }

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant='h5'
            sx={{ color: "#1a0d13", fontWeight: 800, mb: 0.5 }}
          >
            Mis boletos 🌸
          </Typography>
          <Typography sx={{ color: "#9a6e7e", fontSize: "14px" }}>
            {ticketsPagination?.totalItems ?? tickets.length} boleto
            {tickets.length !== 1 ? "s" : ""} activo
            {tickets.length !== 1 ? "s" : ""}
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={2.5}>
        <AnimatePresence>
          {tickets.map((ticket, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={ticket.id}>
              <TicketCard
                ticket={ticket}
                usuario={usuario}
                downloadTicket={handleDownload}
                onCalendarOpen={handleCalendarMenuOpen}
                downloadingId={downloadingId}
                index={index}
              />
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {ticketsPagination?.totalPages > 1 && (
        <Box sx={{ mt: 4 }}>
          <Pagination
            currentPage={ticketsPagination.currentPage}
            totalPages={ticketsPagination.totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCalendarMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "14px",
            border: `1px solid ${BORDER_PINK}`,
            boxShadow: "0 8px 24px rgba(229,56,136,0.15)",
            mt: 1,
          },
        }}
      >
        {[
          { key: "google", icon: <GoogleIcon />, label: "Google Calendar" },
          { key: "apple", icon: <AppleIcon />, label: "Apple Calendar" },
          { key: "outlook", icon: <EmailIcon />, label: "Outlook" },
          {
            key: "yahoo",
            icon: <EventAvailableIcon />,
            label: "Yahoo Calendar",
          },
          { key: "ics", icon: <DownloadIcon />, label: "Descargar .ics" },
        ].map(({ key, icon, label }) => (
          <MenuItem
            key={key}
            onClick={() => handleAddToCalendar(key)}
            disabled={calendarLoadingId === selectedTicket?.id}
            sx={{
              "&:hover": { bgcolor: LIGHT_PINK },
              borderRadius: "8px",
              mx: 0.5,
            }}
          >
            <ListItemIcon sx={{ color: PRIMARY_PINK, minWidth: 36 }}>
              {calendarLoadingId === selectedTicket?.id ? (
                <CircularProgress size={18} sx={{ color: PRIMARY_PINK }} />
              ) : (
                icon
              )}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }}
            >
              {label}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: "12px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserTicketsCards;
