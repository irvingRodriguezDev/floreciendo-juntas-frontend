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
  CircularProgress,
  Box,
} from "@mui/material";
import UserContext from "../../context/User/UserContext";
import AuthContext from "../../context/Auth/AuthContext";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import FormatDate from "../../utils/FormatDate";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
const UserTicketsTable = () => {
  const { usuario } = useContext(AuthContext);
  const { tickets, getTicketsByUser } = useContext(UserContext);

  useEffect(() => {
    getTicketsByUser(usuario ? usuario.id : null);
  }, []);
  console.log(tickets.length);

  if (tickets.length == 0) {
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
  console.log(tickets);

  return (
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
                  <Button
                    variant='contained'
                    size='small'
                    sx={{
                      bgcolor: "#E53888",
                      "&:hover": { bgcolor: "#D32F71" },
                      textTransform: "none",
                    }}
                    startIcon={<ConfirmationNumberIcon />}
                    onClick={() => window.open(ticket.downloadUrl, "_blank")}
                  >
                    Descargar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <PinkSpinner />
      )}
    </TableContainer>
  );
};

export default UserTicketsTable;
