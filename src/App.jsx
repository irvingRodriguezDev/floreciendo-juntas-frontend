// import "./App.css";
import AuthState from "./context/Auth/AuthState";
import CoursesState from "./context/Courses/CoursesState";
import SystemState from "./context/System/SystemState";
import AppRouter from "./routes/AppRouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PostsState from "./context/Posts/PostsState";
import UserState from "./context/User/UserState";
import EventsState from "./context/Events/EventsState";
import ProductsState from "./context/Products/ProductsState";
import CartState from "./context/Cart/CartState";
import OrdersState from "./context/Orders/OrdersState";
import LivesState from "./context/Lives/LivesState";
import ScrollTop from "./utils/ScrollTop";
import CommunityState from "./context/Community/CommunityState";
import { useNotificationHandler } from "./hooks/useNotificationHandler";
import NotificationsState from "./context/Notifications/NotificationsState";
import CertificationsState from "./context/Certifications/CertificationsState";
import StoresState from "./context/Stores/StoresState";
import ChatState from "./context/Chat/ChatState";
import { GoogleMapsProvider } from "./context/GoogleMaps/GoogleMapsProvider";
// Carga asíncrona de la clave pública
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  useNotificationHandler();
  return (
    <Elements stripe={stripePromise}>
      <GoogleMapsProvider>
        <AuthState>
          <NotificationsState>
            <CommunityState>
              <UserState>
                <SystemState>
                  <CoursesState>
                    <PostsState>
                      <EventsState>
                        <ProductsState>
                          <CartState>
                            <OrdersState>
                              <LivesState>
                                <CertificationsState>
                                  <StoresState>
                                    <ChatState>
                                      <ScrollTop />
                                      <AppRouter />
                                    </ChatState>
                                  </StoresState>
                                </CertificationsState>
                              </LivesState>
                            </OrdersState>
                          </CartState>
                        </ProductsState>
                      </EventsState>
                    </PostsState>
                  </CoursesState>
                </SystemState>
              </UserState>
            </CommunityState>
          </NotificationsState>
        </AuthState>
      </GoogleMapsProvider>
    </Elements>
  );
}

export default App;
