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
import fileDownload from "js-file-download";
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

  //Obtener Certificado
  const DownloadCertificate = async (id, name) => {
    const { value: nombreCertificado, isConfirmed } = await Swal.fire({
      title: "Personaliza tu Certificado",
      text: "Ingresa el nombre que aparecerá (máximo 25 caracteres):",
      input: "text",
      inputValue: name.substring(0, 25), // Pre-cargamos el nombre limitado
      inputPlaceholder: "Nombre y Apellido",
      showCancelButton: true,
      confirmButtonText: "Descargar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e91e63",
      inputAttributes: {
        maxlength: 25,
        autocomplete: "off",
        autocapitalize: "words",
      },
      // Agregamos el contador de caracteres dinámico
      footer: '<b id="char-count">25</b> caracteres restantes',
      didOpen: () => {
        const input = Swal.getInput();
        const footer = document.getElementById("char-count");

        // Actualizar contador al escribir
        input.addEventListener("input", () => {
          const remaining = 25 - input.value.length;
          footer.innerText = remaining;
        });
      },
      // Validación de solo texto y longitud
      inputValidator: (value) => {
        if (!value) {
          return "El nombre es obligatorio";
        }
        // Regex para permitir solo letras y espacios (incluye acentos y ñ)
        const soloLetras = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!soloLetras.test(value)) {
          return "Solo se permiten letras y espacios";
        }
      },
    });

    if (!isConfirmed || !nombreCertificado) return;

    // Iniciamos la carga
    Swal.fire({
      title: "Construyendo certificado...",
      text: "Por favor espera un momento.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Enviamos el nombre validado al backend
      const url = `/certifications/download-certificate?certificationId=${id}&nameCertification=${encodeURIComponent(nombreCertificado)}`;

      const res = await clienteAxios.get(url, { responseType: "blob" });
      fileDownload(res.data, `Certificado-${nombreCertificado}.pdf`);

      Swal.fire({
        icon: "success",
        title: "¡Certificado generado!",
        text: "Se ha descargado correctamente.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e91e63",
      });
    } catch (error) {
      console.error("Error al descargar:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No pudimos generar el archivo. Intenta de nuevo.",
        confirmButtonText: "Cerrar",
      });
    }
  };
  const DownloadDiploma = async (id, name) => {
    const { value: nombreDiploma, isConfirmed } = await Swal.fire({
      title: "Personaliza tu Diploma",
      text: "Escribe el nombre tal cual deseas que aparezca impreso:",
      input: "text",
      inputValue: name.substring(0, 25),
      inputPlaceholder: "Ej. María García",
      showCancelButton: true,
      confirmButtonText: "Generar ahora",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e91e63",
      inputAttributes: {
        maxlength: 25,
        autocomplete: "off",
        autocapitalize: "words",
      },
      // Agregamos el contador de caracteres dinámico
      footer: '<b id="char-count">25</b> caracteres restantes',
      didOpen: () => {
        const input = Swal.getInput();
        const footer = document.getElementById("char-count");

        // Actualizar contador al escribir
        input.addEventListener("input", () => {
          const remaining = 25 - input.value.length;
          footer.innerText = remaining;
        });
      },
    });

    if (!isConfirmed || !nombreDiploma) return;

    Swal.fire({
      title: "Construyendo diploma...",
      text: "Por favor espera un momento.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Usamos nombreDiploma que es el valor final validado
      const url = `/certifications/download-diploma?certificationId=${id}&nombreDiploma=${encodeURIComponent(nombreDiploma)}`;

      const res = await clienteAxios.get(url, { responseType: "blob" });

      fileDownload(res.data, `diploma-${nombreDiploma}.pdf`);

      Swal.fire({
        icon: "success",
        title: "¡Diploma generado correctamente!",
        text: "Tu diploma ha sido descargado con éxito.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e91e63",
      });
    } catch (error) {
      console.error("Ocurrió un error al descargar el diploma:", error);

      Swal.fire({
        icon: "error",
        title: "Error al generar el diploma",
        text: "Ocurrió un problema al descargar el diploma. Intenta nuevamente.",
        confirmButtonText: "Cerrar",
      });
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
        DownloadCertificate,
        DownloadDiploma,
      }}
    >
      {children}
    </CertificationsContext.Provider>
  );
};

export default CertificationsState;
