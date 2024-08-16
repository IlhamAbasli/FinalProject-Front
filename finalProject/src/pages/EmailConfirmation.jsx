import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EmailConfirmation = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    const token = params.get("token");
    document.title = "Email confirmation...";

    const confirmEmail = async () => {
      try {
        const response = await axios.post(
          "https://localhost:44300/api/Account/ConfirmEmail",
          {
            userId,
            token,
          }
        );
        setMessage("Email confirmed successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setMessage("Failed to confirm email. Please try again.");
      }
    };

    if (userId && token) {
      confirmEmail();
    } else {
      setMessage("Invalid confirmation link.");
    }
  }, [navigate, location]);
  return (
    <div>
      {" "}
      <section id="not-found-area" style={{ height: "100vh" }}>
        <div className="row">
          <div className="col-12">
            <div className="not-found">
              <div className="icon" style={{ fontSize: "100px" }}>
                ✅
              </div>
              <div className="title">
                <h1>{message}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailConfirmation;
