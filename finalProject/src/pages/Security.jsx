import React, { useState, useEffect } from "react";
import "../assets/scss/Security.scss";
import { useFormik } from "formik";
import { changePasswordSchema } from "../schemas/index";
import { TextField, Alert, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountHeader from "../components/layout/AccountHeader";
import AccountSidebar from "../components/layout/AccountSidebar";
import CheckIcon from "@mui/icons-material/Check";

import { jwtDecode } from "jwt-decode";
import "../assets/scss/Security.scss";
function Security() {
  useEffect(() => {
    document.title = "Password & Security";
  });
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");
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
      const res = await axios.put(
        `https://localhost:44300/api/Account/UpdateUser?userId=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSnackbarMessage(
        "Changes saved successfully,sign in again to see changes"
      );
      setSeverity("success");
      setOpen(true);
    } catch (error) {
      setSnackbarMessage(
        error.response.data.Message
          ? error.response.data.Message
          : "Something went wrong!"
      );
      setSeverity("error");
      setOpen(true);
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit,
    });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
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
                <div className="password-change">
                  <div className="title">
                    <h1>Change Your Password</h1>
                    <p>
                      For your security, we highly recommend that you choose a
                      unique password that you don't use for any other online
                      account.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 col-md-8 col-lg-5">
                        <h1>New Password</h1>
                        <div className="inputDiv">
                          <TextField
                            id="oldPassword"
                            label="Old Password"
                            variant="filled"
                            onChange={handleChange}
                            value={values.oldPassword}
                            color={errors.oldPassword && "error"}
                            autoComplete="off"
                            type={showOldPassword ? "text" : "password"}
                            className="password-input"
                          />
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            className="visibility"
                          >
                            {showOldPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                          {errors.oldPassword && (
                            <p className="error">{errors.oldPassword}</p>
                          )}
                        </div>
                        <div className="inputDiv">
                          <TextField
                            id="newPassword"
                            label="New Password"
                            variant="filled"
                            onChange={handleChange}
                            value={values.newPassword}
                            color={errors.newPassword && "error"}
                            autoComplete="off"
                            type={showNewPassword ? "text" : "password"}
                            className="password-input"
                          />
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            className="visibility"
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                          {errors.newPassword && (
                            <p className="error">{errors.newPassword}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="save-changes">
                          <button>Save Changes</button>
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
    </div>
  );
}

export default Security;
