import React, { useEffect } from "react";
import icon from "../assets/icons/notfoundicon.svg";
import { Link } from "react-router-dom";
import "../assets/scss/NotFound.scss";
function NotFound() {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);
  return (
    <div>
      <section id="not-found-area">
        <div className="row">
          <div className="col-12">
            <div className="not-found">
              <div className="icon">
                <img src={icon} alt="" />
              </div>
              <div className="title">
                <h1>Uh oh, something went wrong.</h1>
                <p>Please try again.</p>
              </div>
              <div className="back-to-store">
                <Link to="/">Back to store</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
