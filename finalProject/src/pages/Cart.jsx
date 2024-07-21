import React, { useEffect, useState } from "react";
import "../assets/scss/Cart.scss";
import navigate from "../assets/icons/navigate.svg";
import { Link } from "react-router-dom";
import wishlistgame from "../assets/images/wishlistgame.avif";
import PersonIcon from "@mui/icons-material/Person";
import icon from "../assets/icons/icon.svg";
import xicon from "../assets/icons/closeIcon.svg";

function Cart() {
  useEffect(() => {
    document.title = "Cart";
  }, []);

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
                <Link>
                  <span className="wallet-title">
                    Epic Wallet <img src={navigate} alt="" />
                  </span>
                  <span className="wallet-counter">$0.00</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cart-area">
        <div className="container-main">
          <div className="row">
            <div className="col-12 col-lg-7 col-xl-9">
              <div className="wishlisted-game">
                <div className="top">
                  <div className="game-image">
                    <Link>
                      <img src={wishlistgame} alt="" />
                    </Link>
                  </div>
                  <div className="about-game">
                    <div className="game">
                      <div className="type">
                        <span>Base game</span>
                      </div>
                      <div className="name">
                        <Link>Tom Clancy's Rainbow Six® Siege</Link>
                      </div>
                    </div>
                    <div className="price">
                      <span>$19.99</span>
                    </div>
                  </div>
                </div>

                <div className="operations">
                  <div className="remove-bttn">
                    <button>Remove</button>
                  </div>
                  <div className="add-wishlist-bttn">
                    <button>MOVE TO WISHLIST</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 col-xl-3">
              <div className="checkout-area">
                <div className="checkout-title">
                  <span>Games and Apps Summary</span>
                </div>
                <div className="summary-price">
                  <span className="tag">Price</span>
                  <span className="price">$19.90</span>
                </div>
                <div className="summary-subtotal">
                  <div className="tag">Subtotal</div>
                  <div className="total">$19.90</div>
                </div>
                <div className="checkout-button">
                  <button onClick={handleCheckoutClick}>Check Out</button>
                </div>
              </div>
            </div>
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
                        <PersonIcon /> username
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
                              <span className="wallet-balance">$0.00</span>
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
                            <Link to="/add-funds">
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
                      <div className="payment-games">
                        <div className="payment-item">
                          <div className="payment-thumbnail">
                            <img src={wishlistgame} alt="" />
                          </div>
                          <div className="payment-content">
                            <span className="game-name">
                              Tom Clancy's Rainbow Six® Siege
                            </span>
                            <span className="price">$19.90</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-games">
                        <div className="payment-item">
                          <div className="payment-thumbnail">
                            <img src={wishlistgame} alt="" />
                          </div>
                          <div className="payment-content">
                            <span className="game-name">
                              Tom Clancy's Rainbow Six® Siege
                            </span>
                            <span className="price">$19.90</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-games">
                        <div className="payment-item">
                          <div className="payment-thumbnail">
                            <img src={wishlistgame} alt="" />
                          </div>
                          <div className="payment-content">
                            <span className="game-name">
                              Tom Clancy's Rainbow Six® Siege
                            </span>
                            <span className="price">$19.90</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-games">
                        <div className="payment-item">
                          <div className="payment-thumbnail">
                            <img src={wishlistgame} alt="" />
                          </div>
                          <div className="payment-content">
                            <span className="game-name">
                              Tom Clancy's Rainbow Six® Siege
                            </span>
                            <span className="price">$19.90</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-games">
                        <div className="payment-item">
                          <div className="payment-thumbnail">
                            <img src={wishlistgame} alt="" />
                          </div>
                          <div className="payment-content">
                            <span className="game-name">
                              Tom Clancy's Rainbow Six® Siege
                            </span>
                            <span className="price">$19.90</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-games">
                        <div className="payment-item">
                          <div className="payment-thumbnail">
                            <img src={wishlistgame} alt="" />
                          </div>
                          <div className="payment-content">
                            <span className="game-name">
                              Tom Clancy's Rainbow Six® Siege
                            </span>
                            <span className="price">$19.90</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-games">
                        <div className="payment-item">
                          <div className="payment-thumbnail">
                            <img src={wishlistgame} alt="" />
                          </div>
                          <div className="payment-content">
                            <span className="game-name">
                              Tom Clancy's Rainbow Six® Siege
                            </span>
                            <span className="price">$19.90</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-games">
                        <div className="payment-item">
                          <div className="payment-thumbnail">
                            <img src={wishlistgame} alt="" />
                          </div>
                          <div className="payment-content">
                            <span className="game-name">
                              Tom Clancy's Rainbow Six® Siege
                            </span>
                            <span className="price">$19.90</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-summary">
                        <div className="summary-price">
                          <span className="tag">Price</span>
                          <span className="price">$19.90</span>
                        </div>
                        <div className="summary-subtotal">
                          <div className="tag">Subtotal</div>
                          <div className="total">$19.90</div>
                        </div>
                      </div>
                    </div>
                    <div className="place-order">
                      <button disabled={!isPaymentMethodSelected}>
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
