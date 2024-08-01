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
import GenresCreate from "./pages/Admin/pages/GenresCreate";
import GenresEdit from "./pages/Admin/pages/GenresEdit";
import TypeCreate from "./pages/Admin/pages/TypeCreate";
import TypeEdit from "./pages/Admin/pages/TypeEdit";
import AdsCreate from "./pages/Admin/pages/AdsCreate";
import AdsDetail from "./pages/Admin/pages/AdsDetail";
import AdsEdit from "./pages/Admin/pages/AdsEdit";
import Platform from "./pages/Admin/pages/Platform";
import PlatformCreate from "./pages/Admin/pages/PlatformCreate";
import PlatformEdit from "./pages/Admin/pages/PlatformEdit";
import GamesDetail from "./pages/Admin/pages/GamesDetail";
import GameEdit from "./pages/Admin/pages/GameEdit";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const location = useLocation();

  const noHeaderFooterPaths = [
    "/login",
    "/register",
    "/forgotpassword",
    "/account/*",
    "/account/email",
    "/account/security",
    "/admin",

    "/admin/games",
    "/admin/games/create",
    /^\/admin\/games\/detail\/[^\/]+$/,
    /^\/admin\/games\/edit\/[^\/]+$/,

    "/admin/genres",
    "/admin/genres/create",
    /^\/admin\/genres\/edit\/[^\/]+$/,

    "/admin/types",
    "/admin/types/create",
    /^\/admin\/types\/edit\/[^\/]+$/,

    "/admin/ads",
    "/admin/ads/create",
    /^\/admin\/ads\/detail\/[^\/]+$/,
    /^\/admin\/ads\/edit\/[^\/]+$/,

    "/admin/news",
    "/admin/news/create",
    /^\/admin\/news\/detail\/[^\/]+$/,
    /^\/admin\/news\/edit\/[^\/]+$/,

    "/admin/platforms",
    "/admin/platforms/create",
    /^\/admin\/platforms\/edit\/[^\/]+$/,
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
          <Route path="/forgotpassword" element={<ForgotPassword />} />
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
          <Route path="/admin/games/detail/:id" element={<GamesDetail />} />
          <Route path="/admin/games/edit/:id" element={<GameEdit />} />

          <Route path="/admin/genres" element={<Genres />} />
          <Route path="/admin/genres/create" element={<GenresCreate />} />
          <Route path="/admin/genres/edit/:id" element={<GenresEdit />} />

          <Route path="/admin/types" element={<Types />} />
          <Route path="/admin/types/create" element={<TypeCreate />} />
          <Route path="/admin/types/edit/:id" element={<TypeEdit />} />

          <Route path="/admin/ads" element={<Ads />} />
          <Route path="/admin/ads/create" element={<AdsCreate />} />
          <Route path="/admin/ads/detail/:id" element={<AdsDetail />} />
          <Route path="/admin/ads/edit/:id" element={<AdsEdit />} />

          <Route path="/admin/news" element={<NewsAdmin />} />
          <Route path="/admin/news/create" element={<NewsCreate />} />
          <Route path="/admin/news/detail/:id" element={<NewsAdminDetail />} />
          <Route path="/admin/news/edit/:id" element={<NewsEdit />} />

          <Route path="/admin/platforms" element={<Platform />} />
          <Route path="/admin/platforms/create" element={<PlatformCreate />} />
          <Route path="/admin/platforms/edit/:id" element={<PlatformEdit />} />
        </Routes>
      </main>

      <footer>{!shouldHideHeaderFooter && <Footer />}</footer>
    </>
  );
}

export default App;
