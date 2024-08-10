import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../../assets/scss/Loading.scss";
function Loading() {
  return (
    <div>
      <section id="loading">
        <div className="loading-area">
          <CircularProgress />
        </div>
      </section>
    </div>
  );
}

export default Loading;
