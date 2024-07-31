import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
export const basicSchema = yup.object().shape({
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

export const advancedSchema = yup.object().shape({
  email: yup.string().email("Email format is wrong").required("Required"),
  username: yup
    .string()
    .min(3, "Too short")
    .max(16)
    .required("Username is required"),
  password: yup
    .string()
    .min(7, "Too short")
    .matches(passwordRules, {
      message: "Invalid format",
    })
    .required("Required"),
  firstname: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  isAccepted: yup.boolean().oneOf([true], "You must accept terms & conditions"),
});

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp", "avif"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

function getAllowedExt(type) {
  return validFileExtensions[type].map((e) => `.${e}`).toString();
}

const MAX_FILE_SIZE = 1024 * 3000;

export const newsCreateSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  images: yup
    .mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value || !value.length) return false;
      return Array.from(value).every((file) =>
        isValidFileType(file.name.toLowerCase(), "image")
      );
    })
    .test("is-valid-size", "Max allowed size is 3Mb per file", (value) => {
      if (!value || !value.length) return false;
      return Array.from(value).every((file) => file.size <= MAX_FILE_SIZE);
    }),
  content1: yup.string().required("This field is required"),
  content2: yup.string(),
  content3: yup.string(),
});

export const newsEditSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  images: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every((file) =>
        isValidFileType(file.name.toLowerCase(), "image")
      );
    })
    .test("is-valid-size", "Max allowed size is 3MB per file", (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every((file) => file.size <= MAX_FILE_SIZE);
    }),
  content1: yup.string().required("This field is required"),
  content2: yup.string(),
  content3: yup.string(),
});

export const genreCreateSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
});

export const typeCreateSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
});

export const adCreateSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  image: yup
    .mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value) return false;
      return isValidFileType(value.name.toLowerCase(), "image");
    })
    .test("is-valid-size", "Max allowed size is 3Mb", (value) => {
      if (!value) return false;
      return value.size <= MAX_FILE_SIZE;
    }),
});
export const adEditSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  image: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value) return true;
      return isValidFileType(value.name.toLowerCase(), "image");
    })
    .test("is-valid-size", "Max allowed size is 3Mb", (value) => {
      if (!value) return true;
      return value.size <= MAX_FILE_SIZE;
    }),
});

export const platformCreateSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  image: yup
    .mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value) return false;
      return isValidFileType(value.name.toLowerCase(), "image");
    })
    .test("is-valid-size", "Max allowed size is 3Mb", (value) => {
      if (!value) return false;
      return value.size <= MAX_FILE_SIZE;
    }),
});

export const platformEditSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  image: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value) return true;
      return isValidFileType(value.name.toLowerCase(), "image");
    })
    .test("is-valid-size", "Max allowed size is 3Mb", (value) => {
      if (!value) return true;
      return value.size <= MAX_FILE_SIZE;
    }),
});

export const gameCreateSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  developerName: yup.string().required("This field is required"),
  publisherName: yup.string().required("This field is required"),
  price: yup.number().required("This field is required"),
  count: yup.number().required("This field is required"),
  genreId: yup.number().required("This field is required"),
  typeId: yup.number().required("This field is required"),
  platformId: yup.number().required("This field is required"),
  minOsVersion: yup.string().required("This field is required"),
  minCpuName: yup.string().required("This field is required"),
  minMemory: yup.string().required("This field is required"),
  minGpu: yup.string().required("This field is required"),
  recomOsVersion: yup.string().required("This field is required"),
  recomCpuName: yup.string().required("This field is required"),
  recomMemory: yup.string().required("This field is required"),
  recomGpu: yup.string().required("This field is required"),
  logo: yup
    .mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value) return false;
      return isValidFileType(value.name.toLowerCase(), "image");
    })
    .test("is-valid-size", "Max allowed size is 3Mb", (value) => {
      if (!value) return false;
      return value.size <= MAX_FILE_SIZE;
    }),
  images: yup
    .mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value || !value.length) return false;
      return Array.from(value).every((file) =>
        isValidFileType(file.name.toLowerCase(), "image")
      );
    })
    .test("is-valid-size", "Max allowed size is 3Mb per file", (value) => {
      if (!value || !value.length) return false;
      return Array.from(value).every((file) => file.size <= MAX_FILE_SIZE);
    }),
});

export const gameEditSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  developerName: yup.string().required("This field is required"),
  publisherName: yup.string().required("This field is required"),
  price: yup.number().required("This field is required"),
  count: yup.number().required("This field is required"),
  genreId: yup.number().required("This field is required"),
  typeId: yup.number().required("This field is required"),
  platformId: yup.number().required("This field is required"),
  minOsVersion: yup.string().required("This field is required"),
  minCpuName: yup.string().required("This field is required"),
  minMemory: yup.string().required("This field is required"),
  minGpu: yup.string().required("This field is required"),
  recomOsVersion: yup.string().required("This field is required"),
  recomCpuName: yup.string().required("This field is required"),
  recomMemory: yup.string().required("This field is required"),
  recomGpu: yup.string().required("This field is required"),
  logo: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value) return true;
      return isValidFileType(value.name.toLowerCase(), "image");
    })
    .test("is-valid-size", "Max allowed size is 3Mb", (value) => {
      if (!value) return true;
      return value.size <= MAX_FILE_SIZE;
    }),
  images: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value || !value.length) return true;
      return Array.from(value).every((file) =>
        isValidFileType(file.name.toLowerCase(), "image")
      );
    })
    .test("is-valid-size", "Max allowed size is 3Mb per file", (value) => {
      if (!value || !value.length) return true;
      return Array.from(value).every((file) => file.size <= MAX_FILE_SIZE);
    }),
});
