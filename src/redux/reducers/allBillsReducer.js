const initialBills = [];
const allBillsReducer = (state = initialBills, action) => {
  switch (action.type) {
    case "GET_BILLS": {
      return [...action.payload];
    }
    case "DELETE_BILL": {
      return state.filter((bill) => bill._id !== action.payload._id);
    }
    default: {
      return [...state];
    }
  }
};

export default allBillsReducer;
