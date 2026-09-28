export const getBrowserName = () => {
  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("edg")) return "edge";
  if (ua.includes("chrome")) return "chrome";
  if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("opera") || ua.includes("opr")) return "opera";

  return "unknown";
};
