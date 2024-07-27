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
import EmailPreferences from "./pages/EmailPreferences";
import Security from "./pages/Security";
import NewsCreate from "./pages/Admin/pages/NewsCreate";
import NewsAdminDetail from "./pages/Admin/pages/NewsAdminDetail";
import NewsEdit from "./pages/Admin/pages/NewsEdit";

function App() {
  const location = useLocation();

  const noHeaderFooterPaths = [
    "/login",
    "/register",
    "/account/*",
    "/account/email",
    "/account/security",
    "/admin",
    "/admin/games",
    "/admin/genres",
    "/admin/types",
    "/admin/ads",
    "/admin/news",
    "/admin/games/create",
    "/admin/news/create",
    /^\/admin\/news\/detail\/[^\/]+$/,
    /^\/admin\/news\/edit\/[^\/]+$/,
  ];

  const shouldHideHeaderFooter = noHeaderFooterPaths.some((path) =>
    typeof path === "string"
      ? location.pathname === path
      : path instanceof RegExp
      ? path.test(location.pathname)
      : false
  );

  return (
    <>
      <header>{!shouldHideHeaderFooter && <Header />}</header>
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
          <Route path="/account/*" element={<Account />} />
          <Route path="/account/email" element={<EmailPreferences />} />
          <Route path="/account/security" element={<Security />} />
          <Route path="/p/:id" element={<ProductDetail />} />
          <Route path="/redeem" element={<RedeemCode />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/games" element={<Games />} />
          <Route path="/admin/games/create" element={<GamesCreate />} />
          <Route path="/admin/genres" element={<Genres />} />
          <Route path="/admin/types" element={<Types />} />
          <Route path="/admin/ads" element={<Ads />} />
          <Route path="/admin/news" element={<NewsAdmin />} />
          <Route path="/admin/news/create" element={<NewsCreate />} />
          <Route path="/admin/news/detail/:id" element={<NewsAdminDetail />} />
          <Route path="/admin/news/edit/:id" element={<NewsEdit />} />
        </Routes>
      </main>

      <footer>{!shouldHideHeaderFooter && <Footer />}</footer>
    </>
  );
}

export default App;
