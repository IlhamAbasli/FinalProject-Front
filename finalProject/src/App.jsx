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
import ProductDetail from "./pages/ProductDetail";
import RedeemCode from "./pages/RedeemCode";
import Account from "./pages/Account";
import NewsDetail from "./pages/NewsDetail";
import Admin from "./pages/Admin/Admin";
import Games from "./pages/Admin/pages/Games";
import Genres from "./pages/Admin/pages/Genres";
import Types from "./pages/Admin/pages/Types";
import Ads from "./pages/Admin/pages/Ads";
import NewsAdmin from "./pages/Admin/pages/NewsAdmin";
import GamesCreate from "./pages/Admin/pages/GamesCreate";

function App() {
  const location = useLocation();
  const noHeaderFooterPaths = [
    "/login",
    "/register",
    "/account",
    "/admin",
    "/admin/games",
    "/admin/genres",
    "/admin/types",
    "/admin/ads",
    "/admin/news",
    "/admin/games/create",
  ];
  return (
    <>
      <header>
        {!noHeaderFooterPaths.includes(location.pathname) && <Header />}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/library" element={<Library />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/p/:id" element={<ProductDetail />} />
          <Route path="/redeem" element={<RedeemCode />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/games" element={<Games />} />
          <Route path="/admin/games/create" element={<GamesCreate />} />
          <Route path="/admin/genres" element={<Genres />} />
          <Route path="/admin/types" element={<Types />} />
          <Route path="/admin/ads" element={<Ads />} />
          <Route path="/admin/news" element={<NewsAdmin />} />
        </Routes>
      </main>

      <footer>
        {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
      </footer>
    </>
  );
}

export default App;
