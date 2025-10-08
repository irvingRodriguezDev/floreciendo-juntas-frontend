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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";

const menuItems = [
  { name: "Cursos", path: "/cursos", auth: "both" },
  { name: "Certificaciones", path: "/certificaciones", auth: "both" },
  {
    name: "El salón de tus sueños",
    path: "/el-salon-de-tus-sueños",
    auth: "both",
  },
  {
    name: "Manicurista exitosa: 10 secretos",
    path: "/10-secretos",
    auth: "both",
  },
  { name: "Tienda", path: "/tienda", auth: "both" },
  { name: "Eventos", path: "/eventos", auth: "both" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { autenticado } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:900px)");
  const [scrolled, setScrolled] = useState(false);

  // 🔹 Detectar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Filtrar menú según auth
  const filteredMenu = menuItems.filter((item) => {
    if (item.auth === "both") return true;
    if (item.auth === true && autenticado) return true;
    if (item.auth === false && !autenticado) return true;
    return false;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        elevation={scrolled ? 4 : 0}
        sx={{
          width: "98%",
          mt: 2,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "16px",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "0 4px 30px rgba(0, 0, 0, 0.1)",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(241, 189, 206, 0.3)",
          backdropFilter: "blur(12px)",
          border: scrolled
            ? "1px solid rgba(255, 255, 255, 0.4)"
            : "1px solid rgba(241, 189, 206, 0.3)",
          transition: "all 0.3s ease",
          color: scrolled ? "#E53888" : "#E53888",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          {/* LOGO */}
          <Link style={{ textDecoration: "none" }} to='/cursos'>
            <Typography
              variant='h6'
              sx={{
                color: scrolled ? "#E53888" : "#fff",
                fontWeight: "bold",
                fontSize: "30px",
                textShadow: scrolled ? "none" : "0 2px 6px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
            >
              Floreciendo Juntas
            </Typography>
          </Link>

          {/* MENÚ DESKTOP */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexGrow: 1,
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
                      color: scrolled ? "#E53888" : "#fff",
                      px: 2,
                      py: 1,
                      borderRadius: "10px",
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: scrolled
                          ? "rgba(229, 56, 136, 0.1)"
                          : "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}

          {/* BOTONES ACCIÓN */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {!autenticado ? (
                <>
                  <Button
                    component={Link}
                    to={"/iniciar-sesion"}
                    variant='outlined'
                    size='large'
                    sx={{
                      color: scrolled ? "#E53888" : "#fff",
                      borderColor: scrolled ? "#E53888" : "#fff",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: scrolled
                          ? "rgba(229, 56, 136, 0.1)"
                          : "rgba(255,255,255,0.15)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant='contained'
                    component={Link}
                    to={"/registro"}
                    size='large'
                    sx={{
                      color: "#fff",
                      backgroundColor: "#E53888",
                      borderRadius: "10px",
                      "&:hover": { backgroundColor: "#d82e7a" },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button
                  component={Link}
                  to={"/perfil"}
                  variant='contained'
                  size='large'
                  sx={{
                    color: "#fff",
                    backgroundColor: "#E53888",
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#d82e7a" },
                  }}
                >
                  Mi Perfil
                </Button>
              )}
            </Box>
          )}

          {/* MENÚ MOBILE */}
          {isMobile && (
            <>
              <IconButton
                edge='start'
                sx={{
                  color: scrolled ? "#E53888" : "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(229, 56, 136, 0.1)",
                  },
                  transition: "color 0.3s ease",
                }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                <Box
                  sx={{
                    width: 250,
                    p: 2, // Shorthand for padding in MUI; overrides the full 'padding' below if needed
                    // bgcolor: "#fff", // Commented out as in original
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)", // Vendor prefix for Safari support (camelCase in sx)
                    borderTopRightRadius: "16px",
                    borderBottomRightRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    // padding: "20px", // Commented out to avoid conflict with 'p: 2'; use one or the other
                    color: "#ff4081",
                  }}
                >
                  <Box>
                    <Typography
                      variant='h6'
                      sx={{ color: "#E53888", fontWeight: "bold", mb: 2 }}
                    >
                      Menú
                    </Typography>
                    <List>
                      {filteredMenu.map((item) => (
                        <ListItem key={item.path} disablePadding>
                          <Link
                            to={item.path}
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemButton
                              onClick={() => setOpen(false)}
                              sx={{
                                borderRadius: "12px",
                                "&:hover": {
                                  backgroundColor: "rgba(238, 158, 234, 0.15)",
                                },
                              }}
                            >
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

                  {/* Botones dentro del drawer */}
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
                          Sign In
                        </Button>
                        <Button
                          component={Link}
                          to='/registro'
                          variant='contained'
                          sx={{
                            color: "#fff",
                            backgroundColor: "#E53888",
                            borderRadius: "10px",
                            "&:hover": { backgroundColor: "#d82e7a" },
                          }}
                        >
                          Sign Up
                        </Button>
                      </>
                    ) : (
                      <Button
                        component={Link}
                        to='/perfil'
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
                    )}
                  </Box>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
