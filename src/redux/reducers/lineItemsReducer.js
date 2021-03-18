const initialLineItems = [];

const lineItems = (state = initialLineItems, action) => {
  switch (action.type) {
    case "ADD_LINEITEMS": {
      return [...state, action.payload];
    }
    case "REMOVE_LINEITEMS": {
      return state.filter((product) => product.product !== action.payload);
    }
    case "EMPTY_LINEITEMS": {
      state.length = 0;
      return [...state];
    }
    default: {
      return [...state];
    }
  }
};

export default lineItems;
