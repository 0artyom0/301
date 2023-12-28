import {
  FETCH_DONATION_ERROR,
  FETCH_DONATION_START,
  FETCH_DONATION_SUCCESS,
} from "../utils/action.types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const donationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_DONATION_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DONATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DONATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default donationReducer;
