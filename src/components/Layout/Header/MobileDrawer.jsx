import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/LOGOTIPO FLORECIENDO JUNTAS negro.png";
import ShopifyCartButton from "../../../containers/Store/ShopifyCartButton";
import AuthContext from "../../../context/Auth/AuthContext";
import { useContext } from "react";

const menuItems = [
  { name: "Comunidad", path: "/comunidad" },
  { name: "10 Secretos", path: "/secretos" },
  { name: "Lives", path: "/lives" },
  { name: "Salón", path: "/el-salon-de-tus-sueños" },
  { name: "Eventos", path: "/eventos" },
  { name: "Tienda", path: "/tienda" },
];

const MobileDrawer = ({
  open,
  onClose,
  onOpenShopifyCart,
  openShopifyCart,
  onCloseShopifyCart,
}) => {
  const { autenticado } = useContext(AuthContext);

  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <Box sx={{ width: 260, p: 2, height: "100vh" }}>
        <Link to='/'>
          <img src={Logo} width='100%' />
        </Link>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <Link
                to={item.path}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <ListItemButton onClick={onClose}>
                  <ListItemText
                    primary={item.name}
                    sx={{ color: "#E53888", fontWeight: "bold" }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}

          <ListItem>
            <ShopifyCartButton onClick={onOpenShopifyCart} />
          </ListItem>
        </List>

        {!autenticado ? (
          <Button
            component={Link}
            to='/iniciar-sesion'
            variant='outlined'
            fullWidth
            sx={{ borderColor: "#E53888", color: "#E53888" }}
          >
            Iniciar
          </Button>
        ) : (
          <Button
            component={Link}
            to='/mi-perfil'
            variant='contained'
            fullWidth
            sx={{ backgroundColor: "#E53888" }}
          >
            Mi Perfil
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
