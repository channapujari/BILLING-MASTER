import axios from "axios";

export default axios.create({
  baseURL: "http://dct-billing-app.herokuapp.com/api",
});
