import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import { genreCreateSchema } from "../../../schemas";
import { useNavigate, useParams, Link } from "react-router-dom";
function GenresEdit() {
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const { id } = useParams();

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Genre/GetById/${id}`
        );
        setGenre(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("GenreName", values.name);

    try {
      const res = await axios.put(
        `https://localhost:44300/api/Genre/Edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      actions.resetForm();
      console.log(res);
      navigate("/admin/genres");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: genre?.genreName || "",
      },
      enableReinitialize: true,
      validationSchema: genreCreateSchema,
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
                    Create
                  </button>
                  <Link className="btn btn-danger mx-3" to="/admin/genres">
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

export default GenresEdit;
