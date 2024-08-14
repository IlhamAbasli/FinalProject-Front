import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
function GamesDetail() {
  const [game, setGame] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    document.title = "Game detail";
  }, []);
  console.log(id);

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Product/GetById/${id}`
        );
        setGame(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchGame();
  }, [id]);
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
                    <h5 className="card-title fw-semibold mb-4 mx-3">Game</h5>
                    {game ? (
                      <div className="table-responsive mt-3">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead v="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Game logo</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Game name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  Game description
                                </h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Game price</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  Developer name
                                </h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  Publisher name
                                </h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  Redeem code
                                </h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Genre name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Type name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  Game images
                                </h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  <img
                                    src={`${baseURL}${game.productLogo}`}
                                    alt=""
                                    style={{
                                      width: 300,
                                      height: 200,
                                      objectFit: "contain",
                                      backgroundColor: "black",
                                    }}
                                  />
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {game.productName}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {game.productDescription}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {game.productPrice}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {game.developerName}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {game.publisherName}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {game.redeemCode}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {game.genre.genreName}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {game.productType.typeName}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                {game.productImages &&
                                  game.productImages.map((image, index) => (
                                    <h6
                                      className="fw-semibold mb-1"
                                      key={index}
                                    >
                                      <img
                                        src={`${baseURL}${image.imageName}`}
                                        alt=""
                                        style={{
                                          width: 300,
                                          height: 200,
                                          objectFit: "contain",
                                          border: image.isMain
                                            ? "3px double green"
                                            : undefined,
                                        }}
                                      />
                                    </h6>
                                  ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="alert alert-danger" role="alert">
                        Game not found
                      </div>
                    )}
                    <Link className="btn btn-danger mt-5" to="/admin/games">
                      Back
                    </Link>
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

export default GamesDetail;
