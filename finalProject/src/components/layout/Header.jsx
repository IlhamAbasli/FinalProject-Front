import React from "react";
import "../../assets/scss/Header.scss";
import icon from "../../assets/icons/icon.svg";
import { Menu, MenuItem, Button, Avatar } from "@mui/material";
import iconBorder from "../../assets/icons/iconBorder.svg";
import Store from "../../assets/icons/Store.svg";
import avataricon from "../../assets/icons/avataricon.svg";
import { Link, NavLink } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section id="header">
      <div className="row">
        <div className="col-1 left-side">
          <img src={icon} alt="" className="icon" />
          <img src={iconBorder} alt="" className="iconBorder" />
        </div>
        <div className="col-8 middle">
          <ul>
            <li>
              <Link to="/">
                <img src={Store} alt="" className="store" />
              </Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
          </ul>
        </div>
        <div className="col-3 right-side">
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
    </section>
  );
}

export default Header;
