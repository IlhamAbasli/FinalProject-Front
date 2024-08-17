import React, { useState, useEffect, useRef } from "react";
import "../assets/scss/Home.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";
import { Tooltip } from "@mui/material";
import checked from "../assets/icons/checked.svg";
import Loading from "../components/layout/Loading";

function Home() {
  const [itemId, setItemId] = useState("");
  const [slider, setSlider] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [trending, setTrending] = useState([]);
  const [editors, setEditors] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState({});

  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setItemId((prev) => {
        const currentIndex = slider.findIndex((item) => item.id === prev);
        const nextIndex = (currentIndex + 1) % slider.length;
        return slider[nextIndex].id;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [slider]);
  const handleClick = (e, id) => {
    setItemId(id);
  };

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  };

  const baseURL = "https://localhost:44300/assets/images/";

  const [ads, setAds] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Epic Games Store | Download & Play PC Games, Mods, DLC & More – Epic Games`;

    const storedToken = localStorage.getItem("user-info");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        const decoded = jwtDecode(parsedToken);
        setToken(parsedToken);
        setDecodedToken(decoded);
        setId(decoded.sid);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    const fetchAds = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Ad/GetAll"
        );
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchLatest = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Product/GetLatestProducts"
        );
        setLatestProducts(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Product/GetTopSellers"
        );
        setTopSellers(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Product/GetTrending"
        );
        setTrending(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchEditors = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Product/GetEditorsChoices"
        );
        setEditors(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/News/GetLatestNews"
        );
        setLatestNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchSlider = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Product/GetSliderProducts"
        );
        setSlider(response.data);
        setItemId(response.data[0].id);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchTopSellers();
    fetchLatestNews();
    fetchTrending();
    fetchLatest();
    fetchEditors();
    fetchSlider();
    fetchAds();
  }, []);
  const fetchWishlist = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `https://localhost:44300/api/Wishlist/GetUserWishlistIds?userId=${id}`
        );
        setWishlist(response.data);
        console.log(wishlist);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchWishlist();
    }
  }, [id]);

  const addToWishlist = async (productId) => {
    setLoading((prevLoading) => ({ ...prevLoading, [productId]: true }));

    try {
      const response = await axios.post(
        `https://localhost:44300/api/Wishlist/AddWishlist?userId=${id}&productId=${productId}`
      );
      setTimeout(() => {
        setLoading((prevLoading) => ({ ...prevLoading, [productId]: false }));
        setWishlist([...wishlist, productId]);
      }, 2000);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    setLoading((prevLoading) => ({ ...prevLoading, [productId]: true }));

    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Wishlist/RemoveFromWishlist?userId=${id}&productId=${productId}`
      );
      setTimeout(() => {
        setLoading((prevLoading) => ({
          ...prevLoading,
          [productId]: false,
        }));
        setWishlist(wishlist.filter((item) => item.product?.id !== productId));
        fetchWishlist();
      }, 2000);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  return (
    <>
      {slider.length === 0 &&
      latestProducts.length === 0 &&
      latestNews.length === 0 &&
      topSellers.length === 0 &&
      trending.length === 0 &&
      editors.length === 0 ? (
        <Loading />
      ) : (
        <>
          {" "}
          <section id="slider">
            <div className="container-main">
              <div className="row">
                <div className="col-md-9 d-none d-md-block">
                  {slider?.map((item, index) => {
                    const mainImage = item.productImages.filter(
                      (image) => !image.isMain
                    )[0];
                    return (
                      <div
                        className={`carousel ${
                          item.id === itemId ? "d-block" : "d-none"
                        }`}
                        id={item.id}
                        key={index}
                      >
                        <div className="carousel-main-item">
                          <Link href="" className="image-link">
                            <div className="slider-image">
                              <img
                                src={`${baseURL}${
                                  mainImage ? mainImage.imageName : ""
                                }`}
                                alt=""
                              />
                            </div>
                            <div className="image-shadow"></div>
                          </Link>
                          <div className="game-detail">
                            <div className="game-description">
                              <div
                                className="game-logo"
                                style={{
                                  backgroundImage: `url(${baseURL}${item.productLogo})`,
                                }}
                              ></div>
                              <div className="about-game">
                                <span>AVAILABLE</span>
                                <p>{item.productDescription}</p>
                              </div>
                            </div>
                            <div className="game-operations">
                              <div className="price">
                                <p>
                                  {item.productPrice === 0
                                    ? "Free"
                                    : `$${item.productPrice}`}
                                </p>
                              </div>
                              <div className="buy-wishlist">
                                <Link to={`/p/${item.id}`} className="buynow">
                                  BUY {item.productPrice === 0 && "FREE"} NOW
                                </Link>
                                {wishlist.includes(item.id) ? (
                                  <div className="to-wishlist">
                                    <Tooltip
                                      title="Remove from wishlist"
                                      arrow
                                      placement="top"
                                      slotProps={{
                                        popper: {
                                          modifiers: [
                                            {
                                              name: "offset",
                                              options: {
                                                offset: [0, -20],
                                              },
                                            },
                                          ],
                                        },
                                      }}
                                    >
                                      <div className="to-wishlist">
                                        <button
                                          onClick={() =>
                                            removeFromWishlist(item.id)
                                          }
                                        >
                                          {loading[item?.id] ? (
                                            <CircularProgress
                                              size={10}
                                              sx={{ color: "white" }}
                                            />
                                          ) : (
                                            <>
                                              <span>IN WISHLIST</span>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                    </Tooltip>
                                  </div>
                                ) : id ? (
                                  <div className="to-wishlist">
                                    <button
                                      onClick={() => addToWishlist(item.id)}
                                    >
                                      {loading[item?.id] ? (
                                        <CircularProgress
                                          size={10}
                                          sx={{ color: "white" }}
                                        />
                                      ) : (
                                        <>
                                          <div className="wishlist-button">
                                            <div className="spinner"></div>
                                          </div>
                                          <span>ADD TO WISHLIST</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                ) : (
                                  <Link to="/login">
                                    {" "}
                                    <div className="to-wishlist">
                                      <button>
                                        <div className="wishlist-button">
                                          <div className="spinner"></div>
                                        </div>
                                        <span>ADD TO WISHLIST</span>
                                      </button>
                                    </div>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-md-3 d-none d-md-block">
                  <div className="carousel-mini-item active-thumb">
                    <ul>
                      {slider.map((item, index) => {
                        const mainImage = item.productImages.filter(
                          (image) => image.isMain
                        )[0];
                        return (
                          <li key={index}>
                            <Link onClick={(e) => handleClick(e, item.id)}>
                              <div
                                id={item.id}
                                className={`mini-item-thumb ${
                                  item.id === itemId && "active-thumb"
                                }`}
                              >
                                <div className="item-image">
                                  <img
                                    src={`${baseURL}${
                                      mainImage ? mainImage.imageName : ""
                                    }`}
                                    alt=""
                                  />
                                </div>
                                <div className="game-name">
                                  <span>{item.productName}</span>
                                </div>
                                {item.id === itemId && (
                                  <div className="cover">
                                    <div className="cover-item"></div>
                                    <div className="cover-progress"></div>
                                  </div>
                                )}
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {/* <div className="col-12 d-md-none">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
              </Swiper>
            </div> */}
              </div>
            </div>
          </section>
          <section id="top-new-releases">
            <div className="container-main">
              <div className="top-title">
                <div className="top-title-link">
                  <p>Top New Releases</p>
                </div>
                <div className="slider-controller">
                  <div className="prev-button">
                    <button
                      className={`prev-btn bttn ${isBeginning && "disable"}`}
                      onClick={handlePrev}
                    >
                      <img src={chevronDownIcon} alt="" />
                    </button>
                  </div>
                  <div className="next-button">
                    <button
                      className={`next-btn bttn ${isEnd && "disable"}`}
                      onClick={handleNext}
                    >
                      <img src={chevronDownIcon} alt="" />
                    </button>
                  </div>
                </div>
              </div>
              <Swiper
                slidesPerView={6}
                spaceBetween={32}
                ref={swiperRef}
                onSlideChange={handleSlideChange}
                className="mySwiper"
                breakpoints={{
                  320: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1920: {
                    slidesPerView: 6,
                    spaceBetween: 32,
                  },
                }}
              >
                {latestProducts?.map((item, index) => {
                  const mainImage = item.productImages.filter(
                    (image) => image.isMain
                  )[0];
                  return (
                    <SwiperSlide key={index}>
                      <div className="offer-card">
                        <Link to={`/p/${item.id}`}>
                          <div className="card-body">
                            <div className="card-image">
                              <img
                                src={`${baseURL}${
                                  mainImage ? mainImage.imageName : ""
                                }`}
                                alt=""
                              />
                            </div>
                            <div className="card-desc">
                              <span className="game-type">
                                {item.productType.typeName}
                              </span>
                              <p className="name">{item.productName}</p>
                              <div className="price">
                                <span>${item.productPrice}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                        {wishlist.includes(item.id) ? (
                          <div className="to-wishlist">
                            <Tooltip
                              title="Remove from wishlist"
                              arrow
                              placement="top"
                              slotProps={{
                                popper: {
                                  modifiers: [
                                    {
                                      name: "offset",
                                      options: {
                                        offset: [0, -20],
                                      },
                                    },
                                  ],
                                },
                              }}
                            >
                              <button
                                className="add-to-wishlist"
                                onClick={() => removeFromWishlist(item.id)}
                              >
                                <div className="wishlist-circle">
                                  {loading[item?.id] ? (
                                    <CircularProgress
                                      size={10}
                                      sx={{ color: "white" }}
                                    />
                                  ) : (
                                    <img src={checked} alt="" />
                                  )}
                                </div>
                              </button>
                            </Tooltip>
                          </div>
                        ) : id ? (
                          <div className="to-wishlist">
                            <Tooltip
                              title="Add to wishlist"
                              arrow
                              placement="top"
                              slotProps={{
                                popper: {
                                  modifiers: [
                                    {
                                      name: "offset",
                                      options: {
                                        offset: [0, -20],
                                      },
                                    },
                                  ],
                                },
                              }}
                            >
                              <div className="to-wishlist">
                                <button
                                  className="add-to-wishlist"
                                  onClick={() => addToWishlist(item.id)}
                                >
                                  <div className="wishlist-circle">
                                    {loading[item?.id] ? (
                                      <CircularProgress
                                        size={10}
                                        sx={{ color: "white" }}
                                      />
                                    ) : (
                                      <div className="plus-item"></div>
                                    )}
                                  </div>
                                </button>
                              </div>
                            </Tooltip>
                          </div>
                        ) : (
                          <div className="to-wishlist">
                            <Tooltip
                              title="Add to wishlist"
                              arrow
                              placement="top"
                              slotProps={{
                                popper: {
                                  modifiers: [
                                    {
                                      name: "offset",
                                      options: {
                                        offset: [0, -20],
                                      },
                                    },
                                  ],
                                },
                              }}
                            >
                              <Link className="add-to-wishlist" to="/login">
                                <div className="to-wishlist">
                                  <button className="add-to-wishlist">
                                    <div className="wishlist-circle">
                                      <div className="plus-item"></div>
                                    </div>
                                  </button>
                                </div>
                              </Link>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>
          <section id="discover-page-list">
            <div className="container-main">
              <div className="row d-none d-md-flex">
                <div
                  className="col-4"
                  style={{ borderRight: "1px solid #ffffff1a" }}
                >
                  <ul>
                    <div className="list-title">
                      <h2>Top Sellers</h2>
                    </div>
                    {topSellers?.map((item, index) => {
                      const mainImage = item.productImages.filter(
                        (image) => image.isMain
                      )[0];
                      return (
                        <li key={index}>
                          <div className="item">
                            <Link to={`/p/${item.id}`}>
                              <div className="left-side">
                                <img
                                  src={`${baseURL}${
                                    mainImage ? mainImage.imageName : ""
                                  }`}
                                  alt=""
                                />
                              </div>
                              <div className="right-side">
                                <p>{item.productName}</p>
                                <span>${item.productPrice}</span>
                              </div>
                            </Link>
                            {wishlist.includes(item.id) ? (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Remove from wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <button
                                    className="add-to-wishlist"
                                    onClick={() => removeFromWishlist(item.id)}
                                  >
                                    <div className="wishlist-circle">
                                      {loading[item?.id] ? (
                                        <CircularProgress
                                          size={10}
                                          sx={{ color: "white" }}
                                        />
                                      ) : (
                                        <img src={checked} alt="" />
                                      )}
                                    </div>
                                  </button>
                                </Tooltip>
                              </div>
                            ) : id ? (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Add to wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <div className="to-wishlist">
                                    <button
                                      className="add-to-wishlist"
                                      onClick={() => addToWishlist(item.id)}
                                    >
                                      <div className="wishlist-circle">
                                        {loading[item?.id] ? (
                                          <CircularProgress
                                            size={10}
                                            sx={{ color: "white" }}
                                          />
                                        ) : (
                                          <div className="plus-item"></div>
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                </Tooltip>
                              </div>
                            ) : (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Add to wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <Link className="add-to-wishlist" to="/login">
                                    <div className="to-wishlist">
                                      <button className="add-to-wishlist">
                                        <div className="wishlist-circle">
                                          <div className="plus-item"></div>
                                        </div>
                                      </button>
                                    </div>
                                  </Link>
                                </Tooltip>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div
                  className="col-4"
                  style={{ borderRight: "1px solid #ffffff1a" }}
                >
                  <ul>
                    <div className="list-title">
                      <h2>Trending Games</h2>
                    </div>
                    {trending?.map((item, index) => {
                      const mainImage = item.productImages.filter(
                        (image) => image.isMain
                      )[0];
                      return (
                        <li key={index}>
                          <div className="item">
                            <Link to={`/p/${item.id}`}>
                              <div className="left-side">
                                <img
                                  src={`${baseURL}${
                                    mainImage ? mainImage.imageName : ""
                                  }`}
                                  alt=""
                                />
                              </div>
                              <div className="right-side">
                                <p>{item.productName}</p>
                                <span>${item.productPrice}</span>
                              </div>
                            </Link>
                            {wishlist.includes(item.id) ? (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Remove from wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <button
                                    className="add-to-wishlist"
                                    onClick={() => removeFromWishlist(item.id)}
                                  >
                                    <div className="wishlist-circle">
                                      {loading[item?.id] ? (
                                        <CircularProgress
                                          size={10}
                                          sx={{ color: "white" }}
                                        />
                                      ) : (
                                        <img src={checked} alt="" />
                                      )}
                                    </div>
                                  </button>
                                </Tooltip>
                              </div>
                            ) : id ? (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Add to wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <div className="to-wishlist">
                                    <button
                                      className="add-to-wishlist"
                                      onClick={() => addToWishlist(item.id)}
                                    >
                                      <div className="wishlist-circle">
                                        {loading[item?.id] ? (
                                          <CircularProgress
                                            size={10}
                                            sx={{ color: "white" }}
                                          />
                                        ) : (
                                          <div className="plus-item"></div>
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                </Tooltip>
                              </div>
                            ) : (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Add to wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <Link className="add-to-wishlist" to="/login">
                                    <div className="to-wishlist">
                                      <button className="add-to-wishlist">
                                        <div className="wishlist-circle">
                                          <div className="plus-item"></div>
                                        </div>
                                      </button>
                                    </div>
                                  </Link>
                                </Tooltip>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="col-4">
                  <ul>
                    <div className="list-title">
                      <h2>Editor`s Choices</h2>
                    </div>
                    {editors?.map((item, index) => {
                      const mainImage = item.productImages.filter(
                        (image) => image.isMain
                      )[0];
                      return (
                        <li key={index}>
                          <div className="item">
                            <Link to={`/p/${item.id}`}>
                              <div className="left-side">
                                <img
                                  src={`${baseURL}${
                                    mainImage ? mainImage.imageName : ""
                                  }`}
                                  alt=""
                                />
                              </div>
                              <div className="right-side">
                                <p>{item.productName}</p>
                                <span>${item.productPrice}</span>
                              </div>
                            </Link>
                            {wishlist.includes(item.id) ? (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Remove from wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <button
                                    className="add-to-wishlist"
                                    onClick={() => removeFromWishlist(item.id)}
                                  >
                                    <div className="wishlist-circle">
                                      {loading[item?.id] ? (
                                        <CircularProgress
                                          size={10}
                                          sx={{ color: "white" }}
                                        />
                                      ) : (
                                        <img src={checked} alt="" />
                                      )}
                                    </div>
                                  </button>
                                </Tooltip>
                              </div>
                            ) : id ? (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Add to wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <div className="to-wishlist">
                                    <button
                                      className="add-to-wishlist"
                                      onClick={() => addToWishlist(item.id)}
                                    >
                                      <div className="wishlist-circle">
                                        {loading[item?.id] ? (
                                          <CircularProgress
                                            size={10}
                                            sx={{ color: "white" }}
                                          />
                                        ) : (
                                          <div className="plus-item"></div>
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                </Tooltip>
                              </div>
                            ) : (
                              <div className="to-wishlist">
                                <Tooltip
                                  title="Add to wishlist"
                                  arrow
                                  placement="top"
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: "offset",
                                          options: {
                                            offset: [0, -20],
                                          },
                                        },
                                      ],
                                    },
                                  }}
                                >
                                  <Link className="add-to-wishlist" to="/login">
                                    <div className="to-wishlist">
                                      <button className="add-to-wishlist">
                                        <div className="wishlist-circle">
                                          <div className="plus-item"></div>
                                        </div>
                                      </button>
                                    </div>
                                  </Link>
                                </Tooltip>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="row d-flex d-md-none">
                <Swiper
                  slidesPerView={6}
                  spaceBetween={32}
                  className="mySwiper"
                  breakpoints={{
                    320: {
                      slidesPerView: 1.5,
                      spaceBetween: 20,
                    },
                  }}
                >
                  <SwiperSlide>
                    <ul>
                      <div className="list-title">
                        <h2>Top Sellers</h2>
                      </div>
                      {topSellers?.map((item, index) => {
                        const mainImage = item.productImages.filter(
                          (image) => image.isMain
                        )[0];
                        return (
                          <li key={index}>
                            <div className="item">
                              <Link>
                                <div className="left-side">
                                  <img
                                    src={`${baseURL}${
                                      mainImage ? mainImage.imageName : ""
                                    }`}
                                    alt=""
                                  />
                                </div>
                                <div className="right-side">
                                  <p>{item.productName}</p>
                                  <span>${item.productPrice}</span>
                                </div>
                              </Link>
                              {wishlist.includes(item.id) ? (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Remove from wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <button
                                      className="add-to-wishlist"
                                      onClick={() =>
                                        removeFromWishlist(item.id)
                                      }
                                    >
                                      <div className="wishlist-circle">
                                        {loading[item?.id] ? (
                                          <CircularProgress
                                            size={10}
                                            sx={{ color: "white" }}
                                          />
                                        ) : (
                                          <img src={checked} alt="" />
                                        )}
                                      </div>
                                    </button>
                                  </Tooltip>
                                </div>
                              ) : id ? (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Add to wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <div className="to-wishlist">
                                      <button
                                        className="add-to-wishlist"
                                        onClick={() => addToWishlist(item.id)}
                                      >
                                        <div className="wishlist-circle">
                                          {loading[item?.id] ? (
                                            <CircularProgress
                                              size={10}
                                              sx={{ color: "white" }}
                                            />
                                          ) : (
                                            <div className="plus-item"></div>
                                          )}
                                        </div>
                                      </button>
                                    </div>
                                  </Tooltip>
                                </div>
                              ) : (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Add to wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <Link
                                      className="add-to-wishlist"
                                      to="/login"
                                    >
                                      <div className="to-wishlist">
                                        <button className="add-to-wishlist">
                                          <div className="wishlist-circle">
                                            <div className="plus-item"></div>
                                          </div>
                                        </button>
                                      </div>
                                    </Link>
                                  </Tooltip>
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <div className="list-title">
                        <h2>Trending Games</h2>
                      </div>
                      {trending?.map((item, index) => {
                        const mainImage = item.productImages.filter(
                          (image) => image.isMain
                        )[0];
                        return (
                          <li key={index}>
                            <div className="item">
                              <Link to={`/p/${item.id}`}>
                                <div className="left-side">
                                  <img
                                    src={`${baseURL}${
                                      mainImage ? mainImage.imageName : ""
                                    }`}
                                    alt=""
                                  />
                                </div>
                                <div className="right-side">
                                  <p>{item.productName}</p>
                                  <span>${item.productPrice}</span>
                                </div>
                              </Link>
                              {wishlist.includes(item.id) ? (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Remove from wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <button
                                      className="add-to-wishlist"
                                      onClick={() =>
                                        removeFromWishlist(item.id)
                                      }
                                    >
                                      <div className="wishlist-circle">
                                        {loading[item?.id] ? (
                                          <CircularProgress
                                            size={10}
                                            sx={{ color: "white" }}
                                          />
                                        ) : (
                                          <img src={checked} alt="" />
                                        )}
                                      </div>
                                    </button>
                                  </Tooltip>
                                </div>
                              ) : id ? (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Add to wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <div className="to-wishlist">
                                      <button
                                        className="add-to-wishlist"
                                        onClick={() => addToWishlist(item.id)}
                                      >
                                        <div className="wishlist-circle">
                                          {loading[item?.id] ? (
                                            <CircularProgress
                                              size={10}
                                              sx={{ color: "white" }}
                                            />
                                          ) : (
                                            <div className="plus-item"></div>
                                          )}
                                        </div>
                                      </button>
                                    </div>
                                  </Tooltip>
                                </div>
                              ) : (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Add to wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <Link
                                      className="add-to-wishlist"
                                      to="/login"
                                    >
                                      <div className="to-wishlist">
                                        <button className="add-to-wishlist">
                                          <div className="wishlist-circle">
                                            <div className="plus-item"></div>
                                          </div>
                                        </button>
                                      </div>
                                    </Link>
                                  </Tooltip>
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <div className="list-title">
                        <h2>Editor`s Choice</h2>
                      </div>
                      {editors?.map((item, index) => {
                        const mainImage = item.productImages.filter(
                          (image) => image.isMain
                        )[0];
                        return (
                          <li key={index}>
                            <div className="item">
                              <Link to={`/p/${item.id}`}>
                                <div className="left-side">
                                  <img
                                    src={`${baseURL}${
                                      mainImage ? mainImage.imageName : ""
                                    }`}
                                    alt=""
                                  />
                                </div>
                                <div className="right-side">
                                  <p>{item.productName}</p>
                                  <span>${item.productPrice}</span>
                                </div>
                              </Link>
                              {wishlist.includes(item.id) ? (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Remove from wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <button
                                      className="add-to-wishlist"
                                      onClick={() =>
                                        removeFromWishlist(item.id)
                                      }
                                    >
                                      <div className="wishlist-circle">
                                        {loading[item?.id] ? (
                                          <CircularProgress
                                            size={10}
                                            sx={{ color: "white" }}
                                          />
                                        ) : (
                                          <img src={checked} alt="" />
                                        )}
                                      </div>
                                    </button>
                                  </Tooltip>
                                </div>
                              ) : id ? (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Add to wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <div className="to-wishlist">
                                      <button
                                        className="add-to-wishlist"
                                        onClick={() => addToWishlist(item.id)}
                                      >
                                        <div className="wishlist-circle">
                                          {loading[item?.id] ? (
                                            <CircularProgress
                                              size={10}
                                              sx={{ color: "white" }}
                                            />
                                          ) : (
                                            <div className="plus-item"></div>
                                          )}
                                        </div>
                                      </button>
                                    </div>
                                  </Tooltip>
                                </div>
                              ) : (
                                <div className="to-wishlist">
                                  <Tooltip
                                    title="Add to wishlist"
                                    arrow
                                    placement="top"
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          {
                                            name: "offset",
                                            options: {
                                              offset: [0, -20],
                                            },
                                          },
                                        ],
                                      },
                                    }}
                                  >
                                    <Link
                                      className="add-to-wishlist"
                                      to="/login"
                                    >
                                      <div className="to-wishlist">
                                        <button className="add-to-wishlist">
                                          <div className="wishlist-circle">
                                            <div className="plus-item"></div>
                                          </div>
                                        </button>
                                      </div>
                                    </Link>
                                  </Tooltip>
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </section>
          <section id="discover-banner">
            <div className="container-main">
              <div className="row">
                {latestNews?.map((item, index) => {
                  const mainImage = item.newsImages?.filter(
                    (image) => image.isMain
                  )[0];
                  return (
                    <div className="col-md-6 col-12" key={index}>
                      <div className="banner-item">
                        <div className="banner-image">
                          <Link to={`/news/${item.id}`}>
                            <img
                              src={`${baseURL}${
                                mainImage ? mainImage.image : ""
                              }`}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="banner-desc">
                          <div className="banner-name">
                            <Link to={`/news/${item.id}`}>
                              {item.newsTitle}
                            </Link>
                          </div>
                          <p>{item.newsContent1}</p>
                          <div className="price">
                            <Link to={`/news/${item.id}`}>Read more</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section id="discover-ad">
            <div className="container-main">
              <div className="row">
                {ads.map((data, index) => {
                  return (
                    <div className="col-12 col-md-4" key={index}>
                      <div className="ad-item">
                        <div className="ad-image">
                          <Link to="/shop">
                            <img src={`${baseURL}${data.adImage}`} alt="" />
                          </Link>
                        </div>
                        <div className="ad-desc">
                          <div className="ad-name">
                            <Link to="/shop">{data.adTitle}</Link>
                          </div>
                          <p>{data.adDescription}</p>
                          <div className="browse-btn">
                            <Link to="/shop">Browse</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
export default Home;
