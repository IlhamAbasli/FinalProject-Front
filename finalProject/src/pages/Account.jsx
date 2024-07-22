import React from "react";
import AccountSidebar from "../components/layout/AccountSidebar";
import AccountHeader from "../components/layout/AccountHeader";
import "../assets/scss/Account.scss";
function Account() {
  return (
    <>
      <AccountHeader />
      <section id="account-area">
        <div className="container-account">
          <div className="row">
            <div className="col-3">
              <AccountSidebar />
            </div>
            <div className="col-9">
              <div className="account-side">
                <div className="title">
                  <h1>Account Settings</h1>
                  <p>Manage your account’s details.</p>
                </div>
                <div className="account-info">
                  <h1>Account Information</h1>
                  <div className="id">
                    <p>
                      <span>ID:</span> 110f4d2ce35146a5a7788fe2cfd385c1
                    </p>
                  </div>
                  <form action="">
                    <div className="row">
                      <div className="col-6">
                        <input type="text" />
                      </div>
                      <div className="col-6">
                        <input type="text" />
                      </div>
                      <div className="col-6">
                        <input type="text" />
                      </div>
                      <div className="col-6">
                        <input type="text" />
                      </div>
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

export default Account;
