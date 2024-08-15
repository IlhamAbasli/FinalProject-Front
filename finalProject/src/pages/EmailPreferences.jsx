import React, { useEffect, useState } from "react";
import AccountHeader from "../components/layout/AccountHeader";
import AccountSidebar from "../components/layout/AccountSidebar";
import { Switch } from "@mui/material";
import styled from "@emotion/styled";
import "../assets/scss/EmailPreferences.scss";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Snackbar, Alert, TextField, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

function EmailPreferences() {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette?.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette?.mode === "light"
            ? theme.palette?.grey[100]
            : theme.palette?.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette?.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette?.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions?.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = "Email Preferences";
  });

  const [subscriber, setSubscriber] = useState(null);
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const getSubscriber = async () => {
    try {
      const res = await axios.get(
        `https://localhost:44300/api/Subscriber/GetSubscriber?subscriberId=${id}`
      );
      setSubscriber(res.data);
      setChecked(res.data ? true : false);
    } catch (error) {}
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

  useEffect(() => {
    if (id) {
      getSubscriber();
    }
  }, [id]);
  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://localhost:44300/api/Subscriber/Subscribe?userId=${id}`
      );
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage(
          "You have successfully updated your email preferences"
        );
        setSeverity("success");
        setOpen(true);
        getSubscriber();
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

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `https://localhost:44300/api/Subscriber/Unsubscribe?userId=${id}`
      );
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage(
          "You have successfully updated your email preferences"
        );
        setSeverity("success");
        setOpen(true);
        getSubscriber();
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
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      handleUnsubscribe();
      setChecked(false);
    } else {
      handleSubscribe();
      setChecked(true);
    }
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
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            onClose={handleClose}
            severity={severity}
            variant="filled"
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
                <div className="email-preference">
                  <div className="title">
                    <h1>Email Preferences</h1>
                    <p>
                      Manage your Epic Games email subscription preferences for
                      news, surveys, and special offers. Transactional emails
                      such as purchase receipts, email verification, password
                      resets, and two-factor authentication are not affected by
                      your subscription preference.
                    </p>
                  </div>
                  <h1>Subscribe/Unsubscribe</h1>
                  <div className="sub">
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={checked}
                      onChange={handleChange}
                    />
                    <span>
                      I would like to receive news, surveys, and special offers
                      from Epic Games.
                    </span>
                    {loading && (
                      <CircularProgress
                        size={30}
                        color="error"
                        sx={{ marginLeft: "10px" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmailPreferences;
