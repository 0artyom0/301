import { CONGRATS_MODAL } from "../utils/action.types";

const initialState = {
  open: false,
  text: null,
};

const congratsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CONGRATS_MODAL:
      return {
        ...state,
        open: action.payload.val,
        text: action.payload.text,
      };
    default:
      return state;
  }
};

export default congratsReducer;
