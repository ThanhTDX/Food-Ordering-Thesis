import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Menu from './pages/Menu'
import Ordering from "./pages/Ordering";
import MenuDetails from "./pages/MenuDetails";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<MenuDetails />} />
            <Route path="reservation/" element={<Reservation />} />
            <Route path="ordering" element={<Ordering />} />
            <Route path="users" element={<UserPage />}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
