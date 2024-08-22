import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function NewsAdminDetail() {
  const [news, setNews] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    document.title = "News detail";
  }, []);
  console.log(id);

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/News/GetById/${id}`
        );
        setNews(response.data);
        console.log(response.data);
      } catch (error) {
        navigate("/notfound");
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  return (
    <div>
      <section id="admin-area" style={{ background: "white" }}>
        <div className="admin-container">
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10 mt-5">
              <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4 mx-3">News</h5>
                    {news ? (
                      <div className="table-responsive mt-3">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead v="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">News title</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  News content 1
                                </h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  News content 2
                                </h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  News content 3
                                </h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  News images
                                </h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {news.newsTitle}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {news.newsContent1}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {news.newsContent2}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {news.newsContent3}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                {news.newsImages &&
                                  news.newsImages.map((image, index) => (
                                    <h6
                                      className="fw-semibold mb-1"
                                      key={index}
                                    >
                                      <img
                                        src={`${baseURL}${image.image}`}
                                        alt=""
                                        style={{
                                          width: 300,
                                          height: 200,
                                          objectFit: "contain",
                                          border: image.isMain
                                            ? "3px double green"
                                            : undefined,
                                        }}
                                      />
                                    </h6>
                                  ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div class="alert alert-danger" role="alert">
                        News not found
                      </div>
                    )}
                    <Link className="btn btn-danger mt-5" to="/admin/news">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsAdminDetail;
