import { useReducer } from "react";
import CertificationsContext from "./CertificationsContext";
import CertificationsReducer from "./CertificationsReducer";
import MethodGet from "../../config/Service";
import {
  GET_CERTIFICATIONS_AVAILABLE,
  SEND_ENTREGABLE,
  SHOW_CERTIFICATION_DETAILS,
} from "../../types";
import clienteAxios from "../../config/Axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CertificationsState = ({ children }) => {
  const initialState = {
    certifications: [],
    certification: {},
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  };
  const [state, dispatch] = useReducer(CertificationsReducer, initialState);
  const navigate = useNavigate();
  const getAllCertificationsAvailable = (page, limit, search = "") => {
    let url = "/certifications/active";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_CERTIFICATIONS_AVAILABLE,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const detailsCertificationById = (id) => {
    let url = `/certifications/my-progress/${id}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: SHOW_CERTIFICATION_DETAILS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //enviar entregable
  const sendEntregable = async (data) => {
    try {
      // 1️⃣ Mostrar loading
      Swal.fire({
        title: "Enviando entregable...",
        text: "Por favor espera mientras se suben las imágenes",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await clienteAxios.post("/module-submission", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2️⃣ Cerrar loading
      Swal.close();

      // 3️⃣ Actualizar estado global
      dispatch({
        type: SEND_ENTREGABLE,
        payload: res.data,
      });

      // 4️⃣ Mostrar éxito
      await Swal.fire({
        icon: "success",
        title: "¡Entregado!",
        text: "La tarea se entregó de manera exitosa.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(-1);
      return res.data;
    } catch (error) {
      Swal.close();

      // Extraer mensaje del backend si existe
      const message =
        error.response?.data?.message ||
        "Ocurrió un error al enviar el entregable.";

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonColor: "#d33",
      });

      console.log(error, "No se envió el entregable");
      throw error;
    }
  };

  return (
    <CertificationsContext.Provider
      value={{
        certifications: state.certifications,
        certification: state.certification,
        getAllCertificationsAvailable,
        detailsCertificationById,
        sendEntregable,
      }}
    >
      {children}
    </CertificationsContext.Provider>
  );
};

export default CertificationsState;
