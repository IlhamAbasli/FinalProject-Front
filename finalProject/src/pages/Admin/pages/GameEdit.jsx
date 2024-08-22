import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { gameEditSchema } from "../../../schemas";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import AnchorIcon from "@mui/icons-material/Anchor";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputLabel, NativeSelect } from "@mui/material";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

function GameEdit() {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const baseURL = "https://localhost:44300/assets/images/";

  useEffect(() => {
    document.title = "Game edit";
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44300/api/Product/GetById/${id}`
        );
        setGame(response.data);
        console.log(response.data);
      } catch (error) {
        navigate("/notfound");
        console.error("Error fetching news:", error);
      }
    };
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Genre/GetAll"
        );
        setGenres(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Type/GetAll"
        );
        setTypes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44300/api/Platform/GetAll"
        );
        setPlatforms(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchTypes();
    fetchGenres();
    fetchPlatforms();
    fetchGame();
  }, [id]);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();
    formData.append("ProductName", values.name);
    formData.append("ProductDescription", values.description);
    formData.append("ProductPrice", values.price);
    formData.append("DeveloperName", values.developerName);
    formData.append("PublisherName", values.publisherName);
    formData.append("NewProductLogo", values.logo);
    formData.append("Count", values.count);
    formData.append("GenreId", values.genreId);
    formData.append("TypeId", values.typeId);
    formData.append("PlatformId", values.platformId);
    formData.append("MinOsVersion", values.minOsVersion);
    formData.append("MinCpuName", values.minCpuName);
    formData.append("MinMemory", values.minMemory);
    formData.append("MinGpu", values.minGpu);
    formData.append("RecomOsVersion", values.recomOsVersion);
    formData.append("RecomCpuName", values.recomCpuName);
    formData.append("RecomMemory", values.recomMemory);
    formData.append("RecomGpu", values.recomGpu);
    for (let i = 0; i < values.images.length; i++) {
      formData.append("NewProductImages", values.images[i]);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `https://localhost:44300/api/Product/Edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage("Game updated successfully");
        setSeverity("success");
        setOpen(true);
        actions.resetForm();
        navigate("/admin/games");
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setSnackbarMessage(
          error.response.data.Message
            ? error.response.data.Message
            : "Something went wrong!"
        );
        setSeverity("error");
        setOpen(true);
      }, 2000);
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
      name: game?.productName || "",
      images: [],
      logo: "",
      description: game?.productDescription || "",
      developerName: game?.developerName || "",
      publisherName: game?.publisherName || "",
      price: game?.productPrice || 0,
      count: game?.count || 0,
      genreId: game?.genre.id || "",
      typeId: game?.productType.id || "",
      platformId: game?.platformProducts[0].platformId || "",
      minOsVersion: game?.systemRequirements[0].minOsVersion || "",
      minCpuName: game?.systemRequirements[0].minCpuName || "",
      minMemory: game?.systemRequirements[0].minMemory || "",
      minGpu: game?.systemRequirements[0].minGpu || "",
      recomOsVersion: game?.systemRequirements[0].recomOsVersion || "",
      recomCpuName: game?.systemRequirements[0].recomCpuName || "",
      recomMemory: game?.systemRequirements[0].recomMemory || "",
      recomGpu: game?.systemRequirements[0].recomGpu || "",
    },
    enableReinitialize: true,
    validationSchema: gameEditSchema,
    onSubmit,
  });

  const handleDelete = async (e, gameId, imageId) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `https://localhost:44300/api/Product/DeleteImage?imageId=${imageId}&productId=${gameId}`
      );
      setGame((prevGame) => ({
        ...prevGame,
        productImages: prevGame.productImages.filter(
          (image) => image.id !== imageId
        ),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleChangeMain = async (gameId, imageId) => {
    try {
      const response = await axios.put(
        `https://localhost:44300/api/Product/ChangeMainImage?imageId=${imageId}&productId=${gameId}`
      );
      setGame((prevGame) => ({
        ...prevGame,
        productImages: prevGame.productImages.filter(
          (image) => image.id !== imageId
        ),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  return (
    <div>
      {" "}
      <section id="admin-area" style={{ background: "white" }}>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            onClose={handleClose}
            severity={severity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
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
                      Enter game name
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
                    <label htmlFor="description" className="form-label">
                      Enter game description
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
                    <label htmlFor="developerName" className="form-label">
                      Enter game developer
                    </label>
                    <input
                      type="text"
                      name="developerName"
                      onChange={handleChange}
                      value={values.developerName}
                      className="form-control"
                      id="developerName"
                    />
                    {errors.developerName && (
                      <p style={{ color: "red" }}>{errors.developerName}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="publisherName" className="form-label">
                      Enter game publisher name
                    </label>
                    <input
                      type="text"
                      name="publisherName"
                      onChange={handleChange}
                      value={values.publisherName}
                      className="form-control"
                      id="publisherName"
                    />
                    {errors.publisherName && (
                      <p style={{ color: "red" }}>{errors.publisherName}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Enter game price
                    </label>
                    <input
                      type="number"
                      name="price"
                      onChange={handleChange}
                      value={values.price}
                      className="form-control"
                      id="price"
                    />
                    {errors.price && (
                      <p style={{ color: "red" }}>{errors.price}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="count" className="form-label">
                      Enter game count
                    </label>
                    <input
                      type="number"
                      name="count"
                      onChange={handleChange}
                      value={values.count}
                      className="form-control"
                      id="count"
                    />
                    {errors.count && (
                      <p style={{ color: "red" }}>{errors.count}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontWeight: "600", color: "#2A3547", fontSize: 14 }}
                    >
                      Genre
                    </InputLabel>
                    <NativeSelect
                      id="genre-select"
                      name="genreId"
                      value={values.genreId}
                      onChange={handleChange}
                      className="form-control"
                      sx={{ width: "250px", height: "50px" }}
                    >
                      {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.genreName}
                        </option>
                      ))}
                    </NativeSelect>
                    {errors.genreId && (
                      <p style={{ color: "red" }}>{errors.genreId}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontWeight: "600", color: "#2A3547", fontSize: 14 }}
                    >
                      Type
                    </InputLabel>
                    <NativeSelect
                      id="type-select"
                      name="typeId"
                      value={values.typeId}
                      onChange={handleChange}
                      className="form-control"
                      sx={{ width: "250px", height: "50px" }}
                    >
                      {types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.typeName}
                        </option>
                      ))}
                    </NativeSelect>
                    {errors.typeId && (
                      <p style={{ color: "red" }}>{errors.typeId}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontWeight: "600", color: "#2A3547", fontSize: 14 }}
                    >
                      Platform
                    </InputLabel>
                    <NativeSelect
                      id="platform-select"
                      name="platformId"
                      value={values.platformId}
                      onChange={handleChange}
                      className="form-control"
                      sx={{ width: "250px", height: "50px" }}
                    >
                      {platforms.map((platform) => (
                        <option key={platform.id} value={platform.id}>
                          {platform.platformName}
                        </option>
                      ))}
                    </NativeSelect>
                    {errors.platformId && (
                      <p style={{ color: "red" }}>{errors.platformId}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="minOsVersion" className="form-label">
                      Enter minimum OS version
                    </label>
                    <input
                      type="text"
                      name="minOsVersion"
                      onChange={handleChange}
                      value={values.minOsVersion}
                      className="form-control"
                      id="minOsVersion"
                    />
                    {errors.minOsVersion && (
                      <p style={{ color: "red" }}>{errors.minOsVersion}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="minCpuName" className="form-label">
                      Enter minimum CPU name
                    </label>
                    <input
                      type="text"
                      name="minCpuName"
                      onChange={handleChange}
                      value={values.minCpuName}
                      className="form-control"
                      id="minCpuName"
                    />
                    {errors.minCpuName && (
                      <p style={{ color: "red" }}>{errors.minCpuName}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="minMemory" className="form-label">
                      Enter minimum memory
                    </label>
                    <input
                      type="text"
                      name="minMemory"
                      onChange={handleChange}
                      value={values.minMemory}
                      className="form-control"
                      id="minMemory"
                    />
                    {errors.minMemory && (
                      <p style={{ color: "red" }}>{errors.minMemory}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="minGpu" className="form-label">
                      Enter minimum GPU name
                    </label>
                    <input
                      type="text"
                      name="minGpu"
                      onChange={handleChange}
                      value={values.minGpu}
                      className="form-control"
                      id="minGpu"
                    />
                    {errors.minGpu && (
                      <p style={{ color: "red" }}>{errors.minGpu}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recomOsVersion" className="form-label">
                      Enter recommended OS version
                    </label>
                    <input
                      type="text"
                      name="recomOsVersion"
                      onChange={handleChange}
                      value={values.recomOsVersion}
                      className="form-control"
                      id="recomOsVersion"
                    />
                    {errors.recomOsVersion && (
                      <p style={{ color: "red" }}>{errors.recomOsVersion}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recomCpuName" className="form-label">
                      Enter recommended CPU name
                    </label>
                    <input
                      type="text"
                      name="recomCpuName"
                      onChange={handleChange}
                      value={values.recomCpuName}
                      className="form-control"
                      id="recomCpuName"
                    />
                    {errors.recomCpuName && (
                      <p style={{ color: "red" }}>{errors.recomCpuName}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recomMemory" className="form-label">
                      Enter recommended memory
                    </label>
                    <input
                      type="text"
                      name="recomMemory"
                      onChange={handleChange}
                      value={values.recomMemory}
                      className="form-control"
                      id="recomMemory"
                    />
                    {errors.recomMemory && (
                      <p style={{ color: "red" }}>{errors.recomMemory}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recomGpu" className="form-label">
                      Enter recommended GPU
                    </label>
                    <input
                      type="text"
                      name="recomGpu"
                      onChange={handleChange}
                      value={values.recomGpu}
                      className="form-control"
                      id="recomGpu"
                    />
                    {errors.recomGpu && (
                      <p style={{ color: "red" }}>{errors.recomGpu}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="logo" className="form-label">
                      Enter game logo
                    </label>
                    <input
                      type="file"
                      name="logo"
                      onChange={(event) => {
                        setFieldValue("logo", event.currentTarget.files[0]);
                      }}
                      className="form-control"
                      id="logo"
                    />
                    {errors.logo && (
                      <p style={{ color: "red" }}>{errors.logo}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="images" className="form-label">
                      Enter game images
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
                        <div className="col-3">
                          <h4>Logo</h4>
                          <div
                            className="game-logo"
                            style={{
                              backgroundColor: "black",
                              borderRadius: "8px",
                            }}
                          >
                            <img
                              src={`${baseURL}${game?.productLogo}`}
                              alt=""
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="col-12">
                      <div className="row">
                        <h4>Game images</h4>
                        {game?.productImages &&
                          game?.productImages.map((image, index) => {
                            return (
                              <div
                                className="col-3 news-image"
                                key={index}
                                style={{ overflow: "hidden" }}
                              >
                                <img
                                  src={`${baseURL}${image.imageName}`}
                                  alt=""
                                  style={{
                                    width: "100%",
                                    height: "200px",
                                    borderRadius: "8px",
                                    objectFit: image.isMain
                                      ? "contain"
                                      : "cover",
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
                                            handleChangeMain(game.id, image.id)
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
                                          onClick={(e) =>
                                            handleDelete(e, game.id, image.id)
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
                    disabled={isSubmitting || loading}
                    className="btn btn-success"
                    type="submit"
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Update"
                    )}
                  </button>
                  <Link className="btn btn-danger mx-3" to="/admin/games">
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

export default GameEdit;
