import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import { genreCreateSchema } from "../../../schemas";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
function GenresEdit() {
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Genre edit";
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Genre/GetById/${id}`
        );
        setGenre(response.data);
      } catch (error) {
        navigate("/notfound");
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("GenreName", values.name);

    try {
      setLoading(true);

      const res = await axios.put(
        `https://localhost:44300/api/Genre/Edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage("Genre updated successfully");
        setSeverity("success");
        setOpen(true);
        actions.resetForm();
        navigate("/admin/genres");
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
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

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: genre?.genreName || "",
      },
      enableReinitialize: true,
      validationSchema: genreCreateSchema,
      onSubmit,
    });
  return (
    <div>
      {" "}
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
              <div className="col-3">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Change genre name
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      className="form-control"
                      id="name"
                    />
                    {errors.name && (
                      <p style={{ color: "red" }}>{errors.name}</p>
                    )}
                  </div>
                  <button
                    disabled={isSubmitting || loading}
                    className="btn btn-success"
                    type="submit"
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Update"
                    )}
                  </button>
                  <Link className="btn btn-danger mx-3" to="/admin/genres">
                    Back
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GenresEdit;
