import Select from "react-select";
import UserContext from "../../context/User/UserContext";
import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShippingAddressModal from "../../components/Orders/ShippingAddressModal";

const AddressSelect = (props) => {
  const { address, getAddresses } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAddresses();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const detectarCambiosAddress = (value) => {
    props.detectarCambiosAddress(value);
  };
  const opt = address.map((a) => ({
    value: a.id,
    label: `${a.recipientName}, ${a.street} ${a.number}, ${a.neighborhood}, ${a.city}, ${a.state}, ${a.zipCode}, ${a.instructions}`,
  }));

  // 🎀 FLORECIENDO JUNTAS — Estilos personalizados
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#FDE7EF",
      borderColor: state.isFocused ? "#E63988" : "#F9C4D9",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(230, 57, 136, 0.3)" : "none",
      borderRadius: 12,
      padding: "4px 6px",
      ":hover": { borderColor: "#E63988" },
      overflowX: "hidden",
      maxWidth: "100%",
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#FDE7EF",
      borderRadius: 10,
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      overflowX: "hidden",
      maxWidth: "100%",
    }),

    menuList: (base) => ({
      ...base,
      padding: 4,
      overflowX: "hidden",
      whiteSpace: "normal",
      maxWidth: "100%",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#E63988"
        : state.isFocused
        ? "#F9C4D9"
        : "#FDE7EF",
      color: state.isSelected ? "white" : "#444",
      borderRadius: 10,
      margin: "4px",
      padding: "10px",
      cursor: "pointer",
      transition: "all .20s ease",
      overflowX: "hidden",
      whiteSpace: "normal",
      wordBreak: "break-word",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#BE3C77",
      fontWeight: 500,
    }),

    singleValue: (base) => ({
      ...base,
      color: "#BE3C77",
      fontWeight: 600,
      overflowX: "hidden",
    }),
  };

  return (
    <>
      {opt.length > 0 ? (
        <Box sx={{ overflowX: "hidden" }}>
          <Select
            onChange={detectarCambiosAddress}
            options={opt}
            styles={customStyles}
            placeholder='Selecciona una dirección de envío...'
            isSearchable={false}
            menuPortalTarget={document.body}
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
          <Button
            variant='outlined'
            startIcon={<LocationOnIcon />}
            onClick={handleClickOpen}
            sx={{
              borderColor: "#E63988",
              color: "#E63988",
              textTransform: "none",
              borderRadius: "12px",
              px: 3,
              py: 1,
              borderWidth: 2,
            }}
          >
            Registrar nueva dirección de envío
          </Button>
          <ShippingAddressModal open={open} onClose={handleClose} />
        </Box>
      )}
    </>
  );
};

export default AddressSelect;
