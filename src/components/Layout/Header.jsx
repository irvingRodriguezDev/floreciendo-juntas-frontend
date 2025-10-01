import React, { useState } from "react";
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

const menuItems = [
  {
    name: "Cursos",
    path: "/cursos",
  },
  { name: "Certificaciones", path: "/certificaciones" },
  { name: "El salón de tus sueños", path: "/el-salon-de-tus-sueños" },
  { name: "Manicurista exitosa: 10 secretos", path: "/10-secretos" },
  { name: "Tienda", path: "/tienda" },
  { name: "Eventos", path: "/eventos" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='absolute'
        sx={{
          width: "98%",
          mt: 2,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(238, 158, 234, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(11px)",
          border: "1px solid rgba(238, 158, 234, 0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link style={{ textDecoration: "none" }} to='/cursos'>
            <Typography
              variant='h6'
              sx={{
                color: "#E53888",
                fontFamily: "fantasy",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              Floreciendo Juntas
            </Typography>
          </Link>

          {/* Menú Desktop centrado */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              {menuItems.map((item) => (
                <Link to={item.path} style={{ textDecoration: "none" }}>
                  <Typography
                    key={item}
                    variant='h6'
                    sx={{
                      cursor: "pointer",
                      color: "#E53888",
                      px: 2,
                      py: 1,
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "rgba(238, 158, 234, 0.2)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(11px)",
                        border: "1px solid rgba(238, 158, 234, 0.3)",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}

          {/* Botones de acción */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to={"/iniciar-sesion"}
                variant='outlined'
                size='large'
                sx={{
                  color: "#E53888",
                  borderColor: "#E53888",
                  borderRadius: "10px",
                  "&:hover": { backgroundColor: "rgba(229, 56, 136, 0.1)" },
                  "&:focus": { outline: "none" },
                  "&:focus-visible": { outline: "none" },
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
                  borderColor: "#E53888",
                  borderRadius: "10px",
                  "&:hover": { backgroundColor: "#E53888" },
                  "&:focus": { outline: "none" },
                  "&:focus-visible": { outline: "none" },
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}

          {/* Menú Mobile */}
          {isMobile && (
            <>
              <IconButton
                edge='start'
                sx={{
                  color: "#E53888",
                  "&:hover": { backgroundColor: "rgba(229, 56, 136, 0.1)" },
                }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                  <Typography
                    variant='h6'
                    sx={{ color: "#E53888", fontWeight: "bold", mb: 2 }}
                  >
                    Menú
                  </Typography>
                  <List>
                    {menuItems.map((item) => (
                      <ListItem key={item} disablePadding>
                        <Link to={item.path} style={{ textDecoration: "none" }}>
                          <ListItemButton
                            onClick={() => setOpen(false)}
                            sx={{
                              borderRadius: "16px",
                              "&:hover": {
                                backgroundColor: "rgba(238, 158, 234, 0.2)",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(11px)",
                                border: "1px solid rgba(238, 158, 234, 0.3)",
                              },
                            }}
                          >
                            <ListItemText
                              primary={item.name}
                              sx={{ color: "#E53888" }}
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Button
                      component={Link}
                      to='/iniciar-sesion'
                      variant='outlined'
                      sx={{
                        color: "#E53888",
                        borderColor: "#E53888",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "rgba(229, 56, 136, 0.1)",
                        },
                      }}
                    >
                      Sign In
                    </Button>

                    <Button
                      component={Link}
                      to='/registro'
                      variant='outlined'
                      sx={{
                        color: "#E53888",
                        borderColor: "#E53888",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "rgba(229, 56, 136, 0.1)",
                        },
                      }}
                    >
                      Sign Up
                    </Button>
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
