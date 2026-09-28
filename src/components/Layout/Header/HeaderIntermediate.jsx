// src/components/Header/HeaderIntermediate.jsx
import React, { useState, useContext } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/Auth/AuthContext";
import CartContext from "../../../context/Cart/CartContext";
import Logo from "../../../assets/images/LOGOTIPO FLORECIENDO JUNTAS negro.png";
import ShopifyCartButton from "../../../containers/Store/ShopifyCartButton";
import ShopifyCartDrawer from "../../../containers/Store/ShopifyCartDrawer";
import FornitureIcon from "../../icons/FornitureIcon";
import BadgeBox from "../../ui/BadgeBox";

const menuItems = [
  { name: "Comunidad", path: "/comunidad", auth: "both" },
  { name: "10 Secretos", path: "/secretos", auth: "both" },
  { name: "Lives", path: "/lives", auth: "both" },
  { name: "Salón", path: "/el-salon-de-tus-sueños", auth: "both" },
  { name: "Eventos", path: "/eventos", auth: "both" },
  { name: "Distribución", path: "/distribucion", auth: "both" },
];

const HeaderIntermediate = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openCartShopify, setOpenCartShopify] = useState(false);
  const { autenticado } = useContext(AuthContext);
  const { cart, guest_cart } = useContext(CartContext);

  const cartCount = autenticado
    ? cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
    : guest_cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const filteredMenu = menuItems.filter((item) => {
    if (item.auth === "both") return true;
    if (item.auth === true && autenticado) return true;
    if (item.auth === false && !autenticado) return true;
    return false;
  });

  return (
    <AppBar
      position='relative'
      elevation={4}
      sx={{ backgroundColor: "transparent" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        {/* LOGO */}
        <Link to='/' style={{ display: "block", width: 180 }}>
          <Box
            component='img'
            src={Logo}
            alt='Logo Floreciendo Juntas'
            sx={{ width: 180, height: "auto" }}
          />
        </Link>

        {/* ACCIONES */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Carrito salón */}
          <BadgeBox count={cartCount} anchor top='6px' right='6px' size='md'>
            <IconButton sx={{ color: "#E53888" }}>
              <FornitureIcon width={40} />
            </IconButton>
          </BadgeBox>

          {/* Shopify cart */}
          <ShopifyCartButton onClick={() => setOpenCartShopify(true)} />
          <ShopifyCartDrawer
            open={openCartShopify}
            onClose={() => setOpenCartShopify(false)}
          />

          {/* Auth */}
          {!autenticado ? (
            <Button
              component={Link}
              to='/iniciar-sesion'
              variant='outlined'
              sx={{ color: "#E53888", borderColor: "#E53888", borderRadius: 2 }}
            >
              Iniciar
            </Button>
          ) : (
            <Button
              component={Link}
              to='/mi-perfil'
              variant='contained'
              sx={{
                color: "#fff",
                backgroundColor: "#E53888",
                borderRadius: 2,
                "&:hover": { backgroundColor: "#d82e7a" },
              }}
            >
              Mi Perfil
            </Button>
          )}

          {/* HAMBURGER */}
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon sx={{ color: "#E53888" }} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* DRAWER */}
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {filteredMenu.map((item) => (
              <ListItem key={item.path} disablePadding>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <ListItemButton onClick={() => setDrawerOpen(false)}>
                    <ListItemText
                      primary={item.name}
                      sx={{ color: "#E53888", fontWeight: "bold" }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default HeaderIntermediate;
