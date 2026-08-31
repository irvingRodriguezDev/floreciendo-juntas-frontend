import React, { useCallback, useReducer } from "react";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import CoursesReducer from "./CoursesReducer";
import CoursesContext from "./CoursesContext";
import fileDownload from "js-file-download";
import {
  GET_ALL_COURSES,
  GET_ALL_COURSES_PAGINATE,
  GET_COURSE_BY_ID,
  GET_COURSES_BY_SYSTEM_ID,
  GET_LATEST_COURSES,
  GET_TOP_TEN_COURSES,
} from "../../types";
import clienteAxios from "../../config/Axios";
import Swal from "sweetalert2";
/**Importar componente token headers */

const CoursesState = ({ children }) => {
  const initialState = {
    courses: [],
    course: {},
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    topCourses: [],
  };

  const [state, dispatch] = useReducer(CoursesReducer, initialState);

  const getAllCourses = () => {
    let url = "/courses";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_COURSES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al consultar los cursos");
      });
  };

  const getAllCoursesPaginate = (page, limit, search = "") => {
    let url = `/courses/paginate?page=${page}&limit=${limit}`;

    // Solo agregamos el parámetro si hay búsqueda
    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`;
    }

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_COURSES_PAGINATE,
          payload: {
            courses: res.data.courses,
            totalItems: res.data.totalItems,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          },
        });
      })
      .catch((error) => {
        console.error("Ocurrió un error al obtener los cursos:", error);
      });
  };
  const getLastestCourses = (usuario, autenticado) => {
    let url = autenticado
      ? `/courses/lastAdded?userId=${usuario.id}`
      : "/courses/lastAdded";

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_LATEST_COURSES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener los ultimos cursos");
      });
  };
  const getCourseById = (slug) => {
    let url = `/courses/${slug}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_COURSE_BY_ID,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "Ocurrio un error al obtener el curso");
      });
  };
  //obtener los cursos por sistema
  const getCoursesBySystemId = (id, page, limit, search = "") => {
    let url = `/courses/bySystem?system_id=${id}&page=${page}&limit=${limit}`;
    // Solo agregamos el parámetro si hay búsqueda
    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`;
    }
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_COURSES_BY_SYSTEM_ID,
          payload: {
            courses: res.data.courses,
            totalItems: res.data.totalItems,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          },
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener los cursos");
      });
  };

  const getTopTenCourses = (usuario, autenticado) => {
    let url = autenticado
      ? `/courses/top-viewed-courses?userId=${usuario.id}`
      : "/courses/top-viewed-courses";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_TOP_TEN_COURSES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadCertificate = async (courseId, userName) => {
    // ========================================================
    // 🎨 SWEETALERT DE PERSONALIZACIÓN Y VALIDACIÓN
    // ========================================================
    const { value: nombreCertificado, isConfirmed } = await Swal.fire({
      title: "Personaliza tu Reconocimiento",
      text: "Ingresa el nombre que aparecerá (máximo 25 caracteres):",
      input: "text",
      inputValue: userName.substring(0, 25), // Pre-cargamos el nombre limitado
      inputPlaceholder: "Nombre y Apellido",
      showCancelButton: true,
      confirmButtonText: "Descargar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6", // Puedes cambiar el color al que use tu app
      inputAttributes: {
        maxlength: 25,
        autocomplete: "off",
        autocapitalize: "words",
      },
      // Contador de caracteres dinámico en el footer
      footer: '<b id="char-count">25</b> caracteres restantes',
      didOpen: () => {
        const input = Swal.getInput();
        const footer = document.getElementById("char-count");

        // Inicializar el contador con el valor pre-cargado
        if (input && footer) {
          footer.innerText = 25 - input.value.length;

          // Actualizar contador en tiempo real al escribir
          input.addEventListener("input", () => {
            const remaining = 25 - input.value.length;
            footer.innerText = remaining;
          });
        }
      },
      // Validación estricta antes de permitir el envío
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return "El nombre es obligatorio";
        }
        // Regex para permitir solo letras, espacios y caracteres con acentos/ñ
        const soloLetras = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!soloLetras.test(value)) {
          return "Solo se permiten letras y espacios";
        }
      },
    });

    // Si el usuario cancela o cierra la alerta, detenemos la ejecución
    if (!isConfirmed || !nombreCertificado) return;

    // ========================================================
    // ⏳ PROCESO DE DESCARGA (SPINNER)
    // ========================================================
    Swal.fire({
      title: "Generando reconocimiento...",
      text: "Por favor espera un momento.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Enviamos el "nombreCertificado" ya validado y sanitizado al backend mediante los query params
      const url = `/courses/download-certificate?courseId=${courseId}&userName=${encodeURIComponent(nombreCertificado.trim())}`;

      const res = await clienteAxios.get(url, { responseType: "blob" });
      const nombreLimpio = nombreCertificado
        .trim()
        .normalize("NFD") // Descompone caracteres con acentos (ej. "Á" -> "A")
        .replace(/[\u0300-\u036f]/g, "") // Remueve los acentos
        .replace(/[^a-zA-Z0-9_-]/g, "_") // Reemplaza espacios y caracteres especiales por "_"
        .replace(/_+/g, "_");
      // Nombramos el archivo dinámicamente con el nombre que el usuario eligió
      const fileName = `Certificado-${nombreLimpio}-${Date.now()}.pdf`;
      fileDownload(res.data, fileName);

      // Mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "¡Reconocimiento generado correctamente!",
        text: "Tu reconocimiento ha sido descargado con éxito.",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Ocurrió un error al descargar el reconocimiento:", error);

      Swal.fire({
        icon: "error",
        title: "Error al generar el reconocimiento",
        text: "Ocurrió un problema al descargar el reconocimiento. Intenta nuevamente.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <CoursesContext.Provider
      value={{
        courses: state.courses,
        totalItems: state.totalItems,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        course: state.course,
        topCourses: state.topCourses,
        getAllCourses,
        getAllCoursesPaginate,
        getLastestCourses,
        getCourseById,
        getCoursesBySystemId,
        getTopTenCourses,
        downloadCertificate,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesState;
