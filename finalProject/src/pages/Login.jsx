import React, { useState, useEffect } from "react";
import "../assets/scss/Login.scss";
import icon from "../assets/icons/icon.svg";
import { useFormik } from "formik";
import { logInSchema } from "../schemas/index";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  useEffect(() => {
    document.title = "Sign in to your Epic Games account | Epic Games";
  }, []);
  const navigate = useNavigate();

  const [signInErrors, setSignInErrors] = useState(null);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("EmailOrUsername", values.email);
    formData.append("Password", values.password);

    try {
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
      setSignInErrors(res.data.message);
      if (res.data.success) {
        actions.resetForm();
        localStorage.setItem("user-info", JSON.stringify(res.data.token));
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setSignInErrors(["An error occurred while submitting the form."]);
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
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <div className="inputDiv">
                      <TextField
                        id="email"
                        label="Email Address"
                        variant="filled"
                        onChange={handleChange}
                        value={values.email}
                        color={errors.email && "error"}
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
                        color={errors.password && "error"}
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
                      <button disabled={isSubmitting} type="submit">
                        Sign In
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
