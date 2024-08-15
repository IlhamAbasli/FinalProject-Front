import React, { useEffect, useState } from "react";
import "../assets/scss/ProductDetail.scss";
import chevron from "../assets/icons/chevron-down.svg";
import inlibrary from "../assets/icons/inlibrary.svg";
import share from "../assets/icons/share.svg";
import { Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loading from "../components/layout/Loading";
import { jwtDecode } from "jwt-decode";
import { Tooltip, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function ProductDetail() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const { id } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const [basket, setBasket] = useState([]);
  const [library, setLibrary] = useState([]);
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedToken = localStorage.getItem("user-info");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        const decoded = jwtDecode(parsedToken);
        setToken(parsedToken);
        setDecodedToken(decoded);
        setUserId(decoded.sid);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

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
      } catch (error) {
        navigate("/notfound");
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, [id]);

  const images = game?.productImages?.filter((image) => !image.isMain) || [];
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
    fetchWishlist();
    fetchLibrary();
    fetchBasket();
  }, [game]);

  const addToWishlist = async (productId) => {
    try {
      setWishlistLoading(true);
      const response = await axios.post(
        `https://localhost:44300/api/Wishlist/AddWishlist?userId=${userId}&productId=${productId}`
      );
      setTimeout(() => {
        setWishlistLoading(false);
      }, 2000);
      setWishlist([...wishlist, productId]);
      fetchWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      setCartLoading(true);
      const response = await axios.post(
        `https://localhost:44300/api/Basket/AddBasket?userId=${userId}&productId=${productId}`
      );
      setTimeout(() => {
        setCartLoading(false);
        setBasket([...wishlist, productId]);
        navigate(`/p/${productId}`);
      }, 2000);
      fetchWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlistLoading(true);

    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Wishlist/RemoveFromWishlist?userId=${userId}&productId=${productId}`
      );
      setTimeout(() => {
        setWishlistLoading(false);
      }, 2000);
      setWishlist(wishlist.filter((item) => item !== productId));
      fetchWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const fetchWishlist = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `https://localhost:44300/api/Wishlist/GetUserWishlistIds?userId=${userId}`
        );
        setWishlist(response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const fetchLibrary = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `https://localhost:44300/api/Library/GetUserLibraryIds?userId=${userId}`
        );
        setLibrary(response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const fetchBasket = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `https://localhost:44300/api/Basket/GetUserBasketIds?userId=${userId}`
        );
        setBasket(response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
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
                    {library.includes(game?.id) ? (
                      <div className="buy-wish">
                        <button
                          className="in-library"
                          disabled
                          style={{ cursor: "not-allowed" }}
                        >
                          <img src={inlibrary} alt="" />
                          In Library
                        </button>
                      </div>
                    ) : (
                      <div className="buy-wish">
                        {basket.includes(game?.id) ? (
                          <Link to="/cart" className="in-cart">
                            View in cart
                          </Link>
                        ) : userId ? (
                          <button
                            className="add-cart"
                            onClick={() => addToCart(game?.id)}
                          >
                            {cartLoading ? (
                              <CircularProgress
                                size={24}
                                sx={{ color: "white" }}
                              />
                            ) : (
                              "Add to cart"
                            )}
                          </button>
                        ) : (
                          <Link
                            className="in-cart"
                            style={{ textTransform: "uppercase" }}
                            to="/login"
                          >
                            Add to cart
                          </Link>
                        )}

                        {wishlist.includes(game?.id) ? (
                          <Tooltip
                            title="Remove from wishlist"
                            placement="bottom"
                            slotProps={{
                              popper: {
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: {
                                      offset: [0, -5],
                                    },
                                  },
                                ],
                              },
                            }}
                          >
                            <button
                              className="add-wishlist"
                              onClick={() => removeFromWishlist(game?.id)}
                            >
                              {wishlistLoading ? (
                                <CircularProgress size={24} color="secondary" />
                              ) : (
                                "In wishlist"
                              )}
                            </button>
                          </Tooltip>
                        ) : userId ? (
                          <button
                            className="add-wishlist"
                            onClick={() => addToWishlist(game?.id)}
                          >
                            {wishlistLoading ? (
                              <CircularProgress size={24} color="secondary" />
                            ) : (
                              <>
                                <div className="to-wishlist">
                                  <span className="add-to-wishlist">
                                    <div className="wishlist-circle">
                                      <div className="plus-item"></div>
                                    </div>
                                  </span>
                                </div>
                                Add to wishlist
                              </>
                            )}
                          </button>
                        ) : (
                          <Link className="add-wishlist" to="/login">
                            <div className="to-wishlist">
                              <span className="add-to-wishlist">
                                <div className="wishlist-circle">
                                  <div className="plus-item"></div>
                                </div>
                              </span>
                            </div>
                            Add to wishlist
                          </Link>
                        )}
                      </div>
                    )}

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
