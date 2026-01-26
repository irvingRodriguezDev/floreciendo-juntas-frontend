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
import ShopifyCartState from "./context/ShopifyCart/ShopifyCartState";
import ScrollTop from "./utils/ScrollTop";
import CommunityState from "./context/Community/CommunityState";
import { useNotificationHandler } from "./hooks/useNotificationHandler";
import NotificationsState from "./context/Notifications/NotificationsState";
// Carga asíncrona de la clave pública
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  useNotificationHandler();
  return (
    <Elements stripe={stripePromise}>
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
                              <ShopifyCartState>
                                <ScrollTop />
                                <AppRouter />
                              </ShopifyCartState>
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
    </Elements>
  );
}

export default App;
