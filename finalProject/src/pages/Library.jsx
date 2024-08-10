import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import crosshair from "../assets/images/crosshair.avif";
import search from "../assets/icons/search.svg";
import checked from "../assets/icons/checked.svg";
import Pagination from "@mui/material/Pagination";
import "../assets/scss/Library.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function Library() {
  const baseURL = "https://localhost:44300/assets/images/";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Recently Purchased");
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [games, setGames] = useState([]);

  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Genre/GetAll"
        );
        setGenres(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Type/GetAll"
        );
        setTypes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Platform/GetAll"
        );
        setPlatforms(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Library/GetAllPaginated?userId=${id}&page=${currentPage}`
        );
        setGames(response.data.libraryProducts);
        setPageCount(response.data.pageCount);
        console.log(response);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchTypes();
    fetchGenres();
    fetchPlatforms();
    fetchGames();
  }, [id, currentPage]);

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
      <section id="games-area">
        <div className="container-main">
          <div className="library-title">
            <h1>Library</h1>
          </div>
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
                            onClick={() =>
                              handleOptionClick("Recently Purchased")
                            }
                          >
                            Recently Purchased
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
                              handleOptionClick("Alphabetical A-Z")
                            }
                          >
                            Alphabetical A-Z
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("Alphabetical Z-A")
                            }
                          >
                            Alphabetical Z-A
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                {games.map((game, index) => {
                  const mainImage = game.product.productImages.filter(
                    (image) => image.isMain
                  )[0];
                  console.log(mainImage.imageName);
                  return (
                    <div className="col-6 col-md-3" key={index}>
                      <div className="offer-card">
                        <Link>
                          <div className="card-body">
                            <div className="card-image">
                              <img
                                src={`${baseURL}${
                                  mainImage ? mainImage.imageName : ""
                                }`}
                                alt=""
                              />
                            </div>
                            <div className="card-desc py-2">
                              <p className="name">{game.product.productName}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}

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
              </div>
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

export default Library;
