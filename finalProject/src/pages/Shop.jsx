import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import crosshair from "../assets/images/crosshair.avif";
import genreImg from "../assets/images/genre-img.avif";
import search from "../assets/icons/search.svg";
import checked from "../assets/icons/checked.svg";
import "../assets/scss/Shop.scss";

function Shop() {
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("New Release");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  const resetFilters = () => {
    setIsFilterDropdownOpen(false);
    setIsChecked(false);
  };
  return (
    <>
      <section id="genres-carousel">
        <div className="container-main">
          <div className="genre-title">
            <p>Popular Genres</p>
            <div className="slider-controller">
              <div className="prev-button">
                <button className="prev-btn bttn" onClick={handlePrev}>
                  <img src={chevronDownIcon} alt="" />
                </button>
              </div>
              <div className="next-button">
                <button className="next-btn bttn" onClick={handleNext}>
                  <img src={chevronDownIcon} alt="" />
                </button>
              </div>
            </div>
          </div>
          <Swiper
            loop={true}
            slidesPerView={5}
            spaceBetween={20}
            ref={swiperRef}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1920: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide>
              <div className="genre-item">
                <Link>
                  <div className="item">
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                  </div>
                  <div className="genre-name">
                    <h2>Action Games</h2>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="genre-item">
                <Link>
                  <div className="item">
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                  </div>
                  <div className="genre-name">
                    <h2>Action Games</h2>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="genre-item">
                <Link>
                  <div className="item">
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                  </div>
                  <div className="genre-name">
                    <h2>Action Games</h2>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="genre-item">
                <Link>
                  <div className="item">
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                  </div>
                  <div className="genre-name">
                    <h2>Action Games</h2>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="genre-item">
                <Link>
                  <div className="item">
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                  </div>
                  <div className="genre-name">
                    <h2>Action Games</h2>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="genre-item">
                <Link>
                  <div className="item">
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                  </div>
                  <div className="genre-name">
                    <h2>Action Games</h2>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="genre-item">
                <Link>
                  <div className="item">
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                  </div>
                  <div className="genre-name">
                    <h2>Action Games</h2>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="genre-item">
                <Link>
                  <div className="item">
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                    <div className="genre-image">
                      <img src={genreImg} alt="" />
                    </div>
                  </div>
                  <div className="genre-name">
                    <h2>Action Games</h2>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section id="games-area">
        <div className="container-main">
          <div className="row">
            <div className="col-12 col-md-10">
              <div className="sort-area">
                <span className="text">Show:</span>
                <div className="sort-dropdown">
                  <button className="toggle-dropdown" onClick={toggleDropdown}>
                    <span>{selectedOption}</span>
                    <span
                      className={`chevron ${isDropdownOpen ? "rotate" : ""}`}
                    >
                      <img src={chevronDownIcon} alt="Chevron Down" />
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="sort-menu">
                      <ul>
                        <li>
                          <button
                            onClick={() => handleOptionClick("New Release")}
                          >
                            New Release
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handleOptionClick("All")}>
                            All
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("Price: High to Low")
                            }
                          >
                            Price: High to Low
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("Price: Low to High")
                            }
                          >
                            Price: Low to High
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col">
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
                </div>
                <div className="col">
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
                </div>
                <div className="col">
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
                </div>
                <div className="col">
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
                </div>
                <div className="col">
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
                </div>
              </div>
            </div>
            <div className="col-12 col-md-2">
              <div className="filter-area">
                <div className="row">
                  <div className="col-12">
                    <div className="filter-title">
                      <span>Filters</span>
                      <button
                        className={`reset-filters ${isChecked ? "" : "d-none"}`}
                        onClick={resetFilters}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="filter-search">
                      <img src={search} alt="Search" />
                      <form action="">
                        <input type="text" placeholder="Keywords" />
                      </form>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="filter">
                      <button onClick={toggleFilterDropdown}>
                        Price
                        <img
                          src={chevronDownIcon}
                          alt="Chevron Down"
                          className={isFilterDropdownOpen ? "rotate" : ""}
                        />
                      </button>
                      {isFilterDropdownOpen && (
                        <div className="filter-dropdown">
                          <ul>
                            <li>
                              <button onClick={toggleChecked}>
                                Free{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $5.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $10.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $20.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $30.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                $14.00 and above{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="filter">
                      <button onClick={toggleFilterDropdown}>
                        Genre
                        <img
                          src={chevronDownIcon}
                          alt="Chevron Down"
                          className={isFilterDropdownOpen ? "rotate" : ""}
                        />
                      </button>
                      {isFilterDropdownOpen && (
                        <div className="filter-dropdown">
                          <ul>
                            <li>
                              <button onClick={toggleChecked}>
                                Free{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $5.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $10.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $20.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $30.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                $14.00 and above{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="filter">
                      <button onClick={toggleFilterDropdown}>
                        Types
                        <img
                          src={chevronDownIcon}
                          alt="Chevron Down"
                          className={isFilterDropdownOpen ? "rotate" : ""}
                        />
                      </button>
                      {isFilterDropdownOpen && (
                        <div className="filter-dropdown">
                          <ul>
                            <li>
                              <button onClick={toggleChecked}>
                                Free{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $5.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $10.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $20.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $30.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                $14.00 and above{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="filter">
                      <button onClick={toggleFilterDropdown}>
                        Platform
                        <img
                          src={chevronDownIcon}
                          alt="Chevron Down"
                          className={isFilterDropdownOpen ? "rotate" : ""}
                        />
                      </button>
                      {isFilterDropdownOpen && (
                        <div className="filter-dropdown">
                          <ul>
                            <li>
                              <button onClick={toggleChecked}>
                                Free{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $5.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $10.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $20.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                Under $30.00{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                            <li>
                              <button onClick={toggleChecked}>
                                $14.00 and above{" "}
                                <img
                                  src={checked}
                                  alt="Checked"
                                  className={isChecked ? " " : "d-none"}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
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

export default Shop;
