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

const menuItems = [
  "Cursos",
  "Certificaciones",
  "El salón de tus sueños",
  "Tienda",
  "Manicurista exitosa: 10 secretos",
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
                  {item}
                </Typography>
              ))}
            </Box>
          )}

          {/* Botones de acción */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
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
                            primary={item}
                            sx={{ color: "#E53888" }}
                          />
                        </ListItemButton>
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
                      variant='contained'
                      sx={{
                        color: "#fff",
                        backgroundColor: "#E53888",
                        borderRadius: "10px",
                        "&:hover": { backgroundColor: "#E53888" },
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
