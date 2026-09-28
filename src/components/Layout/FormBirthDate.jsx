import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import axios from "axios";

// 📅 Day.js e Integración con MUI DatePicker
import dayjs from "dayjs";
import "dayjs/locale/es";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MethodPost } from "../../config/Service";

dayjs.locale("es");

const MAIN_PINK = "#D72E79";
const LIGHT_PINK = "#FDE8F0";

const FormBirthDate = ({ open, onClose, onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setError("Por favor ingresa tu fecha de cumpleaños.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 🔑 Forzamos un año base bisiesto (ej. 2000) al formatear para enviar YYYY-MM-DD valido
      const month = selectedDate.format("MM");
      const day = selectedDate.format("DD");
      const birthDateApi = `${month}-${day}`;

      const response = await MethodPost("/auth/saveBirthDate", {
        birthDate: birthDateApi,
      });

      if (onSuccess) onSuccess(response.data);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Ocurrió un error al guardar tu fecha.",
      );
    } finally {
      setLoading(false);
    }
  };

  const calendarPaperStyles = {
    borderRadius: "20px",
    boxShadow: "0px 10px 25px rgba(215, 46, 121, 0.15)",
    border: `1px solid ${LIGHT_PINK}`,

    // 1. Selector de Meses
    "& .MuiMonthCalendar-root .MuiPickersMonth-monthButton": {
      "&:hover": {
        backgroundColor: `${LIGHT_PINK} !important`,
        color: `${MAIN_PINK} !important`,
      },
      "&.Mui-selected": {
        backgroundColor: `${MAIN_PINK} !important`,
        color: "#ffffff !important",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: `${MAIN_PINK} !important`,
        },
      },
    },

    // 2. Selector de Días
    "& .MuiDateCalendar-root": {
      "& .MuiPickersDay-root": {
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: LIGHT_PINK,
          color: MAIN_PINK,
        },
        "&.Mui-selected": {
          backgroundColor: `${MAIN_PINK} !important`,
          color: "#ffffff !important",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: `${MAIN_PINK} !important`,
          },
        },
        "&.MuiPickersDay-today": {
          borderColor: MAIN_PINK,
          color: MAIN_PINK,
        },
      },
    },

    // 3. Encabezado e iconos
    "& .MuiPickersCalendarHeader-label": {
      color: MAIN_PINK,
      fontWeight: 700,
    },
    "& .MuiPickersArrowSwitcher-button": {
      color: MAIN_PINK,
    },
    "& .MuiDayCalendar-weekDayLabel": {
      color: "#888",
      fontWeight: 600,
    },

    // 4. Botones de Acción
    "& .MuiDialogActions-root .MuiButton-root": {
      color: `${MAIN_PINK} !important`,
      fontWeight: 700,
      "&:hover": {
        backgroundColor: LIGHT_PINK,
      },
    },
  };

  // Año bisiesto de referencia para que el calendario contenga los 366 días posibles
  const defaultYearBase = dayjs("2000-01-01");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <Dialog
        open={open}
        onClose={(_e, reason) => {
          if (reason !== "backdropClick") onClose();
        }}
        PaperProps={{
          sx: {
            borderRadius: "28px",
            padding: 2,
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0px 10px 30px rgba(215, 46, 121, 0.15)",
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
            },
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center", py: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: LIGHT_PINK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
            }}
          >
            <CakeOutlinedIcon sx={{ color: MAIN_PINK, fontSize: 32 }} />
          </Box>

          <Typography
            variant='h5'
            component='h2'
            sx={{ fontWeight: 700, color: "#212121", mb: 1 }}
          >
            ¡Queremos festejarte! 🎉
          </Typography>

          <Typography
            variant='body2'
            sx={{ color: "#757575", mb: 3, px: 1, lineHeight: 1.5 }}
          >
            Ingresa tu fecha de cumpleaños para darte una gran sorpresa en tu
            día especial.
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate>
            {error && (
              <Alert severity='error' sx={{ mb: 2, borderRadius: "12px" }}>
                {error}
              </Alert>
            )}

            {/* 📅 DatePicker Ajustado sin restricciones de fecha futura */}
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => {
                setSelectedDate(newDate);
                setError("");
              }}
              referenceDate={defaultYearBase}
              views={["year", "month", "day"]}
              openTo='month'
              format='DD/MM/YYYY' // 🔑 Muestra únicamente DD/MM en el input
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  placeholder: "DD/MM/YYYY",
                  sx: {
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      backgroundColor: "#FAFAFA",
                      "&:hover fieldset": { borderColor: MAIN_PINK },
                      "&.Mui-focused fieldset": { borderColor: MAIN_PINK },
                    },
                    "& .MuiOutlinedInput-input": {
                      textAlign: "center",
                      fontWeight: 500,
                    },
                    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                      color: MAIN_PINK,
                    },
                  },
                },

                desktopPaper: { sx: calendarPaperStyles },
                mobilePaper: { sx: calendarPaperStyles },
              }}
            />

            <Button
              type='submit'
              fullWidth
              disabled={loading}
              variant='contained'
              disableElevation
              sx={{
                py: 1.5,
                borderRadius: "50px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                backgroundColor: MAIN_PINK,
                boxShadow: "0px 4px 12px rgba(215, 46, 121, 0.3)",
                "&:hover": {
                  backgroundColor: "#B82363",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Guardar fecha"
              )}
            </Button>
          </Box>

          <Typography
            variant='caption'
            display='block'
            sx={{ color: "#BDBDBD", mt: 2 }}
          >
            * Recuerda que esta fecha solo se podrá registrar una sola vez.
          </Typography>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default FormBirthDate;
