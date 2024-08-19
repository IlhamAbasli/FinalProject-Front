import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("user-info");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        const decoded = jwtDecode(parsedToken);
        const rolesStr =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        setRoles([rolesStr]);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    document.title = "News";
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/News/GetAll"
        );
        setNews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    setLoading((prevLoading) => ({ ...prevLoading, [id]: true }));

    try {
      const response = await axios.delete(
        `https://localhost:44300/api/News/Delete/${id}`
      );
      setTimeout(() => {
        setNews((prev) => prev.filter((news) => news.id !== id));
        setLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
        setSnackbarMessage("Ad deleted successfully");
        setSeverity("success");
        setOpen(true);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
        setSnackbarMessage(
          error.response.data.Message
            ? error.response.data.Message
            : "Something went wrong!"
        );
        setSeverity("error");
        setOpen(true);
      }, 2000);
    }
  };
  return (
    <div>
      <section id="admin-area" style={{ background: "white" }}>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            onClose={handleClose}
            severity={severity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
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
                    {roles.includes("SuperAdmin") ? (
                      <Link
                        to="/admin/news/create"
                        className="btn btn-success mx-2"
                      >
                        Create
                      </Link>
                    ) : (
                      ""
                    )}

                    {news.length != 0 ? (
                      <div className="table-responsive mt-3">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead v="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">News title</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Operations</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {news.length != 0 &&
                              news.map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.newsTitle}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0 d-flex gap-2">
                                      <Link
                                        to={`/admin/news/edit/${data.id}`}
                                        className="btn btn-secondary"
                                      >
                                        Edit
                                      </Link>
                                      <Link
                                        to={`/admin/news/detail/${data.id}`}
                                        className="btn btn-info"
                                      >
                                        Detail
                                      </Link>
                                      {roles.includes("SuperAdmin") ? (
                                        <button
                                          disabled={loading[data.id] || false}
                                          type="submit"
                                          className="btn btn-danger"
                                          onClick={() => handleDelete(data.id)}
                                        >
                                          {loading[data.id] ? (
                                            <CircularProgress
                                              size={24}
                                              sx={{ color: "white" }}
                                            />
                                          ) : (
                                            "Delete"
                                          )}
                                        </button>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="alert alert-danger mt-5" role="alert">
                        News not added yet
                      </div>
                    )}
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

export default NewsAdmin;
