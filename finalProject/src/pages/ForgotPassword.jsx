import React, { useState, useEffect } from "react";
import "../assets/scss/Login.scss";
import icon from "../assets/icons/icon.svg";
import axios from "axios";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../schemas/index";
import { Link } from "react-router-dom";
import { TextField, Alert, CircularProgress } from "@mui/material";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [forgetPasswordMessage, setForgetPasswordMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (values, actions) => {
    setEmail(values.email);

    try {
      setLoading(true);
      const response = await axios.get(
        `https://localhost:44300/api/Account/ForgetPassword?email=${values.email}`
      );
      console.log(response.data);
      setTimeout(() => {
        setLoading(false),
          setForgetPasswordMessage(response.data.message),
          setForgetPassword(response.data.success),
          setOpen(true);
        actions.resetForm();
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false),
          setForgetPasswordMessage(
            "Failed to reset password. Please try again."
          ),
          setForgetPassword(false);
      }, 2000);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);

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
                {!loading && open && (
                  <Alert
                    variant="outlined"
                    severity={forgetPassword ? "success" : "error"}
                    sx={{
                      color: forgetPassword ? "green" : "red",
                      marginTop: "30px",
                    }}
                  >
                    {forgetPasswordMessage}
                  </Alert>
                )}
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
                        disabled={
                          isSubmitting ||
                          loading ||
                          errors.email ||
                          values.email == ""
                        }
                        type="submit"
                      >
                        {loading ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Send Email"
                        )}
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
