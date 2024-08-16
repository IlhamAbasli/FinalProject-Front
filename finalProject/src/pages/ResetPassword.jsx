import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../schemas/index";
import { TextField, Alert, Snackbar } from "@mui/material";
import icon from "../assets/icons/icon.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

import "../assets/scss/ResetPassword.scss";
function ResetPassword() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [resetPass, setResetPass] = useState(false);

  useEffect(() => {
    document.title = "Reset Your Password | Epic Games";
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    const token = params.get("token");
    setUserId(userId);
    setToken(token);
  });

  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("NewPassword", values.newPassword);
    formData.append("ConfirmNewPassword", values.confirmNewPassword);
    formData.append("UserId", userId);
    formData.append("Token", token);

    try {
      setLoading(true);
      const response = await axios.post(
        `https://localhost:44300/api/Account/ResetPassword`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setTimeout(() => {
        setLoading(false);
        setResetPass(true);
      }, 3500);

      setTimeout(() => {
        navigate("/login");
      }, 4500);
    } catch (error) {
      setMessage("Failed to reset password. Please try again.");
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        newPassword: "",
        confirmNewPassword: "",
      },
      validationSchema: resetPasswordSchema,
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
      {" "}
      <section id="login-area">
        <div className="login-container">
          <div className="row">
            <div className="account-side">
              <div className="password-change">
                <div className="logo">
                  <Link to="/">
                    <img src={icon} alt="" />
                  </Link>
                </div>
                <div className="title">
                  <h1>Reset your password</h1>
                  <p>
                    For your security, we recommend choosing a unique password
                    that you don't use elsewhere.
                  </p>
                </div>
                {!loading && resetPass && (
                  <Alert
                    variant="outlined"
                    severity={resetPass ? "success" : "error"}
                    sx={{
                      color: resetPass ? "green" : "red",
                      marginTop: "30px",
                    }}
                  >
                    Password reset successfully
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="inputDiv">
                        <TextField
                          id="newPassword"
                          label="New Password"
                          variant="filled"
                          onChange={handleChange}
                          value={values.newPassword}
                          color={errors.newPassword && "error"}
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
                          {showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        {errors.newPassword && (
                          <p className="error">{errors.newPassword}</p>
                        )}
                      </div>
                      <div className="inputDiv">
                        <TextField
                          id="confirmNewPassword"
                          label="Confirm New Password"
                          variant="filled"
                          onChange={handleChange}
                          value={values.confirmNewPassword}
                          color={errors.confirmNewPassword && "error"}
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
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        {errors.confirmNewPassword && (
                          <p className="error">{errors.confirmNewPassword}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="save-changes">
                        <button
                          disabled={
                            isSubmitting ||
                            loading ||
                            errors.confirmNewPassword ||
                            errors.newPassword ||
                            values.confirmNewPassword == "" ||
                            values.newPassword == ""
                          }
                          type="submit"
                        >
                          {loading ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            "Reset Password"
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
      </section>
    </div>
  );
}

export default ResetPassword;
