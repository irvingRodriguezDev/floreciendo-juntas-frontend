import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton } from "@mui/material";
import CartContext from "../../context/Cart/CartContext";
import { useContext } from "react";

export default function CartButton({ onOpen }) {
  const { cartCount } = useContext(CartContext);

  return (
    <IconButton onClick={onOpen}>
      <Badge badgeContent={cartCount} color='primary'>
        <ShoppingCartIcon sx={{ color: "#111" }} />
      </Badge>
    </IconButton>
  );
}
