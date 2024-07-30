import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useFormik } from "formik";
import { platformEditSchema } from "../../../schemas";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
function PlatformEdit() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState(null);
  const { id } = useParams();

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Platform/GetById/${id}`
        );
        setPlatform(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("PlatformName", values.title);
    formData.append("NewPlatformLogo", values.image);

    try {
      const res = await axios.put(
        `https://localhost:44300/api/Platform/Edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      actions.resetForm();
      console.log(res);
      navigate("/admin/platforms");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: platform?.platformName || "",
      image: "",
    },
    validationSchema: platformEditSchema,
    enableReinitialize: true,
    onSubmit,
  });
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
              <div className="col-12">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Enter ad title
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      className="form-control"
                      id="name"
                    />
                    {errors.name && (
                      <p style={{ color: "red" }}>{errors.name}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Enter platform logo
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      className="form-control"
                      id="image"
                    />
                    {errors.image && (
                      <p style={{ color: "red" }}>{errors.image}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3">
                          <img
                            src={`${baseURL}${platform?.platformLogo}`}
                            alt=""
                            style={{
                              width: "100px",
                              padding: "10px",
                              borderRadius: "8px",
                              backgroundColor: "black",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Update
                  </button>
                  <Link className="btn btn-danger mx-3" to="/admin/platforms">
                    Back
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlatformEdit;
