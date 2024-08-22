import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import search from "../assets/icons/search.svg";
import checked from "../assets/icons/checked.svg";
import Pagination from "@mui/material/Pagination";
import "../assets/scss/Library.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";
import Loading from "../components/layout/Loading";
import icon from "../assets/icons/notfoundicon.svg";

function Library() {
  const baseURL = "https://localhost:44300/assets/images/";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Recently Purchased");
  const [loading, setLoading] = useState(true);

  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [games, setGames] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");

  const [filterDropdownOpen, setFilterDropdownOpen] = useState({});
  const [checkedFilters, setCheckedFilters] = useState({
    genre: [],
    types: [],
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Library";
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
  const fetchGames = async () => {
    setLoading(true);
    try {
      const genreQuery = checkedFilters.genre
        .map((genre) => `genreFilters=${genre}`)
        .join("&");
      const typeQuery = checkedFilters.types
        .map((type) => `typeFilters=${type}`)
        .join("&");

      const queryString = `userId=${id}&sortType=${selectedOption}&searchText=${searchText}&${genreQuery}&${typeQuery}&page=${currentPage}`;

      const response = await axios.get(
        `https://localhost:44300/api/Library/GetAllPaginated?${queryString}`
      );
      setTimeout(() => {
        setGames(response.data.libraryProducts);
        setPageCount(response.data.pageCount);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Genre/GetAll"
        );
        setGenres(response.data);
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
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchTypes();
    fetchGenres();
    fetchGames();
  }, [
    id,
    currentPage,
    selectedOption,
    searchText,
    checkedFilters,
    currentPage,
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const toggleFilterDropdown = (filterName) => {
    setFilterDropdownOpen((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // useEffect(() => {
  //   fetchGames();
  // }, [selectedOption, searchText, checkedFilters, currentPage]);

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
      genre: [],
      types: [],
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
              {loading ? (
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
                  {games.length === 0 ? (
                    <div className="not-found">
                      <h1>No results found</h1>
                      <p>
                        Unfortunately I could not find any results matching your
                        search.
                      </p>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <div className="row">
                        {games.map((game, index) => {
                          const mainImage = game.product.productImages.filter(
                            (image) => image.isMain
                          )[0];
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
                                      <p className="name">
                                        {game.product.productName}
                                      </p>
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
                    </>
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
                      <input
                        type="text"
                        placeholder="Keywords"
                        onKeyUp={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="col-12">
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
