const initialState = [];
const currentBillReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GENERATE_BILL": {
      return [{ ...action.payload }];
    }
    default: {
      return [...state];
    }
  }
};

export default currentBillReducer;
