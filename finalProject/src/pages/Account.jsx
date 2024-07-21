import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/icons/icon.svg";
import iconBorder from "../assets/icons/iconBorder.svg";
import Store from "../assets/icons/Store.svg";
import avataricon from "../assets/icons/avataricon.svg";
function Account() {
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
                        <Link to="/account">Account</Link>
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
      <section id="account-area"></section>
    </>
  );
}

export default Account;
