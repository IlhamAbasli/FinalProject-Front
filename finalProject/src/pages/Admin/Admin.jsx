import React, { useEffect } from "react";
import Sidebar from "../Admin/components/layout/Sidebar";
import "./assets/css/styles.min.css";
import "./assets/scss/Admin.scss";
import icon from "../../assets/icons/icon.svg";

function Admin() {
  useEffect(() => {
    document.title = "Admin";
  }, []);
  return (
    <div>
      <section id="admin-area" style={{ background: "white" }}>
        <div className="admin-container">
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10 d-flex justify-content-center align-items-center mt-5 flex-column">
              <img
                src={icon}
                alt=""
                style={{ width: "500px", height: "500px" }}
              />
              <h1 className="mt-5" style={{ fontSize: "70px" }}>
                Welcome to Control Panel
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;
