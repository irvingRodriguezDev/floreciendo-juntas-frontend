import "./App.css";
import AuthState from "./context/Auth/AuthState";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <AuthState>
      <AppRouter />
    </AuthState>
  );
}

export default App;
