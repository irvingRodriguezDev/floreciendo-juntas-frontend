import { useContext } from "react";
import { IconButton, Badge, CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShopifyCartContext } from "../../context/ShopifyCart/ShopifyCartContext";
import CartIcon from "../../components/icons/CartIcon";

export default function ShopifyCartButton({ onClick }) {
  const { cart, loadingCart } = useContext(ShopifyCartContext);

  const totalItems =
    cart?.lines?.edges?.reduce((acc, item) => acc + item.node.quantity, 0) || 0;

  return (
    <IconButton color='inherit' onClick={onClick}>
      <Badge badgeContent={totalItems} color='secondary'>
        {loadingCart ? (
          <CircularProgress size={20} color='inherit' />
        ) : (
          <CartIcon width={28} />
        )}
      </Badge>
    </IconButton>
  );
}
