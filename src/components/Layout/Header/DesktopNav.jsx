import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import DesktopActions from "./DesktopActions";
import CartSidebar from "../CartSidebar";
import AuthContext from "../../../context/Auth/AuthContext";
import CartContext from "../../../context/Cart/CartContext";

const menuItems = [
  { name: "Comunidad", path: "/comunidad" },
  { name: "10 Secretos", path: "/secretos" },
  { name: "Lives", path: "/lives" },
  { name: "Salón", path: "/el-salon-de-tus-sueños" },
  // { name: "Eventos", path: "/eventos" },
  { name: "Distribución", path: "/distribucion" },
];

const DesktopNav = () => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  // Eliminamos el useEffect de scroll de aquí, ya viene del padre o se maneja centralizado

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSalonCart, setOpenSalonCart] = useState(false);
  const [openShopifyCart, setOpenShopifyCart] = useState(false);

  const { autenticado } = useContext(AuthContext);
  const { cart, guest_cart, getUserCart } = useContext(CartContext);

  useEffect(() => {
    if (autenticado) getUserCart();
  }, [autenticado]);

  const cartCount = autenticado
    ? cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
    : guest_cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // Handlers limpios
  const handleOpenMenu = () => setDrawerOpen(true);
  const handleCloseMenu = () => setDrawerOpen(false);
  const handleOpenSalon = () => setOpenSalonCart(true);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* 1. Acciones comunes (Carrito/Login) - Siempre visibles en Desktop */}
        <DesktopActions
          cartCount={cartCount}
          onOpenSalonCart={handleOpenSalon} // Esta es la función que debe abrir el carrito
          onOpenShopifyCart={() => setOpenShopifyCart(true)}
          openShopifyCart={openShopifyCart}
          onCloseShopifyCart={() => setOpenShopifyCart(false)}
        />

        {/* 2. Menu para pantallas Medianas (Hamburger) */}
        {isMedium && (
          <IconButton
            edge='start'
            onClick={handleOpenMenu} // ESTO solo abre el menú, no el carrito
            sx={{ color: "#E53888" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* 3. Links para pantallas Grandes (Horizontal) */}
        {isLarge && (
          <Box sx={{ display: "flex", gap: 3, ml: 2 }}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <Typography sx={{ color: "#E53888", fontWeight: 500 }}>
                  {item.name}
                </Typography>
              </Link>
            ))}
          </Box>
        )}
      </Box>

      {/* Drawers (Fuera del flujo para evitar conflictos visuales) */}
      <Drawer anchor='left' open={drawerOpen} onClose={handleCloseMenu}>
        {/* Contenido del menú de navegación móvil/medium */}
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} onClick={handleCloseMenu}>
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary={item.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <CartSidebar
        open={openSalonCart}
        onClose={() => setOpenSalonCart(false)}
      />
    </>
  );
};

export default DesktopNav;
