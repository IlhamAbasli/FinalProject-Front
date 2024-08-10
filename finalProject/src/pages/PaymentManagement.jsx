import React, { useState, useEffect } from "react";
import AccountSidebar from "../components/layout/AccountSidebar";
import AccountHeader from "../components/layout/AccountHeader";
import "../assets/scss/PaymentManagement.scss";
import icon from "../assets/icons/creditCardIcon.svg";
import master from "../assets/icons/master.png";
import visa from "../assets/icons/vida.png";
import american from "../assets/icons/americanEx.png";
import { paymentMethodSchema } from "../schemas";
import { useFormik } from "formik";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function PaymentManagement() {
  useEffect(() => {
    document.title = "Payment Management";
  });
  const [isActive, setIsActive] = useState(false);
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [balance, setBalance] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const amounts = [5, 10, 20, 50, 100];

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedToken = localStorage.getItem("user-info");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        const decoded = jwtDecode(parsedToken);
        setToken(parsedToken);
        setDecodedToken(decoded);
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
    }
  }, [decodedToken]);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1-")
      .substring(0, 19);
  };

  const formatExpirationDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(?=\d)/g, "$1/")
      .substring(0, 5);
  };

  const handleTriggerClick = () => {
    setIsActive(!isActive);
    setIsPaymentMethodSelected(!isActive);
  };

  const { values, errors, isSubmitting, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        cardNumber: "",
        expiration: "",
        cvv: "",
      },
      validationSchema: paymentMethodSchema,
    });

  const handleCardNumberChange = (event) => {
    setFieldValue("cardNumber", formatCardNumber(event.target.value));
  };

  const handleExpirationChange = (event) => {
    setFieldValue("expiration", formatExpirationDate(event.target.value));
  };

  const handleSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const handleAddFunds = async () => {
    try {
      const res = await axios.post(
        `https://localhost:44300/api/Wallet/AddFunds?balance=${selectedAmount}&userId=${decodedToken.sid}`
      );
      console.log(res);
      await fetchBalance(); // Update balance after adding funds
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div>
      <AccountHeader />
      <section id="account-area">
        <div className="container-account">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <AccountSidebar />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <div className="payment-side">
                <div className="title">
                  <h1>Payment Management</h1>
                  <p>
                    View your payment activity and the current balance of your
                    Epic Games account.
                  </p>
                </div>
                <div className="payment-info">
                  <h1>CURRENT EPIC WALLET BALANCE</h1>
                </div>
                <hr />
                <div className="balance">
                  <p>${balance.toFixed(2)}</p>
                  <button
                    onClick={handleAddFunds}
                    disabled={
                      !isPaymentMethodSelected ||
                      errors.cardNumber ||
                      errors.cvv ||
                      errors.expiration
                    }
                  >
                    Add funds to wallet
                  </button>
                </div>
                <div className="top-up">
                  <p>Select funding amount</p>
                  <ul>
                    {amounts.map((amount) => (
                      <li key={amount}>
                        <button
                          className={
                            selectedAmount === amount ? "selected" : ""
                          }
                          onClick={() => handleSelect(amount)}
                        >
                          ${amount}.00
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="payment-methods">
                  <h1>Payment Method</h1>
                  <hr />
                  <p>Enter payment method for adding funds to your account.</p>
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
                          <p>Credit Card</p>
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <div className="payment-wallet-form">
                        <div className="payment-types">
                          <ul>
                            <li>
                              <img src={american} alt="" />
                            </li>
                            <li>
                              <img src={master} alt="" />
                            </li>
                            <li>
                              <img src={visa} alt="" />
                            </li>
                          </ul>
                        </div>
                        <div className="payment-details">
                          <form>
                            <div className="row">
                              <div className="col-12">
                                <input
                                  type="text"
                                  name="cardNumber"
                                  onChange={handleCardNumberChange}
                                  value={values.cardNumber}
                                  className="form-control"
                                  id="cardNumber"
                                  maxLength={19}
                                  placeholder="Card Number"
                                />
                                {errors.cardNumber && (
                                  <p style={{ color: "red" }}>
                                    {errors.cardNumber}
                                  </p>
                                )}
                              </div>
                              <div className="col-6 mt-2">
                                <input
                                  type="text"
                                  name="expiration"
                                  onChange={handleExpirationChange}
                                  value={values.expiration}
                                  className="form-control"
                                  id="expiration"
                                  placeholder="Expiration"
                                />
                                {errors.expiration && (
                                  <p style={{ color: "red" }}>
                                    {errors.expiration}
                                  </p>
                                )}
                              </div>
                              <div className="col-6 mt-2">
                                <input
                                  type="text"
                                  name="cvv"
                                  onChange={handleChange}
                                  value={values.cvv}
                                  className="form-control"
                                  placeholder="CVV"
                                  maxLength={4}
                                  id="cvv"
                                />
                                {errors.cvv && (
                                  <p style={{ color: "red" }}>{errors.cvv}</p>
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentManagement;
