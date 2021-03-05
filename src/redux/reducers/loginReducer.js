const initialUserState = false;

const loginReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "TOGGLE_STATE": {
      return !state;
    }
    default: {
      return state;
    }
  }
};
export default loginReducer;
