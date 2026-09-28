import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import CartContext from "../../context/Cart/CartContext";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import AuthContext from "../../context/Auth/AuthContext";
export default function CartItem({ item }) {
  const { increase, decrease, removeItem } = useContext(CartContext);
  const { autenticado } = useContext(AuthContext);

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
        src={item.product?.image?.url || item.product.image || null}
        alt={item.product?.name || "Producto"}
        sx={{
          width: 70,
          height: 70,
          borderRadius: 2,
          objectFit: "cover",
          background: "#f5f5f5",
        }}
      />

      {/* Información del producto */}
      <Box flex={1}>
        <Typography fontWeight={600}>
          {item.product?.name || "Producto sin nombre"}
        </Typography>

        <Typography fontSize='14px' sx={{ opacity: 0.7, mt: 0.3 }}>
          Precio Unitario:{" "}
          {formatMexicanCurrency(Number(item.product?.price || 0))}
        </Typography>
        <Typography fontSize='14px' sx={{ opacity: 0.7, mt: 0.3 }}>
          Subtotal:{" "}
          {formatMexicanCurrency(
            Number(item.product?.price * item.quantity || 0)
          )}
        </Typography>
        {/* Controles */}
        <Box display='flex' alignItems='center' gap={1} mt={1}>
          {/* Disminuir */}
          <IconButton
            onClick={() =>
              decrease(
                item.id,
                autenticado ? item.productId : item.product.product_id,
                autenticado
              )
            }
            size='small'
            disabled={item.quantity <= 1}
          >
            <RemoveIcon fontSize='small' />
          </IconButton>

          {/* Cantidad */}
          <Typography fontWeight={600}>{item.quantity}</Typography>

          {/* Aumentar */}
          <IconButton
            onClick={() =>
              increase(
                item.id,
                autenticado ? item.productId : item.product.product_id,
                autenticado
              )
            }
            size='small'
          >
            <AddIcon fontSize='small' />
          </IconButton>

          {/* Eliminar */}
          <IconButton
            onClick={() =>
              removeItem(
                item.id,
                autenticado ? item.productId : item.product.product_id,
                autenticado
              )
            }
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
