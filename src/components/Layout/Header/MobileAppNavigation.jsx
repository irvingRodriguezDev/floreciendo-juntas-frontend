import { Box, IconButton, Paper, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SaloonIcon from "../../icons/SaloonIcon";
import TicketsIcon from "../../icons/TicketsIcon";
import ShopIcon from "../../icons/ShopIcon";
import LiveIcon from "../../icons/LiveIcon";
import FlowerIcon from "../../icons/FlowerIcon";
import CommunityIcon from "../../icons/CommunityIcon";
import PersonIcon from "../../icons/PersonIcon";
import HomeIcon from "../../icons/HomeIcon";
import DistributionIcon from "../../icons/DistributionIcon";
const MobileAppNavigation = ({ cartCount, onOpenSalonCart }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={12}
      sx={{
        position: "fixed",
        bottom: 12,
        left: "50%",
        transform: "translateX(-50%)",
        width: "94%",
        maxWidth: 420,
        height: 72,
        borderRadius: "22px",
        display: { xs: "flex", md: "none" },
        justifyContent: "space-around",
        alignItems: "center",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.42), rgba(245,245,245,0.42))",

        backdropFilter: "blur(16px)",
        zIndex: 500,
      }}
    >
      <IconButton onClick={() => navigate("/comunidad")}>
        <CommunityIcon width={30} />
      </IconButton>
      <IconButton onClick={() => navigate("/secretos")}>
        <FlowerIcon width={30} />
      </IconButton>
      <IconButton onClick={() => navigate("/lives")}>
        <LiveIcon width={30} />
      </IconButton>

      {/* 🔥 FAB CENTRAL – SALÓN */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          backgroundColor: "#E53888",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translateY(-28px)",
          boxShadow: "0 10px 30px rgba(229,56,136,.45)",
        }}
      >
        {/* <IconButton onClick={onOpenSalonCart}>
          <Badge badgeContent={cartCount} color='error'>
            <FornitureIcon width={32} color='#fff' />
          </Badge>
        </IconButton> */}
        <IconButton onClick={() => navigate("/")}>
          <HomeIcon width={50} />
        </IconButton>
      </Box>
      <IconButton onClick={() => navigate("/el-salon-de-tus-sueños")}>
        <SaloonIcon width={30} />
      </IconButton>
      <IconButton onClick={() => navigate("/eventos")}>
        <TicketsIcon width={30} />
      </IconButton>
      <IconButton onClick={() => navigate("/distribucion")}>
        <DistributionIcon width={30} />
      </IconButton>
    </Paper>
  );
};

export default MobileAppNavigation;
