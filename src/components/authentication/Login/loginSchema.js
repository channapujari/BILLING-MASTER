import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is Required"),
  password: Yup.string().required("Password is required"),
});

export default loginSchema;
