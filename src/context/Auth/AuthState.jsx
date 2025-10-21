import React, { useCallback, useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import headerConfig from "../../config/imageHeader";

/**Importar componente token headers */
import tokenAuth from "../../config/TokenAuth";

import { SHOW_ERRORS_API, types } from "../../types";
import Swal from "sweetalert2";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: false,
    isAuthenticating: true,
    usuario: null,
    role: null,
    success: false,
    directions: [],
    ErrorsApi: [],
    all_users: [],
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const usuarioAutenticado = async () => {
    // Inicia la carga
    dispatch({ type: types.INICIO_AUTENTICACION });

    const token = localStorage.getItem("token");

    if (!token) {
      // 1. No hay token. Se despacha el error.
      dispatch({ type: types.LOGIN_ERROR });
      // 2. El finally garantiza FIN_AUTENTICACION.
      return false;
    }

    tokenAuth(token);

    try {
      const { data } = await MethodGet("/auth/me");
      // 3. Éxito. Se despacha el usuario.
      dispatch({ type: types.OBTENER_USUARIO, payload: data.user });
      return true;
    } catch (error) {
      // 4. Fallo. Se despacha el error.
      dispatch({ type: types.LOGIN_ERROR });
      return false;
    } finally {
      // 5. ¡Garantía! Siempre se ejecuta, poniendo cargando: false.
      dispatch({ type: types.FIN_AUTENTICACION });
    }
  };
  //cuando el usuario inicia sesion
  const iniciarSesion = async (datos) => {
    let url = "/auth/login";
    try {
      const res = await MethodPost(url, datos);
      //Guardar token y datos del usuario
      localStorage.setItem("token", res.data.token);
      //Dispatch para actualizar el estado inmediatamente
      dispatch({
        type: types.LOGIN_EXITOSO,
        payload: res.data,
      });
      //Obtener y establecer usuario autenticado
      await usuarioAutenticado();
      Swal.fire({
        title: "!Exitoso¡",
        icon: "success",
        text: "Ha iniciado sesión correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return true; //Indicador de éxito
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        text: error.response.data.msg,
      });
      dispatch({
        type: SHOW_ERRORS_API,
      });
      return false; // Indicador de fallo
    }
  };

  const registerUser = (data) => {
    let url = "/auth/register";
    MethodPost(url, data)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        // Setea el token en Axios inmediatamente
        tokenAuth(token);

        dispatch({
          type: types.REGISTRO_EXITOSO,
          payload: res.data,
        });

        Swal.fire({
          title: "Registrado",
          text: res.data.msg,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // Aquí puedes redirigir o recargar usuario
        // Por ejemplo, para asegurarte que está autenticado:
        usuarioAutenticado();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.error || "Error al registrar",
          icon: "error",
          showConfirmButton: false,
        });
      });
  };

  const resetPassword = (data) => {
    let url = "/auth/reset-password";
    MethodPost(url, data)
      .then((res) => {
        Swal.fire({
          title: "Actualizada!",
          text: "La contraseña se ha restablecido correctamente!",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        }).then(function () {
          window.location = "/iniciar-sesion";
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Ocurrio un error al recuperar la contraseña, intenta más tarde!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };

  //cuando el usuario Ccambia de contraseña
  const ChangePasswordUser = (datos) => {
    let url = "/admin/auth/changePassword";
    MethodPost(url, datos)
      .then((res) => {
        Swal.fire({
          title: "Contraseña!",
          text: "Modificada Correctamente",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        dispatch({
          type: types.USER_CHANGEPASSWORD,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
        dispatch({
          type: SHOW_ERRORS_API,
        });
      });
  };

  //Cambiar la información del Perfil
  const UpdateUser = (data) => {
    const id_user = localStorage.getItem("user_id");
    let url = `updateClient/${id_user}`;
    // console.log("url", url);
    MethodPost(url, data)
      .then((res) => {
        // console.log("Actualizó", res.data.data);
        dispatch({
          type: UPDATE_USER,
          payload: res.data.data,
        });
        Swal.fire({
          icon: "success",
          title: "Actualizada",
          text: "La información de usuario se ha actualizado correctamente!",
          showConfirmButton: false,
          timer: 1700,
        }).then(() => {
          // 🔄 Recargar lista con status=2 después de aprobar
          usuarioAutenticado();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Atención",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Cambiar la foto de perfil
  // const UpdateProfileImage = (data) => {
  //   const id_user = localStorage.getItem("user_id");
  //   let url = `updateImageClient/${id_user}`;
  //   MethodPost(url, data)
  //     .then((res) => {
  //       // console.log("Actualizó", res.data.data);
  //       dispatch({
  //         type: UPDATE_IMAGE_USER,
  //         payload: res.data.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //Cambiar Imagen de Perfil
  const ChangePhoto = (datos) => {
    let url = "/admin/auth/update-profile-image";
    const formData = new FormData();
    formData.append("profileImage", datos.image);
    MethodPut(url, formData, { headerConfig })
      .then((res) => {
        Swal.fire({
          title: "Usuario!!",
          text: res.data.message,
          timer: 3000,
          showConfirmButton: false,
          icon: "success",
        });
        dispatch({
          type: types.USER_CHANGEPHOTO,
          payload: res.data,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: error.response.data.message,
        });
        dispatch({
          type: SHOW_ERRORS_API,
        });
      });
  };

  //Cierrra sesion del usuario
  const cerrarSesion = () => {
    localStorage.removeItem("user_id");
    dispatch({
      type: types.CERRAR_SESION,
    });
  };

  const eliminarCuenta = (id) => {
    Swal.fire({
      title: "Eliminar mi cuenta",
      allowOutsideClick: false,
      html: `
      <label>Ingresa el texto <b>Eliminar mi cuenta</b></label>
      <input type="text" id="delete" class="swal2-input" placeholder="Eliminar mi cuenta">`,
      confirmButtonText: "Confirmar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        var delete_account = Swal.getPopup().querySelector("#delete").value;
        if (!delete_account) {
          Swal.showValidationMessage(
            `Por favor ingresa ingresa el texto para confirmar`
          );
        } else if (delete_account !== "Eliminar mi cuenta") {
          Swal.showValidationMessage(
            `El texto ingresado debe ser igual a Eliminar mi cuenta`
          );
        }
        return { delete_account: delete_account };
      },
    }).then((result) => {
      if (result.value) {
        // console.log(result.value);
        // delete_account = result.value.delete_account;
        let url = `/cliente/eliminar/${id}`;
        const formData = new FormData();
        formData.append("argument", result.value.delete_account);
        MethodPost(url, formData)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: `Eliminado `,
              text: "Su cuenta se ha borrado correctamente!",
              timer: 1500,
              showConfirmButton: false,
            });
            cerrarSesion();
            // dispatch({
            //   type: INCREASE_STOCK_PRODUCT,
            //   payload: res.data,
            // });
          })
          .catch((error) => {
            Swal.fire({
              Title: "Error",
              icon: "error",
              text: error.response.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
          });
      }
    });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        isAuthenticating: state.isAuthenticating,
        usuario: state.usuario,
        success: state.success,
        directions: state.directions,
        ErrorsApi: state.ErrorsApi,
        all_users: state.all_users,
        cargando: state.cargando,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
        registerUser,
        ChangePasswordUser,
        ChangePhoto,
        resetPassword,
        eliminarCuenta,
        UpdateUser,
        // GetUser,
        // UpdateProfileImage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
