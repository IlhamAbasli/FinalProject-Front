import React from "react";
import "../../assets/scss/Footer.scss";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EpicIcon from "../../assets/icons/icon.svg";
import UnrealIcon from "../../assets/icons/ueLogo.png";
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="footer-area">
      <section id="social-area">
        <div className="row">
          <div className="col-10 col-sm-8">
            <ul className="social">
              <li>
                <Link>
                  <FacebookRoundedIcon
                    sx={{ fontSize: "32px", color: "white" }}
                  />
                </Link>
              </li>

              <li>
                <Link>
                  <XIcon sx={{ fontSize: "28px", color: "white" }} />
                </Link>
              </li>

              <li>
                <Link>
                  <YouTubeIcon sx={{ fontSize: "34px", color: "white" }} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-2 col-sm-4 top">
            <button className="scroll-top-button" onClick={scrollToTop}>
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>
      </section>

      <section id="footer-link">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-7 col-lg-6 d-flex">
            <div className="footer-menu">
              <div className="menu-title">Menus</div>
              <ul>
                <li>
                  <Link>Wishlist</Link>
                </li>
                <li>
                  <Link>Cart</Link>
                </li>
                <li>
                  <Link>Browse</Link>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <div className="menu-title">Account</div>
              <ul>
                <li>
                  <Link>Log in</Link>
                </li>
                <li>
                  <Link>Register</Link>
                </li>
                <li>
                  <Link>Account</Link>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <div className="menu-title">Epic Games</div>
              <ul>
                <li>
                  <Link>About</Link>
                </li>
                <li>
                  <Link>News</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="footer-border" />

      <section id="copyright">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6">
            <p>
              © 2024, Epic Games, Inc & Ilham Abaslı. All rights reserved. Epic,
              Epic Games, the Epic Games logo, Fortnite, the Fortnite logo,
              Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament,
              and the Unreal Tournament logo are trademarks or registered
              trademarks of Epic Games, Inc. in the United States of America and
              elsewhere. Other brands or product names are the trademarks of
              their respective owners.
            </p>
          </div>
        </div>
      </section>

      <section id="legal">
        <div className="row">
          <div className="col-12">
            <ul className="logos">
              <li>
                <img src={EpicIcon} alt="" />
              </li>
              <li>
                <img src={UnrealIcon} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
