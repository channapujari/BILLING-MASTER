import axios from "../../config/axios";
import swal from "sweetalert";

//Get all products.
const getProducts = (products) => {
  return {
    type: "GET_PRODUCTS",
    payload: products,
  };
};
export const startGetProducts = () => {
  return (dispatch) => {
    axios
      .get("/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const products = response.data;
        dispatch(getProducts(products));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

// Add a product.

const addProduct = (product) => {
  return {
    type: "ADD_PRODUCT",
    payload: product,
  };
};

export const startAddProducts = (formData, handleRedirect) => {
  return (dispatch) => {
    axios
      .post("/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const product = response.data;
        dispatch(addProduct(product));
        handleRedirect();
        swal("Product added successfully!");
      })
      .catch((error) => alert(error.message));
  };
};

// Remove product.

const deleteProduct = (deletedProduct) => {
  return {
    type: "DELETE_PRODUCT",
    payload: deletedProduct,
  };
};

export const startRemoveProduct = (id) => {
  return (dispatch) => {
    axios
      .delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const deletedProduct = response.data;
        dispatch(deleteProduct(deletedProduct));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

// Edit product.

const updateProduct = (product) => {
  return { type: "EDIT_PRODUCT", payload: product };
};
export const startEditProduct = (product, id, handleRedirect) => {
  return (dispatch) => {
    axios
      .put(`/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        //console.log(response.data)
        const product = response.data;
        handleRedirect();
        dispatch(updateProduct(product));
      })
      .catch((err) => alert(err.message));
  };
};
