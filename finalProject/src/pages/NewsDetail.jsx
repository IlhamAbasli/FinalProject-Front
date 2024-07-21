import React from "react";
import newsBanner from "../assets/images/news-banner.jpg";
import newsContent from "../assets/images/news-content.jpg";
import "../assets/scss/NewsDetail.scss";
function NewsDetail() {
  return (
    <>
      <section id="news-detail-area">
        <div className="container-main">
          <div className="row">
            <div className="col-12">
              <div className="news-banner-image">
                <img src={newsBanner} alt="" />
              </div>
              <div className="news-content-area">
                <div className="news-main-details">
                  <div className="title">
                    <h1>
                      JDM: Rise of the Scorpion pulls from manga-fueled street
                      racing
                    </h1>
                  </div>
                  <div className="news-date">
                    <span>7.19.2024</span>
                  </div>
                </div>

                <div className="news-main-content">
                  <div className="news-part">
                    <p>
                      JDM: Japanese Drift Master is far more than an homage to
                      anime and manga racing series like Initial D—even if
                      Polish developer Gaming Factory is first to admit this was
                      their starting point for developing an open-world street
                      racer set on the streets of Japan. Ahead of the release of
                      the full game at the end of the year, the team are giving
                      players a taste of what to expect with an original
                      prologue, JDM: Rise of the Scorpion. “In our team, we have
                      people who have been interested in Japan since childhood,”
                      notes Krzysztof Bosko. “The cultural heritage of manga and
                      anime are also an integral part of the culture of this
                      part of the world, so Japanese Drift Master is a kind-of
                      tribute to this not-easy art form.”
                    </p>
                  </div>
                  <div className="news-part-image">
                    <img src={newsContent} alt="" />
                  </div>
                </div>
                <div className="news-main-content">
                  <div className="news-part">
                    <p>
                      JDM: Japanese Drift Master is far more than an homage to
                      anime and manga racing series like Initial D—even if
                      Polish developer Gaming Factory is first to admit this was
                      their starting point for developing an open-world street
                      racer set on the streets of Japan. Ahead of the release of
                      the full game at the end of the year, the team are giving
                      players a taste of what to expect with an original
                      prologue, JDM: Rise of the Scorpion. “In our team, we have
                      people who have been interested in Japan since childhood,”
                      notes Krzysztof Bosko. “The cultural heritage of manga and
                      anime are also an integral part of the culture of this
                      part of the world, so Japanese Drift Master is a kind-of
                      tribute to this not-easy art form.”
                    </p>
                  </div>
                  <div className="news-part-image">
                    <img src={newsContent} alt="" />
                  </div>
                </div>
                <div className="news-main-content">
                  <div className="news-part">
                    <p>
                      JDM: Japanese Drift Master is far more than an homage to
                      anime and manga racing series like Initial D—even if
                      Polish developer Gaming Factory is first to admit this was
                      their starting point for developing an open-world street
                      racer set on the streets of Japan. Ahead of the release of
                      the full game at the end of the year, the team are giving
                      players a taste of what to expect with an original
                      prologue, JDM: Rise of the Scorpion. “In our team, we have
                      people who have been interested in Japan since childhood,”
                      notes Krzysztof Bosko. “The cultural heritage of manga and
                      anime are also an integral part of the culture of this
                      part of the world, so Japanese Drift Master is a kind-of
                      tribute to this not-easy art form.”
                    </p>
                  </div>
                  <div className="news-part-image">
                    <img src={newsContent} alt="" />
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

export default NewsDetail;
