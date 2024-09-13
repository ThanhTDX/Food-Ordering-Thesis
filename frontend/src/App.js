import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Menu from './pages/Menu'
import MenuItem from "./pages/MenuItem";
import Ordering from "./pages/Ordering";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<MenuItem />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="ordering" element={<Ordering />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
