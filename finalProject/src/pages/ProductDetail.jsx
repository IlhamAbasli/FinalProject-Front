import React, { useEffect, useState } from "react";
import "../assets/scss/ProductDetail.scss";
import chevron from "../assets/icons/chevron-down.svg";
import share from "../assets/icons/share.svg";
import { Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loading from "../components/layout/Loading";

function ProductDetail() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Product/GetById/${id}`
        );
        setGame(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, [id]);

  const images = game?.productImages?.filter((image) => !image.isMain) || [];
  console.log(images);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
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

  const [activeTab, setActiveTab] = useState("Windows");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (game?.productName) {
      document.title = `${game.productName} | Buy Today - Epic Games Store`;
    }
  }, [game]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <section id="game-name">
            <div className="container-main">
              <div className="row">
                <div className="col-12">
                  <h1>{game?.productName}</h1>
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
                        <div
                          className="left-arrow"
                          onClick={handleLeftArrowClick}
                        >
                          <button>
                            <img src={chevron} alt="Left arrow" />
                          </button>
                        </div>
                        <div
                          className="right-arrow"
                          onClick={handleRightArrowClick}
                        >
                          <button>
                            <img src={chevron} alt="Right arrow" />
                          </button>
                        </div>
                      </div>
                      <ul>
                        {images.length > 0 && (
                          <li>
                            <img
                              src={`${baseURL}${images[currentIndex].imageName}`}
                              alt={`Main image ${currentIndex + 1}`}
                            />
                          </li>
                        )}
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
                              <img
                                src={`${baseURL}${image.imageName}`}
                                alt={`thumbnail ${index + 1}`}
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="about-game">
                    <div className="game-desc">
                      <p>{game?.productDescription}</p>
                    </div>
                    <div className="game-genre">
                      <span>Genre</span>
                      <p>{game?.genre?.genreName}</p>
                    </div>
                  </div>
                  <div className="system-requirements">
                    <div className="requirement-title">
                      <h2>{`${game?.productName} System Requirements`}</h2>
                    </div>
                    <div className="requirements-area">
                      <div className="tablist">
                        {game?.platformProducts.map((item, index) => {
                          return (
                            <button
                              key={index}
                              className={`${item.platform.platformName} ${
                                activeTab === item.platform.platformName
                                  ? "button-active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleTabClick(`${item.platform.platformName}`)
                              }
                            >
                              {item.platform.platformName}
                            </button>
                          );
                        })}
                      </div>
                      <div className="tabpanel">
                        {game?.platformProducts
                          .filter(
                            (item) => activeTab === item.platform.platformName
                          )
                          .map((item, index) => (
                            <div className="row" key={index}>
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
                                    <p>
                                      {
                                        item.platform
                                          .platformSystemRequirements[0]
                                          .systemRequirement.minOsVersion
                                      }
                                    </p>
                                  </div>
                                  <div className="rec">
                                    <span>OS Version</span>
                                    <p>
                                      {
                                        item.platform
                                          .platformSystemRequirements[0]
                                          .systemRequirement.recomOsVersion
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="cpu">
                                  <div className="min">
                                    <span>CPU</span>
                                    <p>
                                      {
                                        item.platform
                                          .platformSystemRequirements[0]
                                          .systemRequirement.minCpuName
                                      }
                                    </p>
                                  </div>
                                  <div className="rec">
                                    <span>CPU</span>
                                    <p>
                                      {
                                        item.platform
                                          .platformSystemRequirements[0]
                                          .systemRequirement.recomCpuName
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="memory">
                                  <div className="min">
                                    <span>Memory</span>
                                    <p>
                                      {
                                        item.platform
                                          .platformSystemRequirements[0]
                                          .systemRequirement.minMemory
                                      }
                                    </p>
                                  </div>
                                  <div className="rec">
                                    <span>Memory</span>
                                    <p>
                                      {
                                        item.platform
                                          .platformSystemRequirements[0]
                                          .systemRequirement.recomMemory
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="gpu">
                                  <div className="min">
                                    <span>GPU</span>
                                    <p>
                                      {
                                        item.platform
                                          .platformSystemRequirements[0]
                                          .systemRequirement.minGpu
                                      }
                                    </p>
                                  </div>
                                  <div className="rec">
                                    <span>GPU</span>
                                    <p>
                                      {
                                        item.platform
                                          .platformSystemRequirements[0]
                                          .systemRequirement.recomGpu
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="line"></div>
                                <div className="author">
                                  <span>{`©${moment(game.createdDate).format(
                                    "yyyy"
                                  )} ${game.developerName}`}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-5 col-xl-3">
                  <div className="game-operations">
                    <div className="game-logo">
                      {game && (
                        <img src={`${baseURL}${game.productLogo}`} alt="" />
                      )}
                    </div>
                    <div className="type">
                      <span>{game?.productType.typeName}</span>
                    </div>
                    <div className="price">
                      <span>${game?.productPrice}</span>
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
                          <p>{game?.developerName}</p>
                        </li>
                        <li className="publisher">
                          <span>Publisher</span>
                          <p>{game?.publisherName}</p>
                        </li>
                        <li className="release">
                          <span>Release Date</span>
                          <p>
                            {moment(game?.createdDate).format("DD/MM/YYYY")}
                          </p>
                        </li>
                        <li className="platform">
                          <span>Platform</span>
                          <p>
                            <img
                              src={`${baseURL}${game?.platformProducts[0].platform.platformLogo}`}
                              alt=""
                            />
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="copy-to-clipboard">
                      <div className="copy-to-clipboard">
                        <button onClick={handleCopyToClipboard}>
                          <img src={share} alt="Share icon" />
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
      )}
    </>
  );
}

export default ProductDetail;
