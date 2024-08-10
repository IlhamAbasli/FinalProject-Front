import React, { useEffect, useState } from "react";
import "../assets/scss/News.scss";
import summersale from "../assets/images/summer-sale.avif";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import moment from "moment";

function News() {
  useEffect(() => {
    document.title =
      "Epic Games Store News | The Latest Blog Articles About PC Gaming - Epic Games Store";
  });

  const [news, setNews] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/News/GetAllPaginated?page=${currentPage}`
        );
        setNews(response.data.news);
        setPageCount(response.data.pageCount);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <section id="latest-news">
        <div className="container-main">
          <div className="title">Epic Games News</div>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="news-item">
                <div className="news-image">
                  <Link>
                    <img src={summersale} alt="" />
                  </Link>
                </div>
                <div className="news-desc">
                  <div className="news-date">
                    <span>2d ago</span>
                  </div>
                  <div className="news-name">
                    <Link>
                      Heat up your Epic Games Store library with Summer Sale
                      2024
                    </Link>
                  </div>
                  <p>
                    Maybe it’s finally time to grab that game you’ve been eyeing
                    for months.
                  </p>
                  <div className="read-more">
                    <Link>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="news-item">
                <div className="news-image">
                  <Link>
                    <img src={summersale} alt="" />
                  </Link>
                </div>
                <div className="news-desc">
                  <div className="news-date">
                    <span>2d ago</span>
                  </div>
                  <div className="news-name">
                    <Link>
                      Heat up your Epic Games Store library with Summer Sale
                      2024
                    </Link>
                  </div>
                  <p>
                    Maybe it’s finally time to grab that game you’ve been eyeing
                    for months.
                  </p>
                  <div className="read-more">
                    <Link>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="news-list">
        <div className="container-main">
          <div className="row">
            <div className="col-12">
              <ul>
                {news.map((data, index) => {
                  const mainImage = data.newsImages.filter(
                    (image) => image.isMain
                  )[0];
                  return (
                    <li key={index} className="list-item">
                      <div className="row">
                        <div className="col-12 col-md-4 col-lg-4 col-xl-2">
                          <div className="article-image">
                            <Link to={`/news/${data.id}`}>
                              <img
                                src={`${baseURL}${
                                  mainImage ? mainImage.image : ""
                                }`}
                                alt=""
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-8 col-xl-10">
                          <div className="article-details">
                            <div className="article-date">
                              <p>
                                {moment(data.createdDate).format("MMMM DD")}
                              </p>
                            </div>
                            <div className="article-title">
                              <Link to={`/news/${data.id}`}>
                                {data.newsTitle}
                              </Link>
                            </div>
                            <div className="article-desc">
                              <p>{data.newsContent1}</p>
                            </div>
                            <div className="read-more">
                              <Link to={`/news/${data.id}`}>Read More</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
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
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
