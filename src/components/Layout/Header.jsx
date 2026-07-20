import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Badge,
  GlobalStyles,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import CartContext from "../../context/Cart/CartContext";
import CartButton from "./CartButton";
import CartSidebar from "./CartSidebar";
import BadgeBox from "../ui/BadgeBox";
import ShopifyCartButton from "../../containers/Store/ShopifyCartButton";
// import ShopifyCartDrawer from "../../containers/Store/ShopifyCartDrawer";
import FornitureIcon from "../icons/FornitureIcon";
import NotificationsBell from "../Notifications/NotificationsBell";
/* Menu items (igual que antes) */
const menuItems = [
  { name: "Comunidad", path: "/comunidad", auth: "both" },
  { name: "10 Secretos", path: "/secretos", auth: "both" },
  { name: "Lives", path: "/lives", auth: "both" },
  { name: "Salón", path: "/el-salon-de-tus-sueños", auth: "both" },
  { name: "Eventos ", path: "https://eventoswapizima.com", auth: "both" },
  { name: "Distribución", path: "/distribucion", auth: "both" },
];

const Header = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openCartShopify, setOpenCartShopify] = useState(false);
  const { autenticado, cerrarSesion } = useContext(AuthContext);
  const { cart, guest_cart, getUserCart } = useContext(CartContext);

  const isMobile = useMediaQuery("(max-width:1100px)");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (autenticado) getUserCart();
  }, [autenticado]);

  // contador carrito
  const cartCount = autenticado
    ? cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
    : guest_cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredMenu = menuItems.filter((item) => {
    if (item.auth === "both") return true;
    if (item.auth === true && autenticado) return true;
    if (item.auth === false && !autenticado) return true;
    return false;
  });
  const handleClickLogout = () => {
    setOpen(false);
    cerrarSesion();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Global keyframes + clases para animaciones del header */}
      <GlobalStyles
        styles={{
          "@keyframes headerFloat": {
            "0%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-6px)" },
            "100%": { transform: "translateY(0px)" },
          },
          "@keyframes sparkle": {
            "0%": { opacity: 0 },
            "40%": { opacity: 0.9 },
            "60%": { opacity: 0.6 },
            "100%": { opacity: 0 },
          },
          ".hj-float": {
            animation: "headerFloat 6s ease-in-out infinite",
            willChange: "transform",
          },
          ".hj-sparkle": {
            animation: "sparkle 3.2s ease-in-out infinite",
            willChange: "opacity, transform",
          },
          ".hj-deco": {
            pointerEvents: "none",
            userSelect: "none",
            backfaceVisibility: "hidden",
          },
        }}
      />

      <AppBar
        position='relative'
        elevation={scrolled ? 6 : 0}
        sx={{
          width: "100%",
          // transform: "translateX(-50%)",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          // Glassmorphism rosado consistente en todo momento
          background: scrolled
            ? "linear-gradient(180deg, rgba(229,83,140,0.06), rgba(255,255,255,0.12))"
            : "linear-gradient(180deg, rgba(229,83,140,0.05), rgba(0,0,0,0.06))",
          boxShadow: scrolled
            ? "0 8px 30px rgba(229, 56, 136, 0.12)"
            : "0 6px 20px rgba(0,0,0,0.12)",
          backdropFilter: "blur(14px) saturate(1.05)",
          border: scrolled
            ? "1px solid rgba(229,83,140,0.12)"
            : "1px solid rgba(255,255,255,0.08)",
          transition: "all 0.45s cubic-bezier(0.2,0.8,0.2,1)",
          color: scrolled ? "#E53888" : "#FFFFFF",
          textShadow: scrolled ? "none" : "0 1px 6px rgba(0,0,0,0.35)",
          zIndex: 1000,
        }}
      >
        {/* DECORACIONES SUAVES (detrás del header) */}
        {/* Se usan zIndex bajo, opacidad baja y display none en xs */}
        <Box
          className='hj-deco hj-float'
          sx={{
            position: "absolute",
            left: { xs: "auto", md: 24 },
            right: { xs: "auto", md: "60%" },
            top: -8,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(229,83,140,0.12), transparent 40%)",
            opacity: 1,
            zIndex: 0,
            display: { xs: "none", md: "block" },
          }}
        />

        <Box
          className='hj-deco'
          sx={{
            position: "absolute",
            right: 28,
            top: 6,
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: "3px solid rgba(229,83,140,0.12)",
            opacity: 0.9,
            zIndex: 0,
            display: { xs: "none", md: "block" },
            transform: "translateY(-6px)",
          }}
        />

        {/* Sparkles sutiles */}
        <Box
          className='hj-deco hj-sparkle'
          sx={{
            position: "absolute",
            right: { xs: "6%", md: "12%" },
            top: 12,
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "rgba(229,83,140,0.86)",
            opacity: 0.18,
            zIndex: 0,
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          className='hj-deco hj-sparkle'
          sx={{
            position: "absolute",
            right: { xs: "10%", md: "18%" },
            top: 28,
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "rgba(215,46,121,0.9)",
            opacity: 0.14,
            animationDelay: "0.6s",
            zIndex: 0,
            display: { xs: "none", md: "block" },
          }}
        />

        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          {/* LOGO - micro hover y pulso muy suave */}
          <Link
            style={{ textDecoration: "none", display: "block", width: 180 }}
            to='/'
          >
            <Box
              component='img'
              src={
                "https://cdn.floreciendojuntas.com/production/statics/LOGOTIPO+FLORECIENDO+JUNTAS+negro.png"
              }
              alt='Logo Floreciendo Juntas'
              sx={{
                width: { xs: 180, sm: 180, md: 180 },
                height: "auto",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                transformOrigin: "left center",
                "&:hover": { transform: "translateY(-4px) scale(1.01)" },
                filter: scrolled
                  ? "none"
                  : "drop-shadow(0 6px 18px rgba(0,0,0,0.25))",
                borderRadius: 1,
              }}
            />
          </Link>

          {/* MENU DESKTOP */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {filteredMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant='subtitle1'
                    sx={{
                      cursor: "pointer",
                      color: scrolled ? "#E53888" : "#E53888",
                      px: 2,
                      py: 1,
                      borderRadius: "10px",
                      fontWeight: 500,
                      transition: "all 0.25s ease",
                      position: "relative",
                      display: "inline-block",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: "50%",
                        bottom: 6,
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 4,
                        background:
                          "linear-gradient(90deg, rgba(229,83,140,0.85), rgba(215,46,121,0.85))",
                        borderRadius: 2,
                        transition: "width .28s cubic-bezier(.2,.8,.2,1)",
                      },
                      "&:hover::after": {
                        width: "60%",
                      },
                      "&:hover": {
                        backgroundColor: scrolled
                          ? "rgba(229,56,136,0.08)"
                          : "rgba(255,255,255,0.06)",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}

          {/* BOTONES DE ACCIÓN */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {/* 🪑 Carrito Salón */}
              <BadgeBox
                count={cartCount}
                anchor
                top='6px'
                right='6px'
                size='md'
              >
                <IconButton
                  onClick={() => setOpenCart(true)}
                  sx={{
                    borderRadius: "12px",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "rgba(229,56,136,0.08)",
                    },
                  }}
                >
                  <FornitureIcon width={42} />
                </IconButton>
              </BadgeBox>

              {/* 🛍️ Carrito Tienda (Shopify) */}
              {/* <IconButton
                onClick={() => setOpenCartShopify(true)}
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "rgba(229,56,136,0.08)",
                  },
                }}
              > */}
              {/* <ShopifyCartButton onClick={() => setOpenCartShopify(true)} /> */}
              {/* </IconButton> */}

              {/* <ShopifyCartDrawer
                open={openCartShopify}
                onClose={() => setOpenCartShopify(false)}
              /> */}

              {/* 🔐 Auth */}
              {!autenticado ? (
                <Button
                  component={Link}
                  to='/iniciar-sesion'
                  variant='outlined'
                  size='large'
                  sx={{
                    color: "#E53888",
                    borderColor: "#E53888",
                    borderRadius: "10px",
                    px: 2.2,
                    py: 1,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "rgba(229,56,136,0.09)",
                    },
                  }}
                >
                  Iniciar
                </Button>
              ) : (
                <>
                  <NotificationsBell />

                  <Button
                    component={Link}
                    to='/mi-perfil'
                    variant='contained'
                    size='large'
                    sx={{
                      color: "#fff",
                      backgroundColor: "#E53888",
                      borderRadius: "10px",
                      px: 2.2,
                      py: 1,
                      boxShadow: scrolled
                        ? "0 8px 20px rgba(229,83,140,0.12)"
                        : "0 6px 14px rgba(229,83,140,0.10)",
                      "&:hover": {
                        backgroundColor: "#d82e7a",
                      },
                    }}
                  >
                    Perfil
                  </Button>
                </>
              )}
            </Box>
          )}

          {/* MOBILE */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <NotificationsBell />
              <IconButton
                edge='start'
                sx={{
                  color: scrolled ? "#E53888" : "#E53888",
                  "&:hover": { backgroundColor: "rgba(229, 56, 136, 0.08)" },
                }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                <Box
                  sx={{
                    width: 250,
                    p: 2,
                    zIndex: 2600,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background:
                      "linear-gradient(180deg, rgba(243,187,206,0.18), rgba(255,255,255,0.06))",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(243,187,206,0.16)",
                  }}
                >
                  <Box>
                    <Link to='/' style={{ textDecoration: "none" }}>
                      <Typography
                        variant='h6'
                        sx={{ color: "#E53888", fontWeight: "bold", mb: 2 }}
                      >
                        <img
                          src={
                            "https://cdn.floreciendojuntas.com/production/statics/LOGOTIPO+FLORECIENDO+JUNTAS+negro.png"
                          }
                          width='90%'
                          height={70}
                        />
                      </Typography>
                    </Link>
                    <List>
                      {filteredMenu.map((item) => (
                        <ListItem key={item.path} disablePadding>
                          <Link
                            to={item.path}
                            style={{ textDecoration: "none", width: "100%" }}
                          >
                            <ListItemButton
                              onClick={() => setOpen(false)}
                              sx={{ borderRadius: "12px" }}
                            >
                              <ListItemText
                                primary={item.name}
                                sx={{ color: "#E53888", fontWeight: "bold" }}
                              />
                            </ListItemButton>
                          </Link>
                        </ListItem>
                      ))}
                      {/* 🪑 Carrito Salón */}
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setOpen(false);
                            setOpenCart(true);
                          }}
                          sx={{ borderRadius: "12px" }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <FornitureIcon width={28} />
                          </ListItemIcon>

                          <ListItemText
                            primary='Carrito (Salón)'
                            sx={{ color: "#E53888", fontWeight: "bold" }}
                          />
                        </ListItemButton>
                      </ListItem>

                      {/* 🛍️ Carrito Tienda (Shopify) */}
                      {/* <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setOpen(false);
                            setOpenCartShopify(true);
                          }}
                          sx={{ borderRadius: "12px" }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <ShopifyCartButton />
                          </ListItemIcon>

                          <ListItemText
                            primary='Carrito (Tienda)'
                            sx={{ color: "#E53888", fontWeight: "bold" }}
                          />
                        </ListItemButton>

                        <ShopifyCartDrawer
                          open={openCartShopify}
                          onClose={() => setOpenCartShopify(false)}
                        />
                      </ListItem> */}
                    </List>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      {!autenticado ? (
                        <>
                          <Button
                            component={Link}
                            to='/iniciar-sesion'
                            variant='outlined'
                            sx={{
                              color: "#E53888",
                              borderColor: "#E53888",
                              borderRadius: "10px",
                            }}
                          >
                            Iniciar sesión
                          </Button>
                          <Button
                            component={Link}
                            to='/registro'
                            variant='contained'
                            sx={{
                              bgcolor: "#E53888",
                              borderColor: "#E53888",
                              borderRadius: "10px",
                            }}
                          >
                            Crear cuenta
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            component={Link}
                            to='/mi-perfil'
                            variant='contained'
                            sx={{
                              color: "#fff",
                              backgroundColor: "#E53888",
                              borderRadius: "10px",
                              "&:hover": { backgroundColor: "#d82e7a" },
                            }}
                          >
                            Mi Perfil
                          </Button>
                          <Button
                            variant='outlined'
                            onClick={() => handleClickLogout()}
                            sx={{
                              borderColor: "#E53888",
                              color: "#E53888",
                              borderRadius: "10px",
                              "&:hover": { borderColor: "#d82e7a" },
                            }}
                          >
                            Cerrar Sesión
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar carrito */}
      <CartSidebar open={openCart} onClose={() => setOpenCart(false)} />
    </Box>
  );
};

export default Header;
