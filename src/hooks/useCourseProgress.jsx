import { useState, useEffect, useRef, useCallback } from "react";
import MethodGet, { MethodPost } from "../config/Service";

export const useCourseProgress = ({
  userId,
  courseId,
  allVideos,
  activeVideo,
}) => {
  const [progress, setProgress] = useState(0);
  const [certificateEnabled, setCertificateEnabled] = useState(false);
  const alreadySentRef = useRef(false);

  const COURSE_KEY = `course-progress-${userId}-${courseId}`;
  const activeVideoKey = activeVideo?.id || activeVideo?.cloudfrontUrl;

  const clearLocalProgress = useCallback(() => {
    try {
      localStorage.removeItem(COURSE_KEY);
    } catch (e) {
      console.error("Error al limpiar progreso local:", e);
    }
  }, [COURSE_KEY]);

  const saveVideoProgress = useCallback(
    (seconds, currentPercent) => {
      if (!activeVideoKey) return;
      try {
        const data = JSON.parse(localStorage.getItem(COURSE_KEY) || "{}");
        const existing = data[activeVideoKey] || { seconds: 0, percent: 0 };
        const newPercent = Math.max(currentPercent, existing.percent);
        const newSeconds = Math.max(seconds, existing.seconds);

        if (newPercent > existing.percent || newSeconds > existing.seconds) {
          data[activeVideoKey] = { seconds: newSeconds, percent: newPercent };
          localStorage.setItem(COURSE_KEY, JSON.stringify(data));
        }
      } catch (e) {
        console.error("Error al actualizar local storage:", e);
      }
    },
    [COURSE_KEY, activeVideoKey],
  );

  const getGlobalProgress = useCallback(() => {
    if (!allVideos || allVideos.length === 0)
      return { globalPercent: 0, totalSeconds: 0 };
    let data = {};
    try {
      data = JSON.parse(localStorage.getItem(COURSE_KEY) || "{}");
    } catch (e) {
      console.error("Error leyendo local storage:", e);
    }

    let totalPercent = 0;
    let totalSeconds = 0;

    allVideos.forEach((v) => {
      const key = v.id || v.cloudfrontUrl;
      if (key && data[key]) {
        totalPercent += data[key].percent || 0;
        totalSeconds += data[key].seconds || 0;
      }
    });

    const rawAverage = totalPercent / allVideos.length;
    return {
      globalPercent: Math.min(100, Math.round(rawAverage)),
      totalSeconds: Math.floor(totalSeconds),
    };
  }, [COURSE_KEY, allVideos]);

  const updateBackendProgress = useCallback(
    async (totalSeconds, currentPercent, certEnabled) => {
      try {
        await MethodPost(`/progress-video/${userId}/${courseId}`, {
          secondsWatched: Math.floor(totalSeconds),
          percent: currentPercent,
          certificate_enabled: certEnabled,
        });
        return true;
      } catch (error) {
        console.error("Error enviando progreso al servidor:", error);
        return false;
      }
    },
    [userId, courseId],
  );

  const unlockCertificate = useCallback(
    async (totalSeconds, globalPercent) => {
      if (alreadySentRef.current) return;
      alreadySentRef.current = true;

      const success = await updateBackendProgress(
        totalSeconds,
        globalPercent,
        true,
      );
      if (success) {
        setCertificateEnabled(true);
        clearLocalProgress();
      } else {
        alreadySentRef.current = false;
      }
    },
    [updateBackendProgress, clearLocalProgress],
  );

  const syncCurrentProgress = useCallback(
    (videoElement, isEnded = false) => {
      if (!videoElement || !videoElement.duration) return;

      const currentPercent = isEnded
        ? 100
        : Math.round((videoElement.currentTime / videoElement.duration) * 100);
      saveVideoProgress(videoElement.currentTime, currentPercent);

      const { globalPercent, totalSeconds } = getGlobalProgress();
      setProgress((prev) => Math.max(prev, globalPercent));

      if (globalPercent >= 80 && !alreadySentRef.current) {
        unlockCertificate(totalSeconds, globalPercent);
      } else {
        updateBackendProgress(totalSeconds, globalPercent, false);
      }
    },
    [
      saveVideoProgress,
      getGlobalProgress,
      unlockCertificate,
      updateBackendProgress,
    ],
  );

  // Carga inicial de estado desde API
  useEffect(() => {
    let isMounted = true;
    const fetchProgress = async () => {
      try {
        const { data } = await MethodGet(
          `/progress-video/${userId}/${courseId}`,
        );
        if (!isMounted) return;

        if (data?.certificate_enabled) {
          setCertificateEnabled(true);
          setProgress(100);
          alreadySentRef.current = true;
          clearLocalProgress();
        } else {
          setCertificateEnabled(false);
          const bdPercent = data?.percent || 0;
          const localPercent = getGlobalProgress().globalPercent;
          setProgress(Math.max(bdPercent, localPercent));
        }
      } catch (error) {
        if (!isMounted) return;
        setProgress(getGlobalProgress().globalPercent);
      }
    };

    if (userId && courseId) fetchProgress();
    return () => {
      isMounted = false;
    };
  }, [userId, courseId, getGlobalProgress, clearLocalProgress]);

  // Intervalo activo de actualización en reproducción (5s Local / 15s Backend)
  const handleTick = useCallback(
    (videoElement) => {
      if (
        !videoElement ||
        videoElement.paused ||
        !videoElement.duration ||
        certificateEnabled
      )
        return;

      const videoPercent = Math.round(
        (videoElement.currentTime / videoElement.duration) * 100,
      );
      window.dispatchEvent(new Event("progressUpdated"));
      saveVideoProgress(videoElement.currentTime, videoPercent);

      const { globalPercent, totalSeconds } = getGlobalProgress();
      setProgress((prev) => Math.max(prev, globalPercent));

      if (globalPercent >= 80 && !alreadySentRef.current) {
        unlockCertificate(totalSeconds, globalPercent);
      }
    },
    [
      certificateEnabled,
      saveVideoProgress,
      getGlobalProgress,
      unlockCertificate,
    ],
  );

  return {
    progress,
    certificateEnabled,
    syncCurrentProgress,
    handleTick,
    updateBackendProgress,
    getGlobalProgress,
  };
};
