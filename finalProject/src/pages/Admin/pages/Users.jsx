import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Link } from "react-router-dom";
import { CircularProgress, Snackbar, Alert, NativeSelect } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState({});
  const [selectedRoles, setSelectedRoles] = useState({}); // State to manage selected roles per user

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44300/api/User/GetUsers"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    document.title = "Users";
    fetchUsers();
  }, []);

  const handleChange = (event, userId) => {
    setSelectedRoles((prevSelectedRoles) => ({
      ...prevSelectedRoles,
      [userId]: event.target.value,
    }));
  };

  const handleRemoveRole = async (e, userId) => {
    e.preventDefault();
    setLoading((prevLoading) => ({ ...prevLoading, [userId]: true }));
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/User/RemoveRole?userId=${userId}&role=${selectedRoles[userId]}`
      );
      setTimeout(() => {
        setLoading((prevLoading) => ({ ...prevLoading, [userId]: false }));
        setSnackbarMessage("Role removed successfully");
        fetchUsers();
        setSeverity("success");
        setOpen(true);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoading((prevLoading) => ({ ...prevLoading, [userId]: false }));
        setSnackbarMessage(
          error.response?.data?.Message
            ? error.response.data.Message
            : "Something went wrong!"
        );
        setSeverity("error");
        setOpen(true);
      }, 2000);
    }
  };

  return (
    <div>
      <section id="admin-area" style={{ background: "white" }}>
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
        <div className="admin-container">
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10 mt-5">
              <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4">Users</h5>
                    <Link
                      to="/admin/users/addrole"
                      className="btn btn-success mx-2"
                    >
                      Add Role to User
                    </Link>
                    {users.length !== 0 ? (
                      <div className="table-responsive mt-3">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead className="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Username</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">User Email</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">User Roles</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.length !== 0 &&
                              users.map((data, index) => (
                                <tr key={index}>
                                  <td className="border-bottom-0">
                                    <h6 className="fw-semibold mb-1">
                                      {data.username}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <h6 className="fw-semibold mb-1">
                                      {data.email}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <form
                                      onSubmit={(e) =>
                                        handleRemoveRole(e, data.userId)
                                      }
                                    >
                                      <NativeSelect
                                        id="role-select"
                                        name="roleId"
                                        className="form-control"
                                        value={selectedRoles[data.userId] || ""}
                                        onChange={(e) =>
                                          handleChange(e, data.userId)
                                        }
                                        sx={{
                                          width: "180px",
                                          height: "50px",
                                        }}
                                      >
                                        {data.existRoles?.map((role, index) => (
                                          <option key={index} value={role}>
                                            {role}
                                          </option>
                                        ))}
                                      </NativeSelect>
                                      {data?.existRoles.length === 1 ? (
                                        ""
                                      ) : (
                                        <button
                                          disabled={
                                            loading[data?.userId] || false
                                          }
                                          type="submit"
                                          className="btn btn-danger mx-2"
                                        >
                                          {loading[data?.userId] ? (
                                            <CircularProgress
                                              size={24}
                                              sx={{ color: "white" }}
                                            />
                                          ) : (
                                            "Remove role"
                                          )}
                                        </button>
                                      )}
                                    </form>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="alert alert-danger mt-5" role="alert">
                        Nobody has signed up yet
                      </div>
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

export default Users;
