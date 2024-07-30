import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useFormik } from "formik";
import { adEditSchema } from "../../../schemas";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

function AdsEdit() {
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const { id } = useParams();

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Ad/GetById/${id}`
        );
        setAd(response.data);
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
    formData.append("AdTitle", values.title);
    formData.append("NewAdImage", values.image);
    formData.append("AdDescription", values.description);

    try {
      const res = await axios.put(
        `https://localhost:44300/api/Ad/Edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      actions.resetForm();
      console.log(res);
      navigate("/admin/ads");
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
      title: ad?.adTitle || "",
      description: ad?.adDescription || "",
      image: "",
    },
    validationSchema: adEditSchema,
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
                    <label htmlFor="title" className="form-label">
                      Enter ad title
                    </label>
                    <input
                      type="text"
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                      className="form-control"
                      id="title"
                    />
                    {errors.title && (
                      <p style={{ color: "red" }}>{errors.title}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Enter ad description
                    </label>
                    <input
                      type="text"
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                      className="form-control"
                      id="description"
                    />
                    {errors.description && (
                      <p style={{ color: "red" }}>{errors.description}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Enter ad image
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
                            src={`${baseURL}${ad?.adImage}`}
                            alt=""
                            style={{ width: "100%", borderRadius: "8px" }}
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
                  <Link className="btn btn-danger mx-3" to="/admin/ads">
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

export default AdsEdit;
