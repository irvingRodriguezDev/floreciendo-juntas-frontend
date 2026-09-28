import { Box, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import BadgeBox from "../../ui/BadgeBox";
import ShopifyCartButton from "../../../containers/Store/ShopifyCartButton";
import ShopifyCartDrawer from "../../../containers/Store/ShopifyCartDrawer";
import FornitureIcon from "../../icons/FornitureIcon";
import AuthContext from "../../../context/Auth/AuthContext";
import { useContext } from "react";

const DesktopActions = ({
  scrolled,
  cartCount,
  onOpenSalonCart,
  onOpenShopifyCart,
  openShopifyCart,
  onCloseShopifyCart,
}) => {
  const { autenticado } = useContext(AuthContext);

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <BadgeBox count={cartCount} anchor top='6px' right='6px' size='md'>
        <IconButton onClick={onOpenSalonCart}>
          <FornitureIcon width={50} />
        </IconButton>
      </BadgeBox>

      <ShopifyCartButton onClick={onOpenShopifyCart} />
      <ShopifyCartDrawer open={openShopifyCart} onClose={onCloseShopifyCart} />

      {!autenticado ? (
        <Button
          component={Link}
          to='/iniciar-sesion'
          variant='outlined'
          sx={{
            borderRadius: "10px",
            color: "#E53888",
            borderColor: "#E53888",
          }}
        >
          Iniciar
        </Button>
      ) : (
        <Button
          component={Link}
          to='/mi-perfil'
          variant='contained'
          sx={{ borderRadius: "10px", backgroundColor: "#E53888" }}
        >
          Mi Perfil
        </Button>
      )}
    </Box>
  );
};

export default DesktopActions;
