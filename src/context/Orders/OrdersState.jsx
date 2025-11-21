import { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import OrdersReducer from "./OrdersReducer";
import OrdersContext from "./OrdersContext";
import { GET_ORDER_USER } from "../../types";
import clienteAxios from "../../config/Axios";
import fileDownload from "js-file-download";
const OrdersState = ({ children }) => {
  const initialState = {
    orders: [],
    order: {},
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  };
  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  const createOrder = async () => {
    try {
      Swal.fire({
        title: "Procesando...",
        text: "Estamos creando tu orden",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      console.log("➡ Creando orden...");
      const resOrder = await MethodPost("/orders/create");

      console.log("✔ Orden creada", resOrder);

      if (resOrder.status !== 200) throw new Error("Error al crear orden");

      console.log("➡ Creando sesión de pago...");
      const resCheckout = await MethodPost(
        `/order-payments/create-checkout-session/${resOrder.data.order.id}`
      );

      console.log("✔ Sesión creada", resCheckout);

      if (resCheckout.status !== 200)
        throw new Error("Error al crear sesión de pago");

      Swal.close();

      console.log("➡ Redirigiendo al checkout...");
      window.location.href = resCheckout.data.url;
    } catch (error) {
      Swal.close();
      console.error("❌ ERROR:", error);

      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: error.message || "Por favor intenta más tarde.",
      });
    }
  };

  const getOrdersUser = (data) => {
    let url = `/orders/user/${data.id}`;

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ORDER_USER,
          payload: {
            orders: res.data.orders,
            totalItems: res.data.total, // ⚠ ojo, tu backend devuelve 'total'
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPaymentOrder = (data) => {
    let url = `/events/buy/ticket`;
    MethodPost(url, data)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((error) => {
        console.log(error, "ocurrio un error");
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };

  const addCustomPayment = async (id, total, pagado, restante) => {
    const { value: amount } = await Swal.fire({
      title: "Ingresa la cantidad",
      input: "number",
      inputLabel: "Cantidad que desear abonar, al salon de tus sueños",
      inputPlaceholder: "Ej. 150",
      inputAttributes: {
        min: 50,
        step: "0.01",
      },
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value || value <= 0) {
          return "Ingresa una cantidad válida";
        }
        return null;
      },
    });
    let url = `/order-payments/${id}/pay-partial`;
    let datos = { amount: amount };
    MethodPost(url, datos)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((error) => {
        console.log(error, "Ocurrio un error al intentar realizar el pago");
      });
  };

  const downloadEdoCtaDream = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "¿Descargar estado de cuenta?",
        text: "Se generará un archivo con tu estado de cuenta.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, descargar",
        cancelButtonText: "Cancelar",
      });

      if (!confirm.isConfirmed) return;

      Swal.fire({
        title: "Generando estado de cuenta...",
        text: "Por favor espera",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading(),
      });

      // 1️⃣ Ya no pedimos blob
      const res = await clienteAxios.get(`/orders/${id}/account-statement`);

      console.log(res.data, "respuesta del backend");

      const { url } = res.data;

      if (!url) {
        throw new Error("La URL del PDF no se recibió.");
      }

      // 2️⃣ Abrir el PDF en nueva pestaña
      window.open(url, "_blank");

      Swal.fire({
        icon: "success",
        title: "¡Estado de cuenta generado!",
        text: "Tu archivo se ha abierto correctamente.",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "No se pudo generar el estado de cuenta.",
      });
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders: state.orders,
        order: state.order,
        totalItems: state.totalItems,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        getOrdersUser,
        addCustomPayment,
        downloadEdoCtaDream,
        createOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
export default OrdersState;
