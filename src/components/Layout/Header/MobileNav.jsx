import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";

const MobileNav = ({
  onOpenShopifyCart,
  openShopifyCart,
  onCloseShopifyCart,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ color: "#E53888" }}>
        <MenuIcon />
      </IconButton>

      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpenShopifyCart={onOpenShopifyCart}
        openShopifyCart={openShopifyCart}
        onCloseShopifyCart={onCloseShopifyCart}
      />
    </>
  );
};

export default MobileNav;
