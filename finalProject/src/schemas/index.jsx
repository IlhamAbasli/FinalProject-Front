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

export const gameCreateSchema = yup.object().shape({});
