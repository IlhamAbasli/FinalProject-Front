import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { useFormik } from "formik";
import { newsCreateSchema } from "../../../schemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function NewsCreate() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("Title", values.title);
    for (let i = 0; i < values.images.length; i++) {
      formData.append("Images", values.images[i]);
    }
    formData.append("newsContent1", values.content1);
    formData.append("newsContent2", values.content2);
    formData.append("newsContent3", values.content3);

    try {
      const res = await axios.post(
        "https://localhost:44300/api/News/Create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      actions.resetForm();
      console.log(res);
      navigate("/admin/news");
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
      images: [],
      content1: "",
      content2: "",
      content3: "",
    },
    validationSchema: newsCreateSchema,
    onSubmit,
  });

  return (
    <div>
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
                      Enter news title
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
                    <label htmlFor="content1" className="form-label">
                      Enter news first content
                    </label>
                    <input
                      type="text"
                      name="content1"
                      onChange={handleChange}
                      value={values.content1}
                      className="form-control"
                      id="content1"
                    />
                    {errors.content1 && (
                      <p style={{ color: "red" }}>{errors.content1}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content2" className="form-label">
                      Enter news second content
                    </label>
                    <input
                      type="text"
                      name="content2"
                      onChange={handleChange}
                      value={values.content2}
                      className="form-control"
                      id="content2"
                    />
                    {errors.content2 && (
                      <p style={{ color: "red" }}>{errors.content2}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content3" className="form-label">
                      Enter news third content
                    </label>
                    <input
                      type="text"
                      name="content3"
                      onChange={handleChange}
                      value={values.content3}
                      className="form-control"
                      id="content3"
                    />
                    {errors.content3 && (
                      <p style={{ color: "red" }}>{errors.content3}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="images" className="form-label">
                      Enter news images
                    </label>
                    <input
                      type="file"
                      name="images"
                      onChange={(event) => {
                        setFieldValue("images", event.currentTarget.files);
                      }}
                      className="form-control"
                      id="images"
                      multiple
                    />
                    {errors.images && (
                      <p style={{ color: "red" }}>{errors.images}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Create
                  </button>
                  <Link className="btn btn-danger mx-3" to="/admin/news">
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

export default NewsCreate;
