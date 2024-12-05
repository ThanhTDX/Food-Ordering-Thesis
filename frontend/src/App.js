import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import MenuPage from "./pages/MenuPage";
import OrderingPage from "./pages/OrderingPage";
import MenuItemDetailsPage from "./pages/MenuItemDetailsPage";
import MenuItemReviewPage from "./pages/MenuItemReviewPage";
import MenuComboDetailsPage from "./pages/MenuComboDetailsPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import UserOrderingPage from "./pages/UserOrderingPage";
import UserReservationPage from "./pages/UserReservationPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="menu/" element={<MenuPage />} />
            <Route path="menu/item/:id" element={<MenuItemDetailsPage />} />
            <Route
              path="menu/item/:id/review"
              element={<MenuItemReviewPage />}
            />
            <Route path="menu/combo/:id" element={<MenuComboDetailsPage />} />
            <Route path="reservation/" element={<ReservationPage />} />
            <Route path="order/" element={<OrderingPage />} />
            <Route path="user/profile/" element={<UserPage />} />
            <Route path="login/" element={<LoginPage />} />
            <Route
              path="users/reservation/"
              element={<UserReservationPage />}
            />
            <Route path="users/ordering/" element={<UserOrderingPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
