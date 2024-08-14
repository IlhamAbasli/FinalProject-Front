import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { useFormik } from "formik";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { adCreateSchema } from "../../../schemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
function AdsCreate() {
  const navigate = useNavigate();

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
    document.title = "Ad create";
  }, []);
  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("AdTitle", values.title);
    formData.append("AdImage", values.image);
    formData.append("AdDescription", values.description);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://localhost:44300/api/Ad/Create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage("Ad created successfully");
        setSeverity("success");
        setOpen(true);
        actions.resetForm();
      }, 2000);
      setTimeout(() => {
        navigate("/admin/ads");
      }, 3000);
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

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
    },
    validationSchema: adCreateSchema,
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
              <div className="col-12">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Enter ad title
                    </label>
                    <input
                      type="text"
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                      className="form-control"
                      id="title"
                    />
                    {errors.title && (
                      <p style={{ color: "red" }}>{errors.title}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Enter ad description
                    </label>
                    <input
                      type="text"
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                      className="form-control"
                      id="description"
                    />
                    {errors.description && (
                      <p style={{ color: "red" }}>{errors.description}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Enter ad image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      className="form-control"
                      id="image"
                    />
                    {errors.image && (
                      <p style={{ color: "red" }}>{errors.image}</p>
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
                      "Create"
                    )}
                  </button>
                  <Link className="btn btn-danger mx-3" to="/admin/ads">
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

export default AdsCreate;
