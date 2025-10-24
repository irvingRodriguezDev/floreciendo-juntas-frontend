// import "./App.css";
import AuthState from "./context/Auth/AuthState";
import CoursesState from "./context/Courses/CoursesState";
import SystemState from "./context/System/SystemState";
import AppRouter from "./routes/AppRouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PostsState from "./context/Posts/PostsState";
import UserState from "./context/User/UserState";

// Carga asíncrona de la clave pública
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <AuthState>
        <UserState>
          <SystemState>
            <CoursesState>
              <PostsState>
                <AppRouter />
              </PostsState>
            </CoursesState>
          </SystemState>
        </UserState>
      </AuthState>
    </Elements>
  );
}

export default App;
