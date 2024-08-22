import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

function Comments() {
  const [comments, setComments] = useState([]);
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
    document.title = "Ads";

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Comment/GetAllComments"
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    setLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Comment/Delete?commentId=${id}`
      );
      setTimeout(() => {
        setComments((prev) => prev.filter((comment) => comment.id !== id));
        setLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
        setSnackbarMessage("Comment deleted successfully");
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
                    <h5 className="card-title fw-semibold mb-4">Comments</h5>

                    {comments.length != 0 ? (
                      <div className="table-responsive mt-3">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead v="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Username</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Subject</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Comment</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Posted</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Game</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Operations</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {comments.length != 0 &&
                              comments.map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.username}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.subject}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.comment}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.createdDate}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.productName}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0 d-flex gap-2">
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
                        Comments not posted yet
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

export default Comments;
