import React from "react";
import AccountHeader from "../components/layout/AccountHeader";
import AccountSidebar from "../components/layout/AccountSidebar";
import { Switch } from "@mui/material";
import "../assets/scss/EmailPreferences.scss";
function EmailPreferences() {
  return (
    <div>
      <AccountHeader />
      <section id="account-area">
        <div className="container-account">
          <div className="row">
            <div className="col-3">
              <AccountSidebar />
            </div>
            <div className="col-9">
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
                  <div className="sub">
                    <h1>Subscribe/Unsubscribe</h1>
                    <Switch />
                    <span>
                      I would like to receive news, surveys, and special offers
                      from Epic Games.
                    </span>
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
