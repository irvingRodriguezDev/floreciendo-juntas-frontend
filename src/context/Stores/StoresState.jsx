import React, { useCallback, useReducer } from "react";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/Service";
import imageHeaders from "../../config/imageHeader";
import StoresContext from "./StoresContext";
import StoresReducer from "./StoresReducer";
import {
  CREATE_STORE_USER,
  DELETE_MY_STORE,
  GET_MY_STORE,
  GET_STORES_NEARBY,
  UPDATE_STORE_USER,
} from "../../types";
import Swal from "sweetalert2";
import clienteAxios from "../../config/Axios";
/**Importar componente token headers */

const StoresState = ({ children }) => {
  const initialState = {
    stores: [],
    user_store: null,
  };

  const [state, dispatch] = useReducer(StoresReducer, initialState);

  const getStoresNearby = (lat, lng) => {
    let url = `/stores/nearby?lat=${lat}&lng=${lng}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_STORES_NEARBY,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(
          error,
          "ocurrio un error al consultar las tiendas cercanas",
        );
      });
  };
  const createStoreUser = (data) => {
    Swal.fire({
      title: "Creando tu tienda...",
      text: "Estamos registrando tu punto de distribución, por favor espera.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner oficial de SweetAlert2
      },
    });

    let url = `/stores`;

    clienteAxios
      .post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // 2. Actualizamos Redux
        dispatch({
          type: CREATE_STORE_USER,
          payload: res.data.store,
        });

        // 3. Cambiamos el spinner por el mensaje de éxito
        Swal.fire({
          title: "¡Éxito!",
          text:
            res.data.message || "Tu tienda ha sido registrada correctamente.",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrió un error al registrar tu tienda");

        // 4. Si hay error, cerramos el spinner y mostramos el error
        Swal.fire({
          title: "Error",
          icon: "error",
          text:
            error.response?.data?.message ||
            "No se pudo crear la tienda. Intenta de nuevo.",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#FF4081",
        });
      });
  };
  const getMyStore = () => {
    let url = "/stores/my-shop";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_MY_STORE,
          payload: res.data.store,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un problema al obtener tu tienda");
      });
  };
  const updateStoreUser = (storeId, data) => {
    // data ya es FormData con solo los campos modificados
    clienteAxios
      .patch(`/stores/${storeId}`, data, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        dispatch({ type: UPDATE_STORE_USER, payload: res.data.store });
        Swal.fire({
          title: "¡Actualizado!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: error.response?.data?.message || "No se pudo actualizar.",
          confirmButtonColor: "#FF4081",
        });
      });
  };
  const deleteStore = (id) => {
    Swal.fire({
      title: "¿Desactivar tienda?",
      text: "Tu tienda dejará de ser visible en el mapa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4081", // El rosa de tu marca
      cancelButtonColor: "#636E72",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "No, conservar",
      showLoaderOnConfirm: true, // Muestra un spinner en el botón al confirmar
      preConfirm: () => {
        // Esta parte es pro: permite manejar la promesa dentro del mismo SweetAlert
        let url = `/stores/delete/${id}`;
        return MethodDelete(url)
          .then((res) => {
            if (!res.data)
              throw new Error("Error en la respuesta del servidor");
            return res.data;
          })
          .catch((error) => {
            Swal.showValidationMessage(
              `Error: ${error.response?.data?.message || "No se pudo conectar"}`,
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading(), // Evita cerrar el modal mientras borra
    }).then((result) => {
      if (result.isConfirmed) {
        // Actualizamos Redux
        dispatch({
          type: DELETE_MY_STORE,
          payload: id,
        });

        Swal.fire({
          title: "¡Desactivada!",
          text: "Tu tienda ha sido removida del mapa con éxito.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <StoresContext.Provider
      value={{
        stores: state.stores,
        user_store: state.user_store,
        getStoresNearby,
        createStoreUser,
        getMyStore,
        deleteStore,
        updateStoreUser,
      }}
    >
      {children}
    </StoresContext.Provider>
  );
};

export default StoresState;
