import React from "react";
import "../../assets/scss/AccountSidebar.scss";

import { NavLink } from "react-router-dom";
import person from "../../assets/icons/person.svg";
import security from "../../assets/icons/security.svg";
import email from "../../assets/icons/email.svg";
function AccountSidebar() {
  return (
    <>
      <ul className="sidebar">
        <li>
          <NavLink to="/account/*">
            <img src={person} alt="" />
            <p>Account Settings</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/email">
            <img src={email} alt="" />
            <p>Email preferences</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/security">
            <img src={security} alt="" />
            <p>Password & security</p>
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default AccountSidebar;
