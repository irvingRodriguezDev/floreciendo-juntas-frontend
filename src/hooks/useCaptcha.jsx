// frontend/src/hooks/useCaptcha.js
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback } from "react";

export const useCaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getCaptchaToken = useCallback(
    async (actionName) => {
      if (!executeRecaptcha) {
        console.warn("reCAPTCHA no se ha cargado aún");
        return null;
      }
      // Genera el token para una acción específica (ej: 'login', 'comentario')
      return await executeRecaptcha(actionName);
    },
    [executeRecaptcha],
  );

  return { getCaptchaToken };
};
