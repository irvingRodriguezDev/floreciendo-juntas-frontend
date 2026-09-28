import React, { useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StoresContext from "../../context/Stores/StoresContext";

const StoreDiscoveryPanel = ({ onSelectStore }) => {
  const { stores } = useContext(StoresContext);

  // Variantes para animaciones de Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Cabecera del Panel */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Stack direction='row' alignItems='center' spacing={1} mb={1}>
          <StorefrontIcon sx={{ color: "#D82E7A" }} />
          <Typography variant='h6' fontWeight='700' color='text.primary'>
            Distribuidoras
          </Typography>
        </Stack>
        <Typography variant='body2' color='text.secondary' mb={2}>
          {stores.length > 0
            ? `Hemos encontrado ${stores.length} flores cerca de ti.`
            : "Buscando distribuidoras en tu zona..."}
        </Typography>
        <Divider />
      </Box>

      {/* Lista Deslizable con Animación */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
          },
        }}
      >
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <AnimatePresence>
            {stores.map((store) => (
              <motion.div
                key={store.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <Card
                  onClick={() => onSelectStore(store)}
                  sx={{
                    mb: 2,
                    cursor: "pointer",
                    borderRadius: "16px",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(216, 46, 122, 0.12)",
                      borderColor: "#D82E7A",
                    },
                  }}
                >
                  <CardContent sx={{ p: "16px !important" }}>
                    <Stack spacing={1.5}>
                      {/* Fila superior */}
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={store.imageUrl}
                          sx={{
                            width: 56,
                            height: 56,
                            bgcolor: "#fce4ec",
                            color: "#D82E7A",
                            border: "2px solid #D82E7A",
                          }}
                        >
                          {store.name.charAt(0)}
                        </Avatar>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle1" fontWeight="700" noWrap>
                            {store.name}
                          </Typography>

                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            mb={0.5}
                          >
                            <LocationOnIcon
                              sx={{ fontSize: 14, color: "text.secondary" }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              noWrap
                            >
                              {store.address}
                            </Typography>
                          </Stack>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {store.description}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Fila inferior */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ pl: "72px" }}
                      >
                        <Chip
                          label="Activa"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            bgcolor: "#E8F5E9",
                            color: "#2E7D32",
                            fontWeight: "bold",
                          }}
                        />

                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            size="small"
                            href={`https://wa.me/${store.phone}?text=${encodeURIComponent(
                              "Hola, me interesa adquirir productos, ¿puedo acudir ahora?"
                            )}`}
                            target="_blank"
                            sx={{
                              bgcolor: "#25D366",
                              color: "white",
                              "&:hover": { bgcolor: "#128C7E" },
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <WhatsAppIcon sx={{ fontSize: 18 }} />
                          </IconButton>

                          <IconButton
                            size="small"
                            href={`https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`}
                            target="_blank"
                            sx={{
                              bgcolor: "#E53888",
                              color: "white",
                              "&:hover": { bgcolor: "#bd2f71" },
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <LocationOnIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Box>
    </Box>
  );
};

export default StoreDiscoveryPanel;
