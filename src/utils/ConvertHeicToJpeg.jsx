import heic2any from "heic2any";

export const convertHeicToJpeg = async (file) => {
  const convertedResult = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.9,
  });

  // Si devuelve un Array (ej. Live Photos), tomar el primer elemento
  const convertedBlob = Array.isArray(convertedResult)
    ? convertedResult[0]
    : convertedResult;

  return new File(
    [convertedBlob],
    file.name.replace(/\.(heic|heif)$/i, ".jpg"),
    {
      type: "image/jpeg",
    },
  );
};
