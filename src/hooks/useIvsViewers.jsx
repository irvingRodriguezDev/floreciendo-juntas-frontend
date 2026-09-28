import { useState, useEffect } from "react";
import axios from "axios";

// Reemplaza esto con la URL que te genere AWS API Gateway al conectar tu Lambda
const AWS_API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;

export const useIvsViewers = (liveId, awsChannelArn) => {
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    if (!liveId || !awsChannelArn) return;

    // Función que va a AWS a traer el dato exacto de IVS
    const fetchRealIvsViewers = async () => {
      try {
        const response = await axios.get(AWS_API_GATEWAY_URL, {
          params: {
            liveId: liveId,
            channelArn: awsChannelArn,
          },
        });

        if (response.data && typeof response.data.viewers !== "undefined") {
          setViewers(response.data.viewers);
        }
      } catch (error) {
        console.error("Error cargando los viewers desde AWS Lambda:", error);
      }
    };

    // 1. Ejecutar inmediatamente al montar el componente para evitar el "0"
    fetchRealIvsViewers();

    // 2. Crear el ciclo para actualizar cada 30 segundos (igual que Instagram)
    const interval = setInterval(fetchRealIvsViewers, 30000);

    // Limpieza al salir de la pantalla
    return () => clearInterval(interval);
  }, [liveId, awsChannelArn]);

  return viewers;
};
