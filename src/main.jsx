import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./containers/Home/Home.jsx";
import Courses from "./containers/Courses/Courses.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Courses />
  </StrictMode>
);
