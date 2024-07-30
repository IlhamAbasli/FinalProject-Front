import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { useFormik } from "formik";
import { platformCreateSchema } from "../../../schemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function PlatformCreate() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("PlatformName", values.name);
    formData.append("PlatformLogo", values.image);

    try {
      const res = await axios.post(
        "https://localhost:44300/api/Platform/Create",
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
      name: "",
      image: "",
    },
    validationSchema: platformCreateSchema,
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
                      Enter platform name
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Create
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

export default PlatformCreate;
