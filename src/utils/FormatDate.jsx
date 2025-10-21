// utils/FormatDate.js
const FormatDate = (dateString) => {
  if (!dateString) return "Fecha no disponible";

  const date = new Date(dateString);

  // Formato: 21 de Octubre de 2025
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formatted = date.toLocaleDateString("es-MX", options);

  // Capitaliza la primera letra del mes
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export default FormatDate;
