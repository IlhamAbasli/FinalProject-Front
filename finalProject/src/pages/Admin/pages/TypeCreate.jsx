import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { useFormik } from "formik";
import { typeCreateSchema } from "../../../schemas";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
function TypeCreate() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("TypeName", values.name);

    try {
      const res = await axios.post(
        "https://localhost:44300/api/Type/Create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      actions.resetForm();
      console.log(res);
      navigate("/admin/types");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
      },
      validationSchema: typeCreateSchema,
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
              <div className="col-3">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Enter type name
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Create
                  </button>
                  <Link className="btn btn-danger mx-3" to="/admin/types">
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

export default TypeCreate;
