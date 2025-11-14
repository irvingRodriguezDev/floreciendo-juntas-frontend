import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import CartContext from "../../context/Cart/CartContext";

export default function CartItem({ item }) {
  const { increase, decrease, removeItem } = useContext(CartContext);

  return (
    <Box
      display='flex'
      gap={2}
      mb={3}
      sx={{
        borderBottom: "1px solid #eee",
        pb: 2,
      }}
    >
      {/* Imagen del producto */}
      <Box
        component='img'
        src={item.image || "/placeholder.png"}
        alt={item.name}
        sx={{
          width: 70,
          height: 70,
          borderRadius: 2,
          objectFit: "cover",
          background: "#f5f5f5",
        }}
      />

      {/* Info */}
      <Box flex={1}>
        <Typography fontWeight={600}>{item.name}</Typography>

        <Typography fontSize='14px' sx={{ opacity: 0.7, mt: 0.3 }}>
          ${item.price}
        </Typography>

        {/* Controles */}
        <Box display='flex' alignItems='center' gap={1} mt={1}>
          {/* Disminuir */}
          <IconButton
            onClick={() => decrease(item.id)}
            size='small'
            disabled={item.quantity <= 1}
          >
            <RemoveIcon fontSize='small' />
          </IconButton>

          {/* Cantidad */}
          <Typography fontWeight={600}>{item.quantity}</Typography>

          {/* Aumentar */}
          <IconButton onClick={() => increase(item.id)} size='small'>
            <AddIcon fontSize='small' />
          </IconButton>

          {/* Eliminar */}
          <IconButton
            onClick={() => removeItem(item.id)}
            color='error'
            size='small'
            sx={{ marginLeft: "auto" }}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
