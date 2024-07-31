import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
function Games() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Product/GetAll"
        );
        setGames(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Product/Delete/${id}`
      );
      setGames(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  return (
    <div>
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
                    <h5 className="card-title fw-semibold mb-4 mx-3">Games</h5>
                    <Link
                      to="/admin/games/create"
                      className="btn btn-success mx-2"
                    >
                      Create
                    </Link>
                    {games.length != 0 ? (
                      <div className="table-responsive mt-3">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead v="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Game name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Game price</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Game type</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Operations</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {games.length != 0 &&
                              games.map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.productName}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.productPrice}$
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0">
                                      <h6 className="fw-semibold mb-1">
                                        {data.productType.typeName}
                                      </h6>
                                    </td>
                                    <td className="border-bottom-0 d-flex gap-2">
                                      <Link
                                        to={`/admin/games/edit/${data.id}`}
                                        className="btn btn-secondary"
                                      >
                                        Edit
                                      </Link>
                                      <Link
                                        to={`/admin/games/detail/${data.id}`}
                                        className="btn btn-info"
                                      >
                                        Detail
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
                        News not added yet
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

export default Games;
