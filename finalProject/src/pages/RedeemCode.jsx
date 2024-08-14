import React, { useState, useEffect } from "react";
import "../assets/scss/Redeem.scss";
import icon from "../assets/icons/icon.svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
function RedeemCode() {
  useEffect(() => {
    document.title = "Redeem Code";
  });
  const [inputValue, setInputValue] = useState("");
  const [game, setGame] = useState(null);

  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

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

  const handleRedeem = (e) => {
    e.preventDefault();
    const redeemGame = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `https://localhost:44300/api/Library/AddLibraryByRedeem?userId=${id}&productId=${game?.productId}`
        );
        setTimeout(() => {
          setLoading(false);
          setSnackbarMessage("Game added to your library");
          setSeverity("success");
          setOpen(true);
          setGame(null);
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
          setGame(null);
        }, 2000);
      }
    };

    redeemGame();
  };

  const baseURL = "https://localhost:44300/assets/images/";

  const formatInput = (value) => {
    // Remove all non-alphanumeric characters
    let formattedValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    // Add dashes at appropriate positions
    if (formattedValue.length > 5) {
      formattedValue = `${formattedValue.slice(0, 5)}-${formattedValue.slice(
        5
      )}`;
    }
    if (formattedValue.length > 11) {
      formattedValue = `${formattedValue.slice(0, 11)}-${formattedValue.slice(
        11
      )}`;
    }
    if (formattedValue.length > 17) {
      formattedValue = `${formattedValue.slice(0, 17)}-${formattedValue.slice(
        17
      )}`;
    }

    // Limit to 23 characters (20 alphanumeric + 3 dashes)
    return formattedValue.slice(0, 23);
  };

  const handleChange = (event) => {
    const formattedValue = formatInput(event.target.value);
    setInputValue(formattedValue);
  };

  const handleFind = () => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Product/GetByRedeem?redeemCode=${inputValue}`
        );
        console.log(response.data);
        setGame(response.data);
      } catch (error) {
        setGame(null);
        console.error("Error fetching news:", error);
      }
    };

    fetchGame();
  };
  return (
    <>
      <section id="redeem-area">
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
        <div className="container-redeem">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="game-content">
                <div className="game-image">
                  {game ? (
                    game.productImages.map(
                      (image, index) =>
                        image.isMain && (
                          <img
                            key={index}
                            src={`${baseURL}${image.imageName}`}
                            alt=""
                          />
                        )
                    )
                  ) : (
                    <img src={icon} alt="" className="icon" />
                  )}
                </div>
                <p>
                  The content will be bound to your Epic Games account forever,
                  so make sure you sign in to the correct account when prompted
                </p>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <div className="redeem-side">
                <div className="title">
                  <h2>Redeem your product</h2>
                </div>
                <div className="desc">
                  <p>
                    Enter the product code distributed with a retail DVD or
                    other Epic Games product code here.
                  </p>
                </div>
                <div className="redeem-input">
                  <form action="">
                    <input
                      type="text"
                      placeholder="00000-00000-00000-00000"
                      value={inputValue}
                      onChange={handleChange}
                      onKeyUp={handleFind}
                    />{" "}
                    <div className="redeem-button">
                      <button
                        onClick={handleRedeem}
                        className={!game ? "button-disabled" : "button"}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                          "Redeem"
                        )}
                      </button>
                    </div>
                  </form>
                  {!game && (
                    <p className="not-exist mt-3">Code does not exist.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RedeemCode;
