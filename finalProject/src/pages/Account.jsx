import React, { useState, useEffect } from "react";
import AccountSidebar from "../components/layout/AccountSidebar";
import AccountHeader from "../components/layout/AccountHeader";
import { accountSchema } from "../schemas";
import "../assets/scss/Account.scss";
import { jwtDecode } from "jwt-decode";
import { Snackbar, Alert, TextField, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { useFormik } from "formik";
import axios from "axios";

function Account() {
  useEffect(() => {
    document.title = "Account Settings";
  });
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");

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
    const storedToken = localStorage.getItem("user-info");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        const decoded = jwtDecode(parsedToken);
        setToken(parsedToken);
        setDecodedToken(decoded);
        setId(decoded.sid);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("Email", values.email);
    formData.append("Username", values.username);
    formData.append("Firstname", values.firstname);
    formData.append("Lastname", values.lastname);

    try {
      setLoading(true);
      const res = await axios.put(
        `https://localhost:44300/api/Account/UpdateUser?userId=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage(
          "Changes saved successfully, sign in again to see changes"
        );
        setSeverity("success");
        setOpen(true);
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
        email: decodedToken?.email || "",
        firstname: decodedToken?.given_name || "",
        lastname: decodedToken?.family_name || "",
        username: decodedToken?.sub || "",
      },
      validationSchema: accountSchema,
      enableReinitialize: true,
      onSubmit,
    });
  return (
    <>
      <AccountHeader />
      <section id="account-area">
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
        <div className="container-account">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <AccountSidebar />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <div className="account-side">
                <div className="title">
                  <h1>Account Settings</h1>
                  <p>Manage your account’s details.</p>
                </div>
                <div className="account-info">
                  <h1>Account Information</h1>
                  <div className="id">
                    <p>
                      <span>ID:</span> {decodedToken?.sid}
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-6">
                        <div className="inputDiv">
                          <TextField
                            id="username"
                            label="Username"
                            variant="filled"
                            onChange={handleChange}
                            value={values.username}
                            color={errors.username ? "error" : "primary"}
                            autoComplete="off"
                          />
                          {errors.username && (
                            <p className="error">{errors.username}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="inputDiv">
                          <TextField
                            id="email"
                            label="Email"
                            variant="filled"
                            onChange={handleChange}
                            value={values.email}
                            color={errors.email ? "error" : "primary"}
                            autoComplete="off"
                          />
                          {errors.email && (
                            <p className="error">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-6 mt-2">
                        <div className="inputDiv">
                          <TextField
                            id="firstname"
                            label="Firstname"
                            variant="filled"
                            onChange={handleChange}
                            value={values.firstname}
                            color={errors.firstname ? "error" : "primary"}
                            autoComplete="off"
                          />
                          {errors.firstname && (
                            <p className="error">{errors.firstname}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-6 mt-2">
                        <div className="inputDiv">
                          <TextField
                            id="lastname"
                            label="Lastname"
                            variant="filled"
                            onChange={handleChange}
                            value={values.lastname}
                            color={errors.lastname ? "error" : "primary"}
                            autoComplete="off"
                          />
                          {errors.lastname && (
                            <p className="error">{errors.lastname}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="save-changes">
                          <button
                            disabled={isSubmitting || loading}
                            type="submit"
                          >
                            {loading ? (
                              <CircularProgress size={24} color="secondary" />
                            ) : (
                              "Save Changes"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Account;
