import React from "react";
import { Link } from "react-router-dom";
import icon from "../../../../assets/icons/icon.svg";
function Sidebar() {
  return (
    <>
      <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          <li className="text-center mt-3">
            <img src={icon} alt="" style={{ width: "70px", height: "70px" }} />
          </li>
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">Home</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" aria-expanded="false" to="/admin">
              <span>
                <i className="ti ti-layout-dashboard"></i>
              </span>
              <span className="hide-menu">Dashboard</span>
            </Link>
          </li>
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">COMPONENTS</span>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/admin/genres"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-tags"></i>
              </span>
              <span className="hide-menu">Genres</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/admin/games"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-tags"></i>
              </span>
              <span className="hide-menu">Game</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/admin/types"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-tags"></i>
              </span>
              <span className="hide-menu">Type</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/admin/platforms"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-tags"></i>
              </span>
              <span className="hide-menu">Platforms</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/admin/ads"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-tags"></i>
              </span>
              <span className="hide-menu">Ad</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/admin/news"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-tags"></i>
              </span>
              <span className="hide-menu">News</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/admin/users"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-tags"></i>
              </span>
              <span className="hide-menu">Users</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/admin/comments"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-tags"></i>
              </span>
              <span className="hide-menu">Comments</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
