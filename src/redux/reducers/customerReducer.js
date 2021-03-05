const initialState = [];

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CUSTOMER": {
      return [...state, action.payload];
    }
    case "DELETE_CUSTOMER": {
      return state.filter((customer) => customer._id !== action.payload._id);
    }
    case "EDIT_CUSTOMER": {
      return state.map((customer) => {
        if (customer._id === action.payload._id) {
          return { ...customer, ...action.payload };
        } else {
          return { ...customer };
        }
      });
    }
    case "GET_CUSTOMERS": {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default customerReducer;
