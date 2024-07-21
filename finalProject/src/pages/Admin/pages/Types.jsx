import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { Link } from "react-router-dom";
function Types() {
  return (
    <div>
      <section id="admin-area" style={{ background: "white" }}>
        <div className="admin-container">
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10 mt-5">
              <div class="col-lg-12 d-flex align-items-stretch">
                <div class="card w-100">
                  <div class="card-body p-4">
                    <h5 class="card-title fw-semibold mb-4">Types</h5>
                    <Link className="btn btn-success mx-2">Create</Link>
                    <div class="table-responsive mt-3">
                      <table class="table text-nowrap mb-0 align-middle">
                        <thead class="text-dark fs-4">
                          <tr>
                            <th class="border-bottom-0">
                              <h6 class="fw-semibold mb-0">Type</h6>
                            </th>
                            <th class="border-bottom-0">
                              <h6 class="fw-semibold mb-0">Operations</h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="border-bottom-0">
                              <h6 class="fw-semibold mb-1">Type 1</h6>
                            </td>
                            <td class="border-bottom-0 d-flex gap-2">
                              <button className="btn btn-secondary">
                                Edit
                              </button>
                              <button className="btn btn-info">Detail</button>
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default Types;
