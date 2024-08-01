import React, { useState, useEffect } from "react";
import "../assets/scss/Login.scss";
import icon from "../assets/icons/icon.svg";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../schemas/index";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ForgotPassword() {
  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.resetForm();
  };
  useEffect(() => {
    document.title = "Reset your Epic Games account password | Epic Games";
  }, []);
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordSchema,
      onSubmit,
    });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      {" "}
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
                  <h2>Forgot your password?</h2>
                </div>
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <p style={{ color: "#ffffffb8" }}>
                      Please enter your account email.
                    </p>
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
                    <div className="submit-area">
                      <button
                        disabled={isSubmitting || errors.email}
                        type="submit"
                      >
                        Send Email
                      </button>
                      <p style={{ color: "#ffffffb8" }} className="mt-5">
                        Remember your password?
                        <Link to="/login" className="mx-1">
                          Sign in
                        </Link>
                      </p>
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

export default ForgotPassword;
