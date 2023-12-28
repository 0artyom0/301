import {
  FETCH_ABOUT_US_ERROR,
  FETCH_ABOUT_US_START,
  FETCH_ABOUT_US_SUCCESS,
} from "../utils/action.types";

interface AbousUsState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: AbousUsState = {
  data: {},
  loading: false,
  error: null,
};

const aboutUsReducer = (state = initialState, action: any): AbousUsState => {
  switch (action.type) {
    case FETCH_ABOUT_US_START:
      return { ...state, loading: true, error: null };
    case FETCH_ABOUT_US_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_ABOUT_US_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default aboutUsReducer;
