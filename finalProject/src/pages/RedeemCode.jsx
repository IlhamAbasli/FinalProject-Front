import React, { useState, useEffect } from "react";
import "../assets/scss/Redeem.scss";
import icon from "../assets/icons/icon.svg";
import gameimg from "../assets/images/gtav.avif";
function RedeemCode() {
  useEffect(() => {
    document.title = "Redeem Code";
  });
  const [inputValue, setInputValue] = useState("");

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
  return (
    <>
      <section id="redeem-area">
        <div className="container-redeem">
          <div className="row">
            <div className="col-4">
              <div className="game-content">
                <div className="game-image">
                  {/* <img src={gameimg} alt="" /> */}
                  <img src={icon} alt="" className="icon" />
                </div>
                <p>
                  The content will be bound to your Epic Games account forever,
                  so make sure you sign in to the correct account when prompted
                </p>
              </div>
            </div>
            <div className="col-8">
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
                    />
                  </form>
                  <p className="not-exist d-none">Code does not exist.</p>
                </div>
                <div className="redeem-button">
                  <button className="button-disabled">Redeem</button>
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
