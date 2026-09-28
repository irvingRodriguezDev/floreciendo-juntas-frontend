export function goBack(navigate) {
  const lastPath = localStorage.getItem("lastPath");

  if (lastPath) {
    navigate(lastPath);
  } else {
    navigate("/"); // fallback
  }
}
