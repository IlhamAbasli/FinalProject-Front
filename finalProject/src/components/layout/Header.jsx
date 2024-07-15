import React from "react";
import "../../assets/scss/Header.scss";
import icon from "../../assets/icons/icon.svg";
import iconBorder from "../../assets/icons/iconBorder.svg";
import Store from "../../assets/icons/Store.svg";
import avataricon from "../../assets/icons/avataricon.svg";
import search from "../../assets/icons/search.svg";
import { Link, NavLink } from "react-router-dom";
function Header() {
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
          <div className="col-lg-8 col-6 d-lg-block middle">
            <div className="middle">
              <ul>
                <li>
                  <Link to="/">
                    <img src={Store} alt="" className="store" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-4 right-side">
            <div className="right-side">
              <ul>
                <li>
                  <div className="account">
                    <img src={avataricon} alt="" />
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
      <section id="header-bottom">
        <div className="container-main">
          <div className="row">
            <div className="col-4 col-lg-2 d-none d-lg-block search-input ">
              <div className="search-input">
                <div className="input-area">
                  <div className="search-icon">
                    <img src={search} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search store"
                    className="search"
                  />
                </div>
              </div>
            </div>
            <div className="col-4 col-lg-6 menus  d-none d-lg-block">
              <div className="menus">
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
            </div>
            <div className="col-4 col-lg-3 cart-wishlist">
              <div className="cart-wishlist">
                <ul>
                  <li>
                    <NavLink to="/wishlist">Wishlist</NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart">Cart</NavLink>
                    <span className="basket-count">2</span>
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
