import {
  FACEBOOK_LOGIN_CALLBACK_ERROR,
  FACEBOOK_LOGIN_CALLBACK_START,
  FACEBOOK_LOGIN_CALLBACK_SUCCESS,
} from "../utils/action.types";

interface FacebookCallbackState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: FacebookCallbackState = {
  data: null,
  loading: false,
  error: null,
};

const facebookLoginCallbackReducer = (
  state = initialState,
  action: any
): FacebookCallbackState => {
  switch (action.type) {
    case FACEBOOK_LOGIN_CALLBACK_START:
      return { ...state, loading: true, error: null };
    case FACEBOOK_LOGIN_CALLBACK_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FACEBOOK_LOGIN_CALLBACK_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default facebookLoginCallbackReducer;
