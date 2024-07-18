import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import News from "./pages/News";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Library from "./pages/Library";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

function App() {
  const location = useLocation();
  const noHeaderFooterPaths = ["/login", "/register"];
  return (
    <>
      <header>
        {!noHeaderFooterPaths.includes(location.pathname) && <Header />}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/library" element={<Library />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <footer>
        {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
      </footer>
    </>
  );
}

export default App;
