import axios from "../../config/axios";
import swal from "sweetalert";

//Get all customers.
const getCustomer = (customers) => {
  return {
    type: "GET_CUSTOMERS",
    payload: customers,
  };
};
export const startGetCustomers = () => {
  return (dispatch) => {
    axios
      .get("/customers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const customers = response.data;
        dispatch(getCustomer(customers));
      })
      .catch();
  };
};

// Add a customer.

const addCustomer = (customer) => {
  return {
    type: "ADD_CUSTOMER",
    payload: customer,
  };
};

export const startAddCustomer = (formData, handleRedirect) => {
  return (dispatch) => {
    axios
      .post("/customers", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const customer = response.data;
        dispatch(addCustomer(customer));
        handleRedirect();
        swal("Customer added successfully!");
      })
      .catch((error) => alert(error.message));
  };
};

// Remove customer.

const deleteCustomer = (deletedCustomer) => {
  return {
    type: "DELETE_CUSTOMER",
    payload: deletedCustomer,
  };
};

export const startRemoveCustomer = (id) => {
  return (dispatch) => {
    axios
      .delete(`/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const deletedCustomer = response.data;
        dispatch(deleteCustomer(deletedCustomer));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

// Edit Customer.

const updateCustomer = (customer) => {
  return { type: "EDIT_CUSTOMER", payload: customer };
};
export const startEditCustomer = (customer, id, handleRedirect) => {
  return (dispatch) => {
    axios
      .put(`/customers/${id}`, customer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        //console.log(response.data)
        const customer = response.data;
        handleRedirect();
        dispatch(updateCustomer(customer));
      })
      .catch((err) => alert(err.message));
  };
};
