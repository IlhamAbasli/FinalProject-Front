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
import AdsEdit from "./pages/Admin/pages/AdsEdit";
import Platform from "./pages/Admin/pages/Platform";
import PlatformCreate from "./pages/Admin/pages/PlatformCreate";
import PlatformEdit from "./pages/Admin/pages/PlatformEdit";
import GamesDetail from "./pages/Admin/pages/GamesDetail";
import GameEdit from "./pages/Admin/pages/GameEdit";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentManagement from "./pages/PaymentManagement";
import NotFound from "./pages/NotFound";
import EmailConfirmation from "./pages/EmailConfirmation";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRouteForEmailConfirm from "./components/ProtectedRouteForEmailConfirm";

function App() {
  const location = useLocation();
  var token = JSON.parse(localStorage.getItem("user-info"));
  const noHeaderFooterPaths = [
    "/login",
    "/register",
    "/emailconfirmation",
    "/forgotpassword",
    "/resetpassword",
    "/account/*",
    "/account/email",
    "/account/security",
    "/account/payment",
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
          <Route path="/shop" element={<Shop />} />
          <Route path="/p/:id" element={<ProductDetail />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/resetpassword"
            element={
              <ProtectedRouteForEmailConfirm>
                <ResetPassword />
              </ProtectedRouteForEmailConfirm>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/*"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/email"
            element={
              <ProtectedRoute>
                <EmailPreferences />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/security"
            element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/payment"
            element={
              <ProtectedRoute>
                <PaymentManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/redeem"
            element={
              <ProtectedRoute>
                <RedeemCode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emailconfirmation"
            element={
              <ProtectedRouteForEmailConfirm>
                <EmailConfirmation />
              </ProtectedRouteForEmailConfirm>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <Admin />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/games"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <Games />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/games/create"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <GamesCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/games/detail/:id"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <GamesDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/games/edit/:id"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <GameEdit />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/genres"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <Genres />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/genres/create"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <GenresCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/genres/edit/:id"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <GenresEdit />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/types"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <Types />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/types/create"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <TypeCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/types/edit/:id"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <TypeEdit />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/ads"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <Ads />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/ads/create"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <AdsCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/ads/edit/:id"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <AdsEdit />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/news"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <NewsAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/news/create"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <NewsCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/news/detail/:id"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <NewsAdminDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/news/edit/:id"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <NewsEdit />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/platforms"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <Platform />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/platforms/create"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <PlatformCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/platforms/edit/:id"
            element={
              <PrivateRoute roles={["SuperAdmin", "Admin"]}>
                <PlatformEdit />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>

      <footer>{!shouldHideHeaderFooter && <Footer />}</footer>
    </>
  );
}

export default App;
