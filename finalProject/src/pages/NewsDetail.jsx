import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "../assets/scss/NewsDetail.scss";

function NewsDetail() {
  const [news, setNews] = useState(null); // Initialize as null
  const { id } = useParams(); // Destructure id from useParams
  console.log(id);

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/News/GetById/${id}`
        );
        setNews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]); // Add id as a dependency

  if (!news) {
    return <div>Loading...</div>; // Display a loading message
  }

  const mainImage = news.newsImages?.find((image) => image.isMain); // Optional chaining
  const images = news.newsImages?.filter((image) => !image.isMain) || [];
  console.log(images);

  return (
    <section id="news-detail-area">
      <div className="container-main">
        <div className="row">
          <div className="col-12">
            <div className="news-banner-image">
              {mainImage && <img src={`${baseURL}${mainImage.image}`} alt="" />}
            </div>
            <div className="news-content-area">
              <div className="news-main-details">
                <div className="title">
                  <h1>{news.newsTitle}</h1>
                </div>
                <div className="news-date">
                  <span>{moment(news.createdDate).format("DD MMMM YYYY")}</span>
                </div>
              </div>
              <div className="news-main-content">
                <div className="news-part">
                  <p>{news.newsContent1}</p>
                </div>
                <div className="news-part-image">
                  {images[0] && (
                    <img src={`${baseURL}${images[0].image}`} alt="" />
                  )}
                </div>
              </div>
              <div className="news-main-content">
                <div className="news-part">
                  <p>{news.newsContent2}</p>
                </div>
                <div className="news-part-image">
                  {images[1] && (
                    <img src={`${baseURL}${images[1].image}`} alt="" />
                  )}
                </div>
              </div>
              <div className="news-main-content">
                <div className="news-part">
                  <p>{news.newsContent3}</p>
                </div>
                <div className="news-part-image">
                  {images[2] && (
                    <img src={`${baseURL}${images[2].image}`} alt="" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsDetail;
