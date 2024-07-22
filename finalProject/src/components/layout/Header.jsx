import React, { useState, useEffect } from "react";
import "../../assets/scss/Header.scss";
import icon from "../../assets/icons/icon.svg";
import iconBorder from "../../assets/icons/iconBorder.svg";
import Store from "../../assets/icons/Store.svg";
import avataricon from "../../assets/icons/avataricon.svg";
import search from "../../assets/icons/search.svg";
import wishlistIcon from "../../assets/icons/wishlist.svg";
import cartIcon from "../../assets/icons/cart.svg";
import closeIcon from "../../assets/icons/closeIcon.svg";
import chevronDownIcon from "../../assets/icons/chevron-down.svg";
import { Link, NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
function Header() {
  useEffect(() => {
    document.title =
      "Epic Games Store | Download & Play PC Games, Mods, DLC & More – Epic Games";
  });
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Discover");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleItemClick = (text) => {
    setButtonText(text);
    setIsOpen(false); // Close the dropdown after selecting an item
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      // Adjust the value as needed
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <section id="header">
        <div className="row">
          <div className="col-lg-1 col-2 left-side">
            <div className="left-side">
              <img src={icon} alt="" className="icon" />
              <img src={iconBorder} alt="" className="iconBorder" />
            </div>
          </div>
          <div className="col-lg-8 col-5 d-lg-block middle">
            <div className="middle">
              <ul>
                <li onClick={() => handleItemClick("Discover")}>
                  <Link to="/">
                    <img src={Store} alt="" className="store" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-4 right-side">
            <div className="">
              <ul>
                <li className="account-nav">
                  <Link to="/login" title="IlhamXIII">
                    <div className="account">
                      <img src={avataricon} alt="" />
                    </div>
                  </Link>
                  <div className="nav-account-menu">
                    <ul>
                      <li>
                        <Link to="/account/*">Account</Link>
                      </li>
                      <li>
                        <Link to="/redeem">Redeem Code</Link>
                      </li>
                      <li>
                        <Link to="/wishlist">Wishlist</Link>
                      </li>
                      <li>
                        <button>Log out</button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link to="/library">Library</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="header-bottom" className={isSticky ? "sticky" : ""}>
        <div className="container-main">
          <div className="row">
            <div className="col-4 col-lg-4 col-xl-2 search-input">
              <div className="search-input d-none d-lg-flex">
                <div className="input-area">
                  <div className="search-icon">
                    <img src={search} alt="" />
                  </div>
                  <form action="">
                    <input
                      type="text"
                      placeholder="Search store"
                      className="search"
                    />
                  </form>
                </div>
              </div>
              <div className="search-mobile d-block d-lg-none">
                <div className="input-area">
                  <div className="search-icon" onClick={toggleSearch}>
                    <img src={search} alt="Search Icon" />
                  </div>
                  <div
                    className={`search-overlay ${isSearchOpen ? "show" : ""}`}
                  >
                    <button className="search-store" onClick={toggleSearch}>
                      <div className="search-icon">
                        <img src={search} alt="Search Icon" />
                      </div>
                    </button>
                    <form action="">
                      <input
                        type="text"
                        placeholder="Search store"
                        className="search"
                      />
                    </form>
                    <button className="search-close" onClick={closeSearch}>
                      <img src={closeIcon} alt="Close Icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 col-lg-6 menus">
              <div className="menus d-none d-md-flex">
                <ul>
                  <li>
                    <NavLink to="/">Discover</NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop">Browse</NavLink>
                  </li>
                  <li>
                    <NavLink to="/news">News</NavLink>
                  </li>
                </ul>
              </div>
              <div className="menus-mobile d-block d-md-none">
                <button className="menu-dropdown" onClick={toggleDropdown}>
                  {buttonText}
                  <img
                    src={chevronDownIcon}
                    alt="chevron"
                    className={`chevron ${isOpen ? "open" : ""}`}
                  />
                </button>
                <div className={`dropdown-menu-main ${isOpen ? "show" : ""}`}>
                  <ul>
                    <li onClick={() => handleItemClick("Discover")}>
                      <NavLink to="/">Discover</NavLink>
                    </li>
                    <li onClick={() => handleItemClick("Browse")}>
                      <NavLink to="/shop">Browse</NavLink>
                    </li>
                    <li onClick={() => handleItemClick("News")}>
                      <NavLink to="/news">News</NavLink>
                    </li>
                  </ul>
                </div>
                <div
                  className={`cover ${isOpen ? "show" : ""}`}
                  onClick={closeDropdown}
                ></div>
              </div>
            </div>
            <div className="col-4 col-lg-2 col-xl-3 cart-wishlist">
              <div className="cart-wishlist">
                <ul className="d-none d-lg-flex">
                  <li>
                    <NavLink to="/wishlist">Wishlist</NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart">Cart</NavLink>
                    <span className="basket-count">2</span>
                  </li>
                </ul>
                <ul className="d-lg-none d-flex">
                  <li>
                    <NavLink to="/wishlist">
                      <img src={wishlistIcon} alt="" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart">
                      <Badge badgeContent={2} color="secondary">
                        <img src={cartIcon} alt="" />
                      </Badge>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
