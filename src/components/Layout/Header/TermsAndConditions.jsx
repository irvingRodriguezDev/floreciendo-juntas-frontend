
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Checkbox,
    FormControlLabel,
} from "@mui/material";

import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { MethodPost } from "../../../config/Service";

const MAIN_PINK = "#D72E79";
const LIGHT_PINK = "#FDE8F0";

const TermsAndConditions = ({
    open,
    onClose,
    onSuccess,
    // termsUrl,
    // privacyUrl,
}) => {
    const [accepted, setAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAccept = async () => {
        if (!accepted) {
            setError("Debes aceptar los términos y condiciones para continuar.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await MethodPost("/auth/acceptTerms", {});

            if (response.data?.ok) {
                setAccepted(false);

                if (onSuccess) {
                    onSuccess({
                        ...response.data,
                        termsAccepted: true,
                    });
                }

                onClose();
            } else {
                setError(response.data?.message || "No fue posible guardar tu aceptación.");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "No fue posible guardar tu aceptación. Inténtalo nuevamente."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={(_e, reason) => {
                // No permitir cerrar sin aceptar
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                if (!loading) onClose();
            }}
            PaperProps={{
                sx: {
                    borderRadius: "28px",
                    padding: 2,
                    maxWidth: "430px",
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

                {/* Icono */}
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: LIGHT_PINK,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px auto",
                    }}
                >
                    <GavelOutlinedIcon
                        sx={{ color: MAIN_PINK, fontSize: 32 }}
                    />
                </Box>

                {/* Título */}
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 700,
                        color: "#212121",
                        mb: 1,
                    }}
                >
                    ¡Términos y Condiciones! 🌸
                </Typography>

                {/* Descripción */}

                <Typography
                    variant="body2"
                    sx={{
                        color: "#757575",
                        mb: 3,
                        px: 1,
                        lineHeight: 1.7,
                        textAlign: "center",
                    }}
                >
                    Queremos que disfrutes de Floreciendo Juntas con confianza y
                    tranquilidad. Por eso, te invitamos a conocer nuestros
                    Términos y Condiciones y nuestra Política de Privacidad.

                    Lee y acepta ambos documentos para continuar disfrutando de
                    nuestra comunidad.
                </Typography>

                {/* Enlaces */}
                <Box
                    sx={{
                        backgroundColor: "#FAFAFA",
                        borderRadius: "16px",
                        p: 2,
                        mb: 2,
                        textAlign: "left",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#333",
                            mb: 1.5,
                        }}
                    >
                        Te invitamos a consultar:
                    </Typography>

                    {/* {termsUrl && (
                        <Typography
                            component="a"
                            href={termsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: "block",
                                color: MAIN_PINK,
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                mb: 1,
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Términos y Condiciones
                        </Typography>
                    )}

                    {privacyUrl && (
                        <Typography
                            component="a"
                            href={privacyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: "block",
                                color: MAIN_PINK,
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Política de Privacidad
                        </Typography>
                    )} */}
                </Box>

                {/* Formulario */}
                <Box component="form" onSubmit={(e) => {
                    e.preventDefault();
                    handleAccept();
                }}>
                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2, borderRadius: "12px" }}
                        >
                            {error}
                        </Alert>
                    )}

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={accepted}
                                onChange={(e) => {
                                    setAccepted(e.target.checked);
                                    setError("");
                                }}
                                sx={{
                                    color: MAIN_PINK,
                                    "&.Mui-checked": {
                                        color: MAIN_PINK,
                                    },
                                }}
                            />
                        }
                        label={
                            <Typography
                                sx={{
                                    fontSize: "0.82rem",
                                    color: "#555",
                                    textAlign: "left",
                                }}
                            >
                                He leído y estoy de acuerdo con los Términos y Condiciones.
                            </Typography>
                        }
                        sx={{
                            alignItems: "flex-start",
                            mx: 0,
                            mb: 2,
                        }}
                    />

                    {/* Botón */}
                    <Button
                        type="submit"
                        fullWidth
                        disabled={!accepted || loading}
                        variant="contained"
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
                            "&.Mui-disabled": {
                                backgroundColor: "#E8DCE2",
                                color: "#A99AA2",
                                boxShadow: "none",
                            },
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: "#fff" }} />
                        ) : (
                            "Aceptar y continuar"
                        )}
                    </Button>
                </Box>

                <Typography
                    variant="caption"
                    display="block"
                    sx={{
                        color: "#BDBDBD",
                        mt: 2,
                        lineHeight: 1.5,
                    }}
                >
                    Tu aceptación nos permite mantener tu cuenta
                    actualizada y brindarte nuestros servicios.
                </Typography>

            </DialogContent>
        </Dialog>
    );
};

export default TermsAndConditions;
