import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import CartIcon from "../icons/CartIcon";

export default function CartButton({ onOpen }) {
  return (
    <IconButton onClick={onOpen}>
      <CartIcon width={45} />
    </IconButton>
  );
}
