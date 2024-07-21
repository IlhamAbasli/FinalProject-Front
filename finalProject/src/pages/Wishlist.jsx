import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/Wishlist.scss";
import navigate from "../assets/icons/navigate.svg";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import wishlistgame from "../assets/images/wishlistgame.avif";

function Wishlist() {
  useEffect(() => {
    document.title = "My Wishlist";
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
                  <span className="wallet-counter">$0.00</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="wishlist-area">
        <div className="container-main">
          <div className="row">
            <div className="col-12">
              <div className="sort-area">
                <span className="text">Sort by:</span>
                <div className="sort-dropdown">
                  <button className="toggle-dropdown" onClick={toggleDropdown}>
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
                            onClick={() => handleOptionClick("Recently Added")}
                          >
                            New Release
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
                  <div className="add-cart-bttn">
                    <button>ADD TO CART</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Wishlist;
