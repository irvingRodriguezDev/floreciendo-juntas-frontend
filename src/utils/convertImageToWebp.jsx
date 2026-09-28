/**
 * Convierte y comprime cualquier imagen (JPG, PNG, WEBP, etc.) a WebP optimizado.
 * Redimensiona automáticamente si sobrepasa la resolución máxima indicada.
 */
export const convertImageToWebp = (file, options = {}) => {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.82 } = options;

  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      return reject(
        new Error("El archivo proporcionado no es una imagen válida."),
      );
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        let { width, height } = img;

        // Escalar proporcionalmente si sobrepasa los límites de dimensión
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(
                new Error("Error durante la generación del blob WebP."),
              );
            }

            const cleanFileName = file.name
              .substring(0, file.name.lastIndexOf("."))
              .replace(/[^a-zA-Z0-9_-]/g, "_");

            const webpFile = new File([blob], `${cleanFileName}.webp`, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve(webpFile);
          },
          "image/webp",
          quality,
        );
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};
