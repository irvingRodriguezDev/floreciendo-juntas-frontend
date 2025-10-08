// import "./App.css";
import AuthState from "./context/Auth/AuthState";
import SystemState from "./context/System/SystemState";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <AuthState>
      <SystemState>
        <AppRouter />
      </SystemState>
    </AuthState>
  );
}

export default App;
