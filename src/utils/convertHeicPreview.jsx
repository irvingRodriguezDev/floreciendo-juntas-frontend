// utils/convertHeicPreview.js
export const getImagePreview = async (file) => {
  const heicTypes = ["image/heic", "image/heif"];
  const isHeic =
    heicTypes.includes(file.type.toLowerCase()) ||
    /\.(heic|heif)$/i.test(file.name);

  if (!isHeic) return URL.createObjectURL(file);

  // Conversión client-side solo para el preview
  const heic2any = (await import("heic2any")).default;
  const convertedBlob = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.8,
  });

  return URL.createObjectURL(convertedBlob);
};
