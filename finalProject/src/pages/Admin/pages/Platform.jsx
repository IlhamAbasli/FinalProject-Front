import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
function Platform() {
  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Platform/GetAll"
        );
        setPlatforms(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Platform/Delete/${id}`
      );
      setPlatforms(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  return (
    <div>
      {" "}
      <section id="admin-area" style={{ background: "white" }}>
        <div className="admin-container">
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10 mt-5">
              <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4">Ads</h5>
                    <Link
                      to="/admin/platforms/create"
                      className="btn btn-success mx-2"
                    >
                      Create
                    </Link>
                    {platforms.length != 0 ? (
                      <div className="table-responsive mt-3">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead v="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Ad name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Operations</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {platforms.length != 0 &&
                              platforms.map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.platformName}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0 d-flex gap-2">
                                      <Link
                                        to={`/admin/platforms/edit/${data.id}`}
                                        className="btn btn-secondary"
                                      >
                                        Edit
                                      </Link>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(data.id)}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="alert alert-danger mt-5" role="alert">
                        Platforms not added yet
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

export default Platform;
