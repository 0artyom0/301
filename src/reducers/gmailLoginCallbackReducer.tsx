import {
  GMAIL_LOGIN_CALLBACK_ERROR,
  GMAIL_LOGIN_CALLBACK_START,
  GMAIL_LOGIN_CALLBACK_SUCCESS,
} from "../utils/action.types";

interface GmailCallbackState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: GmailCallbackState = {
  data: null,
  loading: false,
  error: null,
};

const gmailLoginCallbackReducer = (
  state = initialState,
  action: any
): GmailCallbackState => {
  switch (action.type) {
    case GMAIL_LOGIN_CALLBACK_START:
      return { ...state, loading: true, error: null };
    case GMAIL_LOGIN_CALLBACK_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GMAIL_LOGIN_CALLBACK_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default gmailLoginCallbackReducer;
