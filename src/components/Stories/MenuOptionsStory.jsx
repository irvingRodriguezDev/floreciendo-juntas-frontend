import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MethodDelete } from "../../config/Service";
import Swal from "sweetalert2";
import { alerts } from "../../utils/Alerts";
import DeleteIcon from "@mui/icons-material/Delete";
const ITEM_HEIGHT = 48;

const MenuOptionsStory = ({ storyId, closeModal, fetchStories }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteHistory = () => {
    let url = `/stories/${storyId}`;
    handleClose();
    closeModal();
    Swal.fire({
      title: "Eliminado historia...",
      text: "Por favor espera mientras se borra tu historia",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    MethodDelete(url)
      .then((res) => {
        if (res.status === 200) {
          alerts.success("La historia se ha eliminado correctamente!");
        }
        fetchStories();
      })
      .catch((error) => {
        console.log(error, "Ocurrio un error al eliminar la historia");
        handleClose();
        closeModal();
        alerts.error("Upps!", "Ocurrio un problema al eliminar la historia");
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open}
        aria-haspopup='true'
        onClick={handleClick}
        sx={{
          position: "relative",
          justifyItems: "flex-end",
        }}
      >
        <MoreVertIcon sx={{ color: "#fff" }} />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        <MenuItem key={1} onClick={handleDeleteHistory}>
          <DeleteIcon sx={{ color: "red" }} /> Eliminar Historia
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuOptionsStory;
