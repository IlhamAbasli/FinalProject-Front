import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { useFormik } from "formik";
import { adCreateSchema } from "../../../schemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function AdsCreate() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("AdTitle", values.title);
    formData.append("AdImage", values.image);
    formData.append("AdDescription", values.description);

    try {
      const res = await axios.post(
        "https://localhost:44300/api/Ad/Create",
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
      title: "",
      description: "",
      image: "",
    },
    validationSchema: adCreateSchema,
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Create
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

export default AdsCreate;
