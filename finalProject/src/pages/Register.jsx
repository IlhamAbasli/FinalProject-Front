import React, { useState, useEffect } from "react";
import "../assets/scss/Register.scss";
import icon from "../assets/icons/icon.svg";
import { useFormik } from "formik";
import { advancedSchema } from "../schemas/index";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Tooltip, Alert, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register() {
  useEffect(() => {
    document.title = "Register for an Epic Games account | Epic Games";
  }, []);

  const navigate = useNavigate();

  const [signUpErrors, setSignUpErrors] = useState(null);
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("Email", values.email);
    formData.append("Username", values.username);
    formData.append("Firstname", values.firstname);
    formData.append("Lastname", values.lastname);
    formData.append("Password", values.password);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://localhost:44300/api/Account/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      setSignUpErrors(res.data.errors);
      setSignUp(res.data.success);
      if (!res.data.errors || res.data.errors.length === 0) {
        actions.resetForm();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setSignUpErrors(["An error occurred while submitting the form."]);
      setLoading(false);
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        username: "",
      },
      validationSchema: advancedSchema,
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
                  <h2>Create Account</h2>
                </div>
                {!loading && signUpErrors && (
                  <div className="errors">
                    {signUpErrors.map((error, index) => (
                      <Alert
                        variant="outlined"
                        severity="error"
                        sx={{ color: "red", marginTop: "15px" }}
                        key={index}
                      >
                        {error}
                      </Alert>
                    ))}
                  </div>
                )}
                {!loading && signUp && (
                  <Alert
                    variant="outlined"
                    severity="success"
                    sx={{ color: "green", marginTop: "30px" }}
                  >
                    Register successfull, please check your email to confirm
                    your account
                  </Alert>
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
                        color={errors.email && "error"}
                        autoComplete="off"
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="firstlast d-flex gap-3">
                      <div className="inputDiv">
                        <TextField
                          id="firstname"
                          label="First Name(optional)"
                          variant="filled"
                          onChange={handleChange}
                          value={values.firstname}
                          color={errors.firstname && "error"}
                          autoComplete="off"
                        />
                        {errors.firstname && (
                          <p className="error">{errors.firstname}</p>
                        )}
                      </div>
                      <div className="inputDiv">
                        <TextField
                          id="lastname"
                          label="Last Name(optional)"
                          variant="filled"
                          onChange={handleChange}
                          value={values.lastname}
                          color={errors.lastname && "error"}
                          autoComplete="off"
                        />
                        {errors.lastname && (
                          <p className="error">{errors.lastname}</p>
                        )}
                      </div>
                    </div>
                    <div className="inputDiv">
                      <TextField
                        id="username"
                        label="Username"
                        variant="filled"
                        onChange={handleChange}
                        value={values.username}
                        autoComplete="off"
                      />
                      <IconButton>
                        <Tooltip
                          title="Your display name must be between 3 and 16 characters, and may contain letters, numbers, and non-consecutive dashes, periods, underscores and spaces."
                          placement="top"
                        >
                          <InfoOutlinedIcon />
                        </Tooltip>
                      </IconButton>
                      {errors.username && (
                        <p className="error">{errors.username}</p>
                      )}
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
                        className="password-input"
                      />
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        className="visibility"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                      <IconButton>
                        <Tooltip
                          title="Passwords must have 7+ characters, at least one digit, at least one uppercase letter, at least one lowercase letter, at least one non-alphanumeric character."
                          placement="top"
                        >
                          <InfoOutlinedIcon />
                        </Tooltip>
                      </IconButton>
                      {errors.password && (
                        <p className="error">{errors.password}</p>
                      )}
                    </div>
                    <div className="submit-area">
                      <button disabled={isSubmitting || loading} type="submit">
                        {loading ? <CircularProgress size={24} /> : "Sign Up"}
                      </button>
                      <span>
                        Already have an account?
                        <Link to="/login">Sign in</Link>
                      </span>
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

export default Register;
