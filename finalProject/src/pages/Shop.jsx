import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import search from "../assets/icons/search.svg";
import checked from "../assets/icons/checked.svg";
import Pagination from "@mui/material/Pagination";
import "../assets/scss/Shop.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";

function Shop() {
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("New Release");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState({});
  const [productLoading, setProductLoading] = useState(false);

  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

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
  }, []);

  useEffect(() => {
    if (id) {
      fetchWishlist();
    }
  }, [id]);

  useEffect(() => {
    document.title =
      "Epic Games Store | Download & Play PC Games, Mods, DLC & More – Epic Games";

    fetchTypes();
    fetchGenres();
    fetchPlatforms();
    fetchGames();
  }, [currentPage]);

  const fetchWishlist = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `https://localhost:44300/api/Wishlist/GetUserWishlistIds?userId=${id}`
        );
        setWishlist(response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44300/api/Genre/GetAll"
      );
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44300/api/Type/GetAll"
      );
      setTypes(response.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44300/api/Platform/GetAll"
      );
      setPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching platforms:", error);
    }
  };

  const fetchGames = async () => {
    setProductLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:44300/api/Product/GetAllPaginated?sortType=${selectedOption}&searchText=${searchText}&page=${currentPage}`
      );
      setGames(response.data);
      setPageCount(response.data.pageCount);
      setProductLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [selectedOption]);

  useEffect(() => {
    fetchGames();
  }, [searchText]);

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

  const baseURL = "https://localhost:44300/assets/images/";

  const swiperRef = useRef(null);

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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
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
            {genres.map((genre, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="genre-item">
                    <Link>
                      <div className="item">
                        {genre.products
                          .slice(0, 3)
                          .flatMap((product) =>
                            product.productImages.filter(
                              (image) => image.isMain
                            )
                          )
                          .map((image, idx) => (
                            <div className="genre-image" key={idx}>
                              <img
                                src={`${baseURL}${image.imageName}`}
                                alt="Genre"
                              />
                            </div>
                          ))}
                        {/* 
                        <div className="genre-image">
                          <img src={genreImg} alt="" />
                        </div>
                        <div className="genre-image">
                          <img src={genreImg} alt="" />
                        </div> */}
                      </div>
                      <div className="genre-name">
                        <h2>{genre.genreName} Games</h2>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      <section id="games-area">
        <div className="container-main">
          <div className="row">
            <div className="col-12 col-lg-8 col-xl-9">
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
              {productLoading ? (
                <div
                  className="loading"
                  style={{
                    width: "100%",
                    height: "1088px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <div className="row">
                    {games.products?.map((game, index) => {
                      const mainImage = game.productImages.filter(
                        (image) => image.isMain
                      )[0];
                      return (
                        <div className="col-6 col-md-3" key={index}>
                          <div className="offer-card">
                            <Link to={`/p/${game.id}`}>
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
                                    {game.productType.typeName}
                                  </span>
                                  <p className="name">{game.productName}</p>
                                  <div className="price">
                                    <span>${game.productPrice}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            {wishlist.includes(game.id) ? (
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
                                    onClick={() => removeFromWishlist(game.id)}
                                  >
                                    <div className="wishlist-circle">
                                      {loading[game?.id] ? (
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
                                  <button
                                    className="add-to-wishlist"
                                    onClick={() => addToWishlist(game.id)}
                                  >
                                    <div className="wishlist-circle">
                                      {loading[game?.id] ? (
                                        <CircularProgress
                                          size={10}
                                          sx={{ color: "white" }}
                                        />
                                      ) : (
                                        <div className="plus-item"></div>
                                      )}
                                    </div>
                                  </button>
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
                                    <div className="wishlist-circle">
                                      <div className="plus-item"></div>
                                    </div>
                                  </Link>
                                </Tooltip>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {pageCount > 1 ? (
                    <div className="col-12 d-flex justify-content-center">
                      <div className="pagination">
                        <Pagination
                          count={pageCount}
                          page={currentPage}
                          onChange={handlePageChange}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            <div className="col-12 col-lg-4 col-xl-3">
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
                        <input
                          type="text"
                          placeholder="Keywords"
                          onKeyUp={handleSearch}
                        />
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
                            {genres.map((item) =>
                              renderFilterItem("genre", item.genreName)
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
                            {types.map((item) =>
                              renderFilterItem("types", item.typeName)
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
                            {platforms.map((item) =>
                              renderFilterItem("platform", item.platformName)
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
