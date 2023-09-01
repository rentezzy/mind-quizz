import * as yup from "yup";
export const SEmail = yup
  .string()
  .email("Email isn't valid.")
  .required("Email is required.")
  .max(100, "Email is too long");
export const SPassword = yup
  .string()
  .required("Password is required.")
  .max(100, "Password is too long");
