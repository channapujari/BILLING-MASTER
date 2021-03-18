import axios from "../../config/axios";

// Add lineItems

export const addLineItems = (data) => {
  return { type: "ADD_LINEITEMS", payload: data };
};

//Remove lineItems

export const removeLineItems = (id) => {
  return { type: "REMOVE_LINEITEMS", payload: id };
};
// empty lineItems
export const emptyLineItems = () => {
  return { type: "EMPTY_LINEITEMS" };
};

//Generate Bill

const generateBill = (bill) => {
  return {
    type: "GENERATE_BILL",
    payload: bill,
  };
};
export const startGenerateBill = (billData) => {
  return (dispatch) => {
    axios
      .post("/bills", billData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const result = res.data;
        dispatch(generateBill(result));
      })
      .catch((err) => alert(err.message));
  };
};

// GET all bills

const allBills = (bills) => {
  return {
    type: "GET_BILLS",
    payload: bills,
  };
};
export const startGetAllBills = () => {
  return (dispatch) => {
    axios
      .get("/bills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const result = res.data;
        dispatch(allBills(result));
      })
      .catch((err) => alert(err.message));
  };
};

// Delete a bill

const deleteBill = (bill) => {
  return {
    type: "DELETE_BILL",
    payload: bill,
  };
};

export const startDeleteBill = (id) => {
  return (dispatch) => {
    axios
      .delete(`/bills/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const result = res.data;
        dispatch(deleteBill(result));
      })
      .catch((err) => alert(err.message));
  };
};
