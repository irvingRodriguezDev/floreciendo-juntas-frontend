// import "./App.css";
import AuthState from "./context/Auth/AuthState";
import CoursesState from "./context/Courses/CoursesState";
import SystemState from "./context/System/SystemState";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <AuthState>
      <SystemState>
        <CoursesState>
          <AppRouter />
        </CoursesState>
      </SystemState>
    </AuthState>
  );
}

export default App;
