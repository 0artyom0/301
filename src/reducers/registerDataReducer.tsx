import {
  FETCH_REGISTER_DATA_START,
  FETCH_REGISTER_DATA_SUCCESS,
  FETCH_REGISTER_DATA_ERROR,
} from "../utils/action.types";

const initialState = {
  loading: false,
  data: null,
  error: null,
  gmail: null,
};

const registerDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_REGISTER_DATA_START:
      return { ...state, loading: true, error: null };
    case FETCH_REGISTER_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_REGISTER_DATA_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default registerDataReducer;
