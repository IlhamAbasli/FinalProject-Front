import React, { useEffect } from "react";
import "../assets/scss/News.scss";
import summersale from "../assets/images/summer-sale.avif";
import article from "../assets/images/article.avif";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

function News() {
  useEffect(() => {
    document.title =
      "Epic Games Store News | The Latest Blog Articles About PC Gaming - Epic Games Store";
  });
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
                <li className="list-item">
                  <div className="row">
                    <div className="col-12 col-md-4 col-lg-4 col-xl-2">
                      <div className="article-image">
                        <Link>
                          <img src={article} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-8 col-xl-10">
                      <div className="article-details">
                        <div className="article-date">
                          <p>7h ago</p>
                        </div>
                        <div className="article-title">
                          <Link>
                            JDM: Rise of the Scorpion pulls from manga-fueled
                            street racing
                          </Link>
                        </div>
                        <div className="article-desc">
                          <p>
                            We talk to the developers about the manga
                            inspirations behind its open-world street racer
                            Japanese Drift Master and the upcoming free prologue
                            JDM: Rise of the Scorpion.
                          </p>
                        </div>
                        <div className="read-more">
                          <Link>Read More</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <div className="pagination">
                        <Pagination count={10} />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
