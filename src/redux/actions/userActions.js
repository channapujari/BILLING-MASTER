import axios from "../../config/axios";
import swal from "sweetalert";

//User Login
export const startLoginUser = (formData, handleRedirect) => {
  return (dispatch) => {
    axios
      .post("/users/login", formData)
      .then((response) => {
        const result = response.data;
        if (result?.errors) {
          swal("Oops!", "Invalid email or password!", "error");
        } else {
          localStorage.setItem("token", result.token);
          handleRedirect();
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

//Register a user.

export const startRegisterUser = (formData, handleRedirect) => {
  return (dispatch) => {
    axios
      .post("/users/register", formData)
      .then((response) => {
        const result = response.data;
        if (result?.keyValue?.username) {
          swal("Oops!", "Username already exists", "error");
        } else if (result?.keyValue?.email) {
          swal("Oops!", "Email already exists", "error");
        } else {
          handleRedirect();
        }
      })
      .catch((error) => alert(error.message));
  };
};

//GET user details.

const getInfo = (user) => {
  return {
    type: "GET_INFO",
    payload: user,
  };
};

export const startGetUserInfo = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        dispatch(getInfo(result));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};



// check if the user logged in.

export const toggleStatus = () => {
  return {
    type: "TOGGLE_STATE",
  };
};