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

  const [filterDropdownOpen, setFilterDropdownOpen] = useState({});
  const [checkedFilters, setCheckedFilters] = useState({
    price: [],
    genre: [],
    types: [],
    platform: [],
  });

  const toggleFilterDropdown = (filterName) => {
    setFilterDropdownOpen((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleChecked = (filterName, value) => {
    setCheckedFilters((prev) => {
      const currentFilters = prev[filterName];
      const isAlreadyChecked = currentFilters.includes(value);
      const newFilters = isAlreadyChecked
        ? currentFilters.filter((item) => item !== value)
        : [...currentFilters, value];
      return {
        ...prev,
        [filterName]: newFilters,
      };
    });
  };

  const resetFilters = () => {
    setCheckedFilters({
      price: [],
      genre: [],
      types: [],
      platform: [],
    });
  };

  const renderFilterItem = (filterName, value) => (
    <li key={value}>
      <button onClick={() => toggleChecked(filterName, value)}>
        {value}
        <img
          src={checked}
          alt="Checked"
          className={checkedFilters[filterName].includes(value) ? "" : "d-none"}
        />
      </button>
    </li>
  );

  const countSelectedFilters = () => {
    return Object.values(checkedFilters).reduce(
      (acc, filters) => acc + filters.length,
      0
    );
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
                      <span>
                        Filters{" "}
                        {countSelectedFilters() === 0
                          ? ""
                          : `(${countSelectedFilters()})`}
                      </span>
                      <button
                        className={`reset-filters ${
                          Object.values(checkedFilters).some(
                            (arr) => arr.length
                          )
                            ? ""
                            : "d-none"
                        }`}
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
                      <button onClick={() => toggleFilterDropdown("price")}>
                        Price
                        <img
                          src={chevronDownIcon}
                          alt="Chevron Down"
                          className={filterDropdownOpen.price ? "rotate" : ""}
                        />
                      </button>
                      {filterDropdownOpen.price && (
                        <div className="filter-dropdown">
                          <ul>
                            {[
                              "Free",
                              "Under $5.00",
                              "Under $10.00",
                              "Under $20.00",
                              "Under $30.00",
                              "$14.00 and above",
                            ].map((item) => renderFilterItem("price", item))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="filter">
                      <button onClick={() => toggleFilterDropdown("genre")}>
                        Genre
                        <img
                          src={chevronDownIcon}
                          alt="Chevron Down"
                          className={filterDropdownOpen.genre ? "rotate" : ""}
                        />
                      </button>
                      {filterDropdownOpen.genre && (
                        <div className="filter-dropdown">
                          <ul>
                            {["Action", "Casual", "Comedy"].map((item) =>
                              renderFilterItem("genre", item)
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="filter">
                      <button onClick={() => toggleFilterDropdown("types")}>
                        Types
                        <img
                          src={chevronDownIcon}
                          alt="Chevron Down"
                          className={filterDropdownOpen.types ? "rotate" : ""}
                        />
                      </button>
                      {filterDropdownOpen.types && (
                        <div className="filter-dropdown">
                          <ul>
                            {["App", "Game"].map((item) =>
                              renderFilterItem("types", item)
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="filter">
                      <button onClick={() => toggleFilterDropdown("platform")}>
                        Platform
                        <img
                          src={chevronDownIcon}
                          alt="Chevron Down"
                          className={
                            filterDropdownOpen.platform ? "rotate" : ""
                          }
                        />
                      </button>
                      {filterDropdownOpen.platform && (
                        <div className="filter-dropdown">
                          <ul>
                            {["Windows", "Mac OS"].map((item) =>
                              renderFilterItem("platform", item)
                            )}
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
