import React, { useState } from "react";
import "../assets/scss/ProductDetail.scss";
import touch from "../assets/images/touch-the-color.png";
import touchLogo from "../assets/images/touch-the-color-logo.avif";
import touchmini1 from "../assets/images/touch-the-color-mini1.png";
import touchmini2 from "../assets/images/touch-the-color-mini2.avif";
import chevron from "../assets/icons/chevron-down.svg";
import windows from "../assets/icons/Windows.svg";
import share from "../assets/icons/share.svg";
import { Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
function ProductDetail() {
  const images = [touch, touchmini2]; // Add all your image sources here
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 + images.length > images.length - 1
        ? 0
        : (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCopyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard!");
        setOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const [activeTab, setActiveTab] = useState("windows");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section id="game-name">
        <div className="container-main">
          <div className="row">
            <div className="col-12">
              <h1>Touch the Color</h1>
            </div>
          </div>
        </div>
      </section>
      <section id="game-content">
        <div className="container-main">
          <div className="row">
            <div className="col-12 col-md-7 col-xl-9">
              <div className="game-media">
                <div className="main-media">
                  <div className="controllers">
                    <div className="left-arrow" onClick={handleLeftArrowClick}>
                      <button>
                        <img src={chevron} alt="" />
                      </button>
                    </div>
                    <div
                      className="right-arrow"
                      onClick={handleRightArrowClick}
                    >
                      <button>
                        <img src={chevron} alt="" />
                      </button>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <img src={images[currentIndex]} alt="" />
                    </li>
                  </ul>
                </div>
                <div className="other-medias">
                  <ul>
                    {images.map((image, index) => (
                      <li key={index}>
                        <button
                          className={
                            currentIndex === index ? "button-active" : ""
                          }
                          onClick={() => setCurrentIndex(index)}
                        >
                          <img src={image} alt={`thumbnail ${index + 1}`} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="about-game">
                <div className="game-desc">
                  <p>
                    Take your reflexes and aim to the next level with Touch the
                    Color, the arcade-style reaction and accuracy game that’s
                    easy to pick up but hard to put down.
                  </p>
                </div>
                <div className="game-genre">
                  <span>Genre</span>
                  <p>Casual</p>
                </div>
              </div>
              <div className="system-requirements">
                <div className="requirement-title">
                  <h2>Touch The Color System Requirements</h2>
                </div>
                <div className="requirements-area">
                  <div className="tablist">
                    <button
                      className={`windows ${
                        activeTab === "windows" ? "button-active" : ""
                      }`}
                      onClick={() => handleTabClick("windows")}
                    >
                      Windows
                    </button>
                    <button
                      className={`macos ${
                        activeTab === "macos" ? "button-active" : ""
                      }`}
                      onClick={() => handleTabClick("macos")}
                    >
                      MacOS
                    </button>
                  </div>
                  <div className="tabpanel">
                    {activeTab === "windows" && (
                      <div className="row">
                        <div className="col-12">
                          <div className="minmax">
                            <div className="min">
                              <span>Minimum</span>
                            </div>
                            <div className="rec">
                              <span>Recommended</span>
                            </div>
                          </div>
                          <div className="os">
                            <div className="min">
                              <span>OS Version</span>
                              <p>Windows 7</p>
                            </div>
                            <div className="rec">
                              <span>OS Version</span>
                              <p>Windows 11</p>
                            </div>
                          </div>
                          <div className="cpu">
                            <div className="min">
                              <span>CPU</span>
                              <p>X64 Dual Core CPU, 2+ GHz</p>
                            </div>
                            <div className="rec">
                              <span>CPU</span>
                              <p>X64 Quad Core CPU, 3+ GHz</p>
                            </div>
                          </div>
                          <div className="memory">
                            <div className="min">
                              <span>Memory</span>
                              <p>4 GB RAM</p>
                            </div>
                            <div className="rec">
                              <span>Memory</span>
                              <p>8 GB RAM</p>
                            </div>
                          </div>
                          <div className="gpu">
                            <div className="min">
                              <span>GPU</span>
                              <p>Discrete GPU with 1 GB RAM</p>
                            </div>
                            <div className="rec">
                              <span>GPU</span>
                              <p>NVIDIA RTX 3070</p>
                            </div>
                          </div>
                          <div className="line"></div>
                          <div className="author">
                            <span>©2024, Patrick Hart</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "macos" && (
                      <div className="row">
                        <div className="col-12">
                          <div className="minmax">
                            <div className="min">
                              <span>Minimum</span>
                            </div>
                            <div className="rec">
                              <span>Recommended</span>
                            </div>
                          </div>
                          <div className="os">
                            <div className="min">
                              <span>OS Version</span>
                              <p>Mac OSX 12+</p>
                            </div>
                            <div className="rec">
                              <span>OS Version</span>
                              <p>Mac OSX 14+</p>
                            </div>
                          </div>
                          <div className="cpu">
                            <div className="min">
                              <span>CPU</span>
                              <p>M1</p>
                            </div>
                            <div className="rec">
                              <span>CPU</span>
                              <p>M2 Pro</p>
                            </div>
                          </div>
                          <div className="memory">
                            <div className="min">
                              <span>Memory</span>
                              <p>8GB</p>
                            </div>
                            <div className="rec">
                              <span>Memory</span>
                              <p>16GB</p>
                            </div>
                          </div>
                          <div className="gpu">
                            <div className="min">
                              <span>GPU</span>
                              <p>M1</p>
                            </div>
                            <div className="rec">
                              <span>GPU</span>
                              <p>M2 Pro</p>
                            </div>
                          </div>
                          <div className="line"></div>
                          <div className="author">
                            <span>©2024, Patrick Hart</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 col-xl-3">
              <div className="game-operations">
                <div className="game-logo">
                  <img src={touchLogo} alt="" />
                </div>
                <div className="type">
                  <span>Base game</span>
                </div>
                <div className="price">
                  <span>$0.49</span>
                </div>
                <div className="buy-wish">
                  <button className="add-cart">Add to cart</button>
                  <button className="add-wishlist">
                    <div className="to-wishlist">
                      <span className="add-to-wishlist">
                        <div className="wishlist-circle">
                          <div className="plus-item"></div>
                        </div>
                      </span>
                    </div>
                    Add to wishlist
                  </button>
                </div>
                <div className="creator-detail">
                  <ul>
                    <li className="developer">
                      <span>Developer</span>
                      <p>CenterPoint Gaming</p>
                    </li>
                    <li className="publisher">
                      <span>Publisher</span>
                      <p>CenterPoint Gaming</p>
                    </li>
                    <li className="release">
                      <span>Release Date</span>
                      <p>02/23/24</p>
                    </li>
                    <li className="platform">
                      <span>Platform</span>
                      <p>
                        <img src={windows} alt="" />
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="copy-to-clipboard">
                  <div className="copy-to-clipboard">
                    <button onClick={handleCopyToClipboard}>
                      <img src={share} alt="" />
                      Share
                    </button>
                    <Snackbar
                      open={open}
                      message="Link copied"
                      autoHideDuration={1000}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <Alert
                        icon={<CheckIcon fontSize="inherit" />}
                        severity="success"
                      >
                        Link copied!
                      </Alert>
                    </Snackbar>
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

export default ProductDetail;
