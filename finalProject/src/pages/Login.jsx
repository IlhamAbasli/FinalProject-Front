import React, { useState, useEffect } from "react";
import "../assets/scss/Login.scss";
import icon from "../assets/icons/icon.svg";
import { useFormik } from "formik";
import { logInSchema } from "../schemas/index";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  useEffect(() => {
    document.title = "Sign in to your Epic Games account | Epic Games";
  }, []);
  const navigate = useNavigate();

  const [signInError, setSignInError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("EmailOrUsername", values.email);
    formData.append("Password", values.password);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://localhost:44300/api/Account/signin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        localStorage.setItem("user-info", JSON.stringify(res.data.token));
        setTimeout(() => {
          setSignInError(res.data);
          actions.resetForm();
        }, 2000);
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 3500);
      } else {
        setTimeout(() => {
          setSignInError(res.data);
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        console.error("Error submitting the form", error);
        setSignInError("An error occurred while submitting the form.");
        setLoading(false);
      }, 2000);
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: logInSchema,
      onSubmit,
    });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <section id="login-area">
        <div className="login-container">
          <div className="row">
            <div className="col-12">
              <div className="login-side">
                <div className="logo">
                  <Link to="/">
                    <img src={icon} alt="" />
                  </Link>
                </div>
                <div className="title">
                  <h2>Sign In</h2>
                </div>
                {signInError && (
                  <div className="errors">
                    <Alert
                      variant="outlined"
                      severity={signInError.success ? "success" : "error"}
                      sx={{
                        color: signInError.success ? "green" : "#e97780",
                        marginTop: "15px",
                      }}
                    >
                      {signInError.message}
                    </Alert>
                  </div>
                )}
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <div className="inputDiv">
                      <TextField
                        id="email"
                        label="Email Address"
                        variant="filled"
                        onChange={handleChange}
                        value={values.email}
                        color={errors.email ? "error" : "primary"}
                        autoComplete="off"
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="inputDiv">
                      <TextField
                        id="password"
                        label="Password"
                        variant="filled"
                        onChange={handleChange}
                        value={values.password}
                        color={errors.password ? "error" : "primary"}
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                      />
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                      {errors.password && (
                        <p className="error">{errors.password}</p>
                      )}
                    </div>
                    <div className="submit-area">
                      <button disabled={isSubmitting || loading} type="submit">
                        {loading ? <CircularProgress size={24} /> : "Sign In"}
                      </button>
                      <Link to="/forgotpassword">I can`t sign in</Link>
                      <Link to="/register">Create account</Link>
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

export default Login;
