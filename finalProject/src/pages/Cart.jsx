import React, { useEffect, useState } from "react";
import "../assets/scss/Cart.scss";
import navigateWallet from "../assets/icons/navigate.svg";
import { Link, useNavigate } from "react-router-dom";
import wishlistgame from "../assets/images/wishlistgame.avif";
import PersonIcon from "@mui/icons-material/Person";
import icon from "../assets/icons/icon.svg";
import notFoundIcon from "../assets/icons/notfoundicon.svg";

import xicon from "../assets/icons/closeIcon.svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Cart() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Cart";
  }, []);
  const [decodedToken, setDecodedToken] = useState(null);
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState(0);
  const [id, setId] = useState("");
  const [cart, setCart] = useState({});

  const baseURL = "https://localhost:44300/assets/images/";

  const fetchCart = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `https://localhost:44300/api/Basket/GetUserBasket?userId=${id}`
        );
        setCart(response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedToken = localStorage.getItem("user-info");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        const decoded = jwtDecode(parsedToken);
        setToken(parsedToken);
        setDecodedToken(decoded);
        setId(decoded.sid);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        `https://localhost:44300/api/Wallet/GetBalance?userId=${decodedToken.sid}`
      );
      setBalance(res.data.balance);
    } catch (error) {
      console.error("Error fetching the balance", error);
    }
  };

  useEffect(() => {
    if (decodedToken) {
      fetchBalance();
      fetchCart();
    }
  }, [decodedToken]);

  const [isPaymentAreaVisible, setIsPaymentAreaVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);

  const handleCheckoutClick = () => {
    setIsPaymentAreaVisible(true);
  };

  const handleTriggerClick = () => {
    setIsActive(!isActive);
    setIsPaymentMethodSelected(!isActive);
  };

  const handleCloseClick = () => {
    setIsPaymentAreaVisible(false);
    setIsActive(false);
    setIsPaymentMethodSelected(false);
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Basket/RemoveFromBasket?userId=${id}&productId=${productId}`
      );
      const updatedBasket = cart.userBasket.filter(
        (item) => item.product.id !== productId
      );

      const updatedTotal = updatedBasket.reduce(
        (total, item) => total + item.product.productPrice,
        0
      );

      setCart({
        ...cart,
        userBasket: updatedBasket,
        basketTotal: updatedTotal,
      });
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `https://localhost:44300/api/Wishlist/AddWishlist?userId=${id}&productId=${productId}`
      );
      removeFromCart(productId);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const buyProducts = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Basket/BuyProducts`,
        {
          data: {
            userId: id,
            totalPrice: cart.basketTotal,
          },
        }
      );
    } catch (error) {
      console.error("Error processing the purchase:", error);
    }
  };

  return (
    <>
      <section id="cart-title">
        <div className="container-main">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="title-text">
                <h2>My Cart</h2>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="wallet-balance">
                <Link to="/account/payment">
                  <span className="wallet-title">
                    Epic Wallet <img src={navigateWallet} alt="" />
                  </span>
                  <span className="wallet-counter">${balance.toFixed(2)}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cart-area">
        <div className="container-main">
          <div className="row">
            {cart.userBasket?.length != 0 ? (
              <>
                {" "}
                <div className="col-12 col-lg-7 col-xl-9">
                  {cart.userBasket?.map((item, index) => {
                    const mainImage = item.product?.productImages.filter(
                      (image) => image.isMain
                    )[0];
                    return (
                      <div className="wishlisted-game mb-3" key={index}>
                        <div className="top">
                          <div className="game-image">
                            <Link to={`/p/${item.product.id}`}>
                              <img
                                src={`${baseURL}${
                                  mainImage ? mainImage.imageName : ""
                                }`}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="about-game">
                            <div className="game">
                              <div className="type">
                                <span>Base game</span>
                              </div>
                              <div className="name">
                                <Link>{item.product.productName}</Link>
                              </div>
                            </div>
                            <div className="price">
                              <span>${item.product.productPrice}</span>
                            </div>
                          </div>
                        </div>

                        <div className="operations">
                          <div className="remove-bttn">
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="add-wishlist-bttn">
                            <button
                              onClick={() => addToWishlist(item.product.id)}
                            >
                              MOVE TO WISHLIST
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-12 col-lg-5 col-xl-3">
                  <div className="checkout-area">
                    <div className="checkout-title">
                      <span>Games and Apps Summary</span>
                    </div>
                    <div className="summary-price">
                      <span className="tag">Price</span>
                      <span className="price">${cart.basketTotal}</span>
                    </div>
                    <div className="summary-subtotal">
                      <div className="tag">Subtotal</div>
                      <div className="total">${cart.basketTotal}</div>
                    </div>
                    <div className="checkout-button">
                      <button onClick={handleCheckoutClick}>Check Out</button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <section id="not-found-area">
                <div className="row">
                  <div className="col-12">
                    <div className="not-found">
                      <div className="icon">
                        <img src={notFoundIcon} alt="" />
                      </div>
                      <div className="title">
                        <h1>Your cart is empty.</h1>
                      </div>
                      <div className="back-to-store">
                        <Link to="/">Shop for Games & Apps</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      {isPaymentAreaVisible && (
        <section id="payment-area">
          <div className="payment-container">
            <div className="payment-area">
              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="payment-content">
                    <div className="payment-title">
                      <h1>Checkout</h1>
                      <span>
                        <PersonIcon /> {decodedToken.sub}
                      </span>
                    </div>
                    <div className="payment-methods">
                      <div className="method-title">
                        <h2>Wallet balance</h2>
                      </div>
                      <div
                        className={`payment-method ${
                          isActive ? "payment-method-active" : ""
                        }`}
                      >
                        <div
                          className="payment-method-trigger"
                          onClick={handleTriggerClick}
                        >
                          <div className="content">
                            <div
                              className={`payment-radio ${
                                isActive ? "payment-radio-clicked" : ""
                              }`}
                            ></div>
                            <div className="payment-icon">
                              <img src={icon} alt="Payment Icon" />
                            </div>
                            <div className="payment-method-name">
                              Wallet{" "}
                              <span className="wallet-balance">
                                ${balance.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <div className="payment-wallet-form">
                            <span>
                              Your online wallet can store funds and be used to
                              make Epic Games purchases. An Epic Games Wallet
                              can be funded using a registered payment method.
                            </span>
                            <Link to="/account/payment">
                              <button>Add funds to wallet</button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12  col-md-4">
                  <div className="payment-summaries">
                    <div className="summaries-content">
                      <div className="summary-title">
                        <h2>Order summary</h2>
                        <button onClick={handleCloseClick}>
                          <img src={xicon} alt="" />
                        </button>
                      </div>{" "}
                      {cart.userBasket?.map((item, index) => {
                        const mainImage = item.product?.productImages.filter(
                          (image) => image.isMain
                        )[0];
                        return (
                          <div className="payment-games" key={index}>
                            <div className="payment-item">
                              <div className="payment-thumbnail">
                                <img
                                  src={`${baseURL}${
                                    mainImage ? mainImage.imageName : ""
                                  }`}
                                  alt=""
                                />
                              </div>
                              <div className="payment-content">
                                <span className="game-name">
                                  {item.product.productName}
                                </span>
                                <span className="price">
                                  ${item.product.productPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="payment-summary">
                        <div className="summary-price">
                          <span className="tag">Price</span>
                          <span className="price">${cart.basketTotal}</span>
                        </div>
                        <div className="summary-subtotal">
                          <div className="tag">Subtotal</div>
                          <div className="total">${cart.basketTotal}</div>
                        </div>
                      </div>
                    </div>
                    <div className="place-order">
                      <button
                        disabled={!isPaymentMethodSelected}
                        onClick={() => buyProducts()}
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Cart;
