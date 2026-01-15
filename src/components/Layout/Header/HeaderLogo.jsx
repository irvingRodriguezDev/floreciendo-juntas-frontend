import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/LOGOTIPO FLORECIENDO JUNTAS negro.png";

const HeaderLogo = ({ scrolled }) => {
  return (
    <Link to='/' style={{ textDecoration: "none" }}>
      <Box
        component='img'
        src={Logo}
        alt='Floreciendo Juntas'
        sx={{
          width: 220,
          transition: "transform .3s ease",
          "&:hover": { transform: "translateY(-3px)" },
          filter: scrolled ? "none" : "drop-shadow(0 6px 18px rgba(0,0,0,.25))",
        }}
      />
    </Link>
  );
};

export default HeaderLogo;
