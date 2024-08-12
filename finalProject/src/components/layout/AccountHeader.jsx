import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/icons/icon.svg";
import iconBorder from "../../assets/icons/iconBorder.svg";
import Store from "../../assets/icons/Store.svg";
import avataricon from "../../assets/icons/avataricon.svg";
import "../../assets/scss/AccountHeader.scss";
import { jwtDecode } from "jwt-decode";
function AccountHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
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

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
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
                  <Link
                    to={!token && "/login"}
                    title={decodedToken && decodedToken.sub}
                  >
                    <div className="account">
                      <img src={avataricon} alt="" />
                    </div>
                  </Link>
                  {token && decodedToken && (
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
                          <button onClick={logout}>Log out</button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <Link to="/library">Library</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountHeader;
