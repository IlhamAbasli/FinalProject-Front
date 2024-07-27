import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { newsEditSchema } from "../../../schemas";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../assets/scss/NewsEdit.scss";
import AnchorIcon from "@mui/icons-material/Anchor";
import DeleteIcon from "@mui/icons-material/Delete";

function NewsEdit() {
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const { id } = useParams();

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/News/GetById/${id}`
        );
        setNews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("newsTitle", values.title);
    for (let i = 0; i < values.images.length; i++) {
      formData.append("newImages", values.images[i]);
    }
    formData.append("newsContent1", values.content1);
    formData.append("newsContent2", values.content2);
    formData.append("newsContent3", values.content3);

    try {
      const res = await axios.put(
        `https://localhost:44300/api/News/Edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      actions.resetForm();
      navigate("/admin/news");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: news?.newsTitle || "",
      images: [],
      content1: news?.newsContent1 || "",
      content2: news?.newsContent2 || "",
      content3: news?.newsContent3 || "",
    },
    enableReinitialize: true,
    validationSchema: newsEditSchema,
    onSubmit,
  });

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  const handleDelete = async (newsId, imageId) => {
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/News/DeleteImage?imageId=${imageId}&newsId=${newsId}`
      );
      // Update the news data after deleting the image
      setNews((prevNews) => ({
        ...prevNews,
        newsImages: prevNews.newsImages.filter((image) => image.id !== imageId),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleChangeMain = async (newsId, imageId) => {
    try {
      const response = await axios.put(
        `https://localhost:44300/api/News/ChangeMainImage?imageId=${imageId}&newsId=${newsId}`
      );
      // Update the news data after deleting the image
      setNews((prevNews) => ({
        ...prevNews,
        newsImages: prevNews.newsImages.filter((image) => image.id !== imageId),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

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
                {news ? (
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
                    <div className="mb-3">
                      <div className="col-12">
                        <div className="row">
                          {news.newsImages &&
                            news.newsImages.map((image, index) => {
                              return (
                                <div className="col-3 news-image" key={index}>
                                  <img
                                    src={`${baseURL}${image.image}`}
                                    alt=""
                                    style={{
                                      width: "100%",
                                      borderRadius: "8px",
                                      border: image.isMain
                                        ? "4px double green"
                                        : undefined,
                                    }}
                                  />
                                  {!image.isMain && (
                                    <div className="product-action">
                                      <ul>
                                        <li>
                                          <button
                                            className="make-main"
                                            onClick={() =>
                                              handleChangeMain(
                                                news.id,
                                                image.id
                                              )
                                            }
                                          >
                                            <AnchorIcon color="success" />
                                            <span className="tooltip-text">
                                              Make main image
                                            </span>
                                          </button>
                                        </li>
                                        <li>
                                          <button
                                            className="remove-image"
                                            onClick={() =>
                                              handleDelete(news.id, image.id)
                                            }
                                          >
                                            <DeleteIcon color="error" />
                                            <span className="tooltip-text">
                                              Remove image
                                            </span>
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
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
                    <Link className="btn btn-danger mx-3" to="/admin/news">
                      Back
                    </Link>
                  </form>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsEdit;
