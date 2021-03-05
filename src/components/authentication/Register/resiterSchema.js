import * as Yup from "yup";

const regusterSchema = Yup.object().shape({
  username: Yup.string("Name must be a String")
    .required("Name is Required")
    .min(8, "Username must be at least 8 characters long"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  businessName: Yup.string().required("Business name is Required"),
  address: Yup.string().required("Address is Required"),
});

export default regusterSchema;
