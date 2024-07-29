import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import { typeCreateSchema } from "../../../schemas";
import { useNavigate, useParams, Link } from "react-router-dom";

function TypeEdit() {
  const navigate = useNavigate();
  const [type, setType] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Type/GetById/${id}`
        );
        setType(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("TypeName", values.name);

    try {
      const res = await axios.put(
        `https://localhost:44300/api/Type/Edit/${id}`,
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
        name: type?.typeName || "",
      },
      enableReinitialize: true,
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
                      Change genre name
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
                    Update
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

export default TypeEdit;
