import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import MenuPage from './pages/MenuPage'
import Ordering from "./pages/Ordering";
import MenuDetails from "./pages/MenuDetails";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} exact/>
            <Route path="menu/" element={<MenuPage />} />
            <Route path="menu/:id" element={<MenuDetails />} />
            <Route path="reservation/" element={<Reservation />} />
            <Route path="order/" element={<Ordering />} />
            <Route path="users/" element={<UserPage />} />
            <Route path="login/" element={<LoginPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
