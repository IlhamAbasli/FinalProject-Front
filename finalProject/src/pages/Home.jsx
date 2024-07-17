import React, { useState, useEffect, useRef } from "react";
import "../assets/scss/Home.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import game1 from "../assets/images/game1.avif";
import game2 from "../assets/images/game2.avif";
import gameLogo from "../assets/images/zenless-logo.png";
import thumb1 from "../assets/images/game1thumbimage.avif";
import crosshair from "../assets/images/crosshair.avif";
import banner from "../assets/images/bannerImg.avif";
import gta from "../assets/images/gtav.avif";
import ad1 from "../assets/images/ad1.avif";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import "swiper/css";
import "swiper/css/pagination";
function Home() {
  const [itemId, setItemId] = useState(1);
  const elements = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    const interval = setInterval(() => {
      setItemId((prev) => (prev < elements.length ? prev + 1 : 1));
    }, 7000);

    return () => clearInterval(interval);
  }, [elements.length]);
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
  return (
    <>
      <section id="slider">
        <div className="container-main">
          <div className="row">
            <div className="col-md-9 d-none d-md-block">
              {elements.map((id, index) => {
                return (
                  <div
                    className={`carousel ${
                      id === itemId ? "d-block" : "d-none"
                    }`}
                    id={id}
                    key={index}
                  >
                    <div className="carousel-main-item">
                      <Link href="" className="image-link">
                        <div className="slider-image">
                          <img src={game2} alt="" />
                        </div>
                        <div className="image-shadow"></div>
                      </Link>
                      <div className="game-detail">
                        <div className="game-description">
                          <div
                            className="game-logo"
                            style={{ backgroundImage: `url(${gameLogo})` }}
                          ></div>
                          <div className="about-game">
                            <span>AVAILABLE{id}</span>
                            <p>
                              Welcome to New Eridu — Where Humanity Rises Anew!
                              HoYoverse's urban fantasy ARPG has released!
                            </p>
                          </div>
                        </div>
                        <div className="game-operations">
                          <div className="price">
                            <p>Free</p>
                          </div>
                          <div className="buy-wishlist">
                            <Link>PLAY FREE NOW</Link>
                            <button>
                              <div className="wishlist-button">
                                <div className="spinner"></div>
                              </div>
                              <span>ADD TO WISHLIST</span>
                            </button>
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
                  {elements.map((id, index) => {
                    return (
                      <li key={index}>
                        <Link onClick={(e) => handleClick(e, id)}>
                          <div
                            id={id}
                            className={`mini-item-thumb ${
                              id === itemId && "active-thumb"
                            }`}
                          >
                            <div className="item-image">
                              <img src={thumb1} alt="" />
                            </div>
                            <div className="game-name">
                              <span>Zenless Zone Zero</span>
                            </div>
                            {id == itemId && (
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
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card">
                <Link>
                  <div className="card-body">
                    <div className="card-image">
                      <img src={crosshair} alt="" />
                    </div>
                    <div className="card-desc">
                      <span className="game-type">BASE GAME</span>
                      <p className="name">Crosshair X</p>
                      <div className="price">
                        <span>$3.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="to-wishlist">
                  <button className="add-to-wishlist">
                    <div className="wishlist-circle">
                      <div className="plus-item"></div>
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
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
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="col-4"
              style={{ borderRight: "1px solid #ffffff1a" }}
            >
              <ul>
                <div className="list-title">
                  <h2>Top Sellers</h2>
                </div>
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-4">
              <ul>
                <div className="list-title">
                  <h2>Top Sellers</h2>
                </div>
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>{" "}
                <li>
                  <div className="item">
                    <Link>
                      <div className="left-side">
                        <img src={gta} alt="" />
                        <div className="to-wishlist">
                          <button className="add-to-wishlist">
                            <div className="wishlist-circle">
                              <div className="plus-item"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="right-side">
                        <p>Grand Theft Auto V: Premium Edition</p>
                        <span>$24.99</span>
                      </div>
                    </Link>
                  </div>
                </li>
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
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul>
                  <div className="list-title">
                    <h2>Top Sellers</h2>
                  </div>
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul>
                  <div className="list-title">
                    <h2>Top Sellers</h2>
                  </div>
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>{" "}
                  <li>
                    <div className="item">
                      <Link>
                        <div className="left-side">
                          <img src={gta} alt="" />
                          <div className="to-wishlist">
                            <button className="add-to-wishlist">
                              <div className="wishlist-circle">
                                <div className="plus-item"></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="right-side">
                          <p>Grand Theft Auto V: Premium Edition</p>
                          <span>$24.99</span>
                        </div>
                      </Link>
                    </div>
                  </li>
                </ul>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section id="discover-banner">
        <div className="container-main">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="banner-item">
                <div className="banner-image">
                  <Link>
                    <img src={banner} alt="" />
                  </Link>
                  <div className="to-wishlist">
                    <button className="add-to-wishlist">
                      <div className="wishlist-circle">
                        <div className="plus-item"></div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="banner-desc">
                  <div className="banner-name">
                    <Link>Planet Coaster 2</Link>
                  </div>
                  <p>
                    From towering rollercoasters to twisting water slides, build
                    a coaster and waterpark paradise in Planet Coaster 2!
                  </p>
                  <div className="price">
                    <Link>Wishlist Now</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="banner-item">
                <div className="banner-image">
                  <Link>
                    <img src={banner} alt="" />
                  </Link>
                  <div className="to-wishlist">
                    <button className="add-to-wishlist">
                      <div className="wishlist-circle">
                        <div className="plus-item"></div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="banner-desc">
                  <div className="banner-name">
                    <Link>Planet Coaster 2</Link>
                  </div>
                  <p>
                    From towering rollercoasters to twisting water slides, build
                    a coaster and waterpark paradise in Planet Coaster 2!
                  </p>
                  <div className="price">
                    <Link>Wishlist Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="discover-ad">
        <div className="container-main">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="ad-item">
                <div className="ad-image">
                  <Link>
                    <img src={ad1} alt="" />
                  </Link>
                </div>
                <div className="ad-desc">
                  <div className="ad-name">
                    <Link>Sales & Specials</Link>
                  </div>
                  <p>
                    Save big on hit titles and hidden gems. There's always
                    something on sale at the Epic Games Store!
                  </p>
                  <div className="browse-btn">
                    <Link>Browse</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="ad-item">
                <div className="ad-image">
                  <Link>
                    <img src={ad1} alt="" />
                  </Link>
                </div>
                <div className="ad-desc">
                  <div className="ad-name">
                    <Link>Sales & Specials</Link>
                  </div>
                  <p>
                    Save big on hit titles and hidden gems. There's always
                    something on sale at the Epic Games Store!
                  </p>
                  <div className="browse-btn">
                    <Link>Browse</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="ad-item">
                <div className="ad-image">
                  <Link>
                    <img src={ad1} alt="" />
                  </Link>
                </div>
                <div className="ad-desc">
                  <div className="ad-name">
                    <Link>Sales & Specials</Link>
                  </div>
                  <p>
                    Save big on hit titles and hidden gems. There's always
                    something on sale at the Epic Games Store!
                  </p>
                  <div className="browse-btn">
                    <Link>Browse</Link>
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
export default Home;
