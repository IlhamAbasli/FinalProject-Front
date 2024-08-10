import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/Wishlist.scss";
import navigate from "../assets/icons/navigate.svg";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import wishlistgame from "../assets/images/wishlistgame.avif";
import "../assets/scss/NotFound.scss";
import { jwtDecode } from "jwt-decode";
import icon from "../assets/icons/notfoundicon.svg";

import axios from "axios";

function Wishlist() {
  useEffect(() => {
    document.title = "My Wishlist";
  }, []);
  const baseURL = "https://localhost:44300/assets/images/";

  const [balance, setBalance] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Recently Added");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const fetchSortedWishlist = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `https://localhost:44300/api/Wishlist/SortBy?userId=${id}&sortType=${selectedOption}`
        );
        setWishlist(response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

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
    fetchSortedWishlist();
  }, [decodedToken]);

  useEffect(() => {
    fetchSortedWishlist();
  }, [selectedOption]);

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Wishlist/RemoveFromWishlist?userId=${id}&productId=${productId}`
      );
      setWishlist(wishlist.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  return (
    <>
      <section id="wishlist-title">
        <div className="container-main">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="title-text">
                <h2>My Wishlist</h2>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="wallet-balance">
                <Link>
                  <span className="wallet-title">
                    Epic Wallet <img src={navigate} alt="" />
                  </span>
                  <span className="wallet-counter">${balance}.00</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="wishlist-area">
        <div className="container-main">
          <div className="row">
            {wishlist.length != 0 ? (
              <div className="col-12">
                <div className="sort-area">
                  <span className="text">Sort by:</span>
                  <div className="sort-dropdown">
                    <button
                      className="toggle-dropdown"
                      onClick={toggleDropdown}
                    >
                      <span>{selectedOption}</span>
                      <span
                        className={`chevron ${isDropdownOpen ? "rotate" : ""}`}
                      >
                        <img src={chevronDownIcon} alt="Chevron Down" />
                      </span>
                    </button>
                    {isDropdownOpen && (
                      <div className="sort-menu">
                        <ul>
                          <li>
                            <button
                              onClick={() =>
                                handleOptionClick("Recently Added")
                              }
                            >
                              Recently Added
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleOptionClick("Alphabetical")}
                            >
                              Alphabetical
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleOptionClick("Price: High to Low")
                              }
                            >
                              Price: High to Low
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleOptionClick("Price: Low to High")
                              }
                            >
                              Price: Low to High
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {wishlist?.map((item, index) => {
                  const mainImage = item.product?.productImages.filter(
                    (image) => image.isMain
                  )[0];
                  return (
                    <div className="wishlisted-game mb-4" key={index}>
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
                              <Link to={`/p/${item.product.id}`}>
                                {item.product.productName}
                              </Link>
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
                            onClick={() => removeFromWishlist(item.product.id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="add-cart-bttn">
                          <button>ADD TO CART</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <section id="not-found-area">
                <div className="row">
                  <div className="col-12">
                    <div className="not-found">
                      <div className="icon">
                        <img src={icon} alt="" />
                      </div>
                      <div className="title">
                        <h1>
                          You haven't added anything to your wishlist yet.
                        </h1>
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
    </>
  );
}

export default Wishlist;
