import React from "react";
import AccountHeader from "../components/layout/AccountHeader";
import AccountSidebar from "../components/layout/AccountSidebar";
import "../assets/scss/Security.scss";
function Security() {
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
                <div className="password-change">
                  <div className="title">
                    <h1>Change Your Password</h1>
                    <p>
                      For your security, we highly recommend that you choose a
                      unique password that you don't use for any other online
                      account.
                    </p>
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

export default Security;
