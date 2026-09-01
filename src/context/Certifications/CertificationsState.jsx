import { useReducer } from "react";
import CertificationsContext from "./CertificationsContext";
import CertificationsReducer from "./CertificationsReducer";
import MethodGet from "../../config/Service";
import {
  GET_CERTIFICATIONS_AVAILABLE,
  SEND_ENTREGABLE,
  SHOW_CERTIFICATION_DETAILS,
} from "../../types";
import { alerts } from "../../utils/Alerts";
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
      alerts.loading(
        "Subiendo imagenes",
        "Espera mientras se suben las imagenes, no actualices ni abandones la pagina",
      );

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
      await alerts.success(
        "¡Entregado!",
        "La tarea se ha entregado de manera exitosa",
      );

      navigate(-1);
      return res.data;
    } catch (error) {
      Swal.close();

      // Extraer mensaje del backend si existe
      const message =
        error.response?.data?.message ||
        "Ocurrió un error al enviar el entregable.";

      await alerts.error("Upps, hubo un problema", message);

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
    alerts.loading(
      "Preparando certificado",
      "Por favor espera unos segundos mientras se personaliza tu certificado!",
    );

    try {
      // Enviamos el nombre validado al backend
      const url = `/certifications/download-certificate?certificationId=${id}&nameCertification=${encodeURIComponent(nombreCertificado)}`;

      const res = await clienteAxios.get(url, { responseType: "blob" });
      fileDownload(
        res.data,
        `Certificado-${nombreCertificado}-${Date.now()}.pdf`,
      );
      alerts.success(
        "¡Certificado Generado!",
        "Tu certificado se ha descargado correctamente!",
      );
    } catch (error) {
      console.error("Error al descargar:", error);
      alerts.error(
        "Upps! Hubo un problema!",
        "No se logro generar tu certificado, intenta de nuevo mas tarde o contacta a soporte!",
      );
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
    alerts.loading("Preparando diploma!", "Por favor espera unos segundos");

    try {
      // Usamos nombreDiploma que es el valor final validado
      const url = `/certifications/download-diploma?certificationId=${id}&nombreDiploma=${encodeURIComponent(nombreDiploma)}`;

      const res = await clienteAxios.get(url, { responseType: "blob" });

      fileDownload(res.data, `diploma-${nombreDiploma}-${Date.now()}.pdf`);
      alerts.success(
        "¡Diploma generado correctamente!",
        "Tu diploma ha sido descargado con éxito.",
      );
    } catch (error) {
      console.error("Ocurrió un error al descargar el diploma:", error);
      alerts.error(
        "Upps! Hubo un problema al generar el diploma!",
        "Ocurrió un problema al descargar el diploma. Intenta nuevamente más tarde o contacta a soporte!",
      );
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
