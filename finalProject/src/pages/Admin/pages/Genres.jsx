import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Link } from "react-router-dom";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
function Genres() {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState({});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    document.title = "Genres";
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

    fetchGenres();
  }, []);

  const handleDelete = async (id) => {
    setLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Genre/Delete/${id}`
      );
      setTimeout(() => {
        setGenres((prev) => prev.filter((genre) => genre.id !== id));
        setLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
        setSnackbarMessage("Genre deleted successfully");
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
                    <h5 className="card-title fw-semibold mb-4">Genres</h5>
                    <Link
                      to="/admin/genres/create"
                      className="btn btn-success mx-2"
                    >
                      Create
                    </Link>
                    {genres.length != 0 ? (
                      <div className="table-responsive mt-3">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead v="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Genre name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Operations</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {genres.length != 0 &&
                              genres.map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.genreName}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0 d-flex gap-2">
                                      <Link
                                        to={`/admin/genres/edit/${data.id}`}
                                        className="btn btn-secondary"
                                      >
                                        Edit
                                      </Link>
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
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="alert alert-danger mt-5" role="alert">
                        Genres not added yet
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

export default Genres;
