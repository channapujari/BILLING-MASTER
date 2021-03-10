const initialState = [];

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return [...state, action.payload];
    }
    case "GET_PRODUCTS": {
      return [...action.payload];
    }
    case "DELETE_PRODUCT": {
      return state.filter((product) => product._id !== action.payload._id);
    }
    case "EDIT_PRODUCT": {
      return state.map((product) => {
        if (product._id === action.payload._id) {
          return { ...product, ...action.payload };
        } else {
          return { ...product };
        }
      });
    }
    default: {
      return [...state];
    }
  }
};

export default productReducer;
