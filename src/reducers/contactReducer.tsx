import {
  FETCH_CONTACT_ERROR,
  FETCH_CONTACT_START,
  FETCH_CONTACT_SUCCESS,
} from "../utils/action.types";

interface ContactState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  data: {},
  loading: false,
  error: null,
};

const contactReducer = (state = initialState, action: any): ContactState => {
  switch (action.type) {
    case FETCH_CONTACT_START:
      return { ...state, loading: true, error: null };
    case FETCH_CONTACT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_CONTACT_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default contactReducer;
