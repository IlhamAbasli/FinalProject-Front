import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Snackbar,
  Alert,
  NativeSelect,
  MenuItem,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

function AddRole() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Add role to user";
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/User/GetUsersRoles"
        );
        setUsers(response.data.users);
        setRoles(response.data.roles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    setUserId(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleId(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);
    console.log(roleId);
    setLoading(true);
    try {
      const response = await axios.post(
        `https://localhost:44300/api/User/AddRoleToUser?userId=${userId}&roleId=${roleId}`
      );
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage("Role added successfully");
        setSeverity("success");
        setOpen(true);
      }, 2000);
      setTimeout(() => {
        navigate("/admin/users");
      }, 2500);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage(
          error.response.data?.Message
            ? error.response.data?.Message
            : "Something went wrong!"
        );
        setSeverity("error");
        setOpen(true);
      }, 2000);
    }
  };
  return (
    <div>
      {" "}
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
                    <div className="table-responsive mt-3">
                      <form action="" onSubmit={handleSubmit}>
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead v="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">User</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Roles</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-bottom-0">
                                <NativeSelect
                                  id="user-select"
                                  name="userId"
                                  className="form-control"
                                  label="User"
                                  onChange={handleUserChange}
                                  value={userId}
                                >
                                  {users?.map((user, index) => (
                                    <option key={index} value={user.id}>
                                      {user.userName}
                                    </option>
                                  ))}
                                </NativeSelect>
                              </td>
                              <td className="border-bottom-0">
                                <NativeSelect
                                  id="role-select"
                                  name="roleId"
                                  className="form-control"
                                  label="Role"
                                  onChange={handleRoleChange}
                                  value={roleId}
                                >
                                  {roles?.map((role, index) => (
                                    <option key={index} value={role.id}>
                                      {role.name}
                                    </option>
                                  ))}
                                </NativeSelect>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          disabled={loading}
                          className="btn btn-success"
                          type="submit"
                        >
                          {loading ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            "Update"
                          )}
                        </button>
                        <Link className="btn btn-danger mx-3" to="/admin/users">
                          Back
                        </Link>
                      </form>
                    </div>
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

export default AddRole;
