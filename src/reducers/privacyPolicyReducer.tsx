import {
  FETCH_PRIVACY_POLICY_START,
  FETCH_PRIVACY_POLICY_SUCCESS,
  FETCH_PRIVACY_POLICY_ERROR,
  OPEN_PRIVACY_POLICY,
  MODAL_NAME,
  AGREEMENT_TERMS,
} from "../utils/action.types";
import { PrivactPolicy } from "../utils/api.types";

interface PrivacyPolicyState {
  data: PrivactPolicy;
  loading: boolean;
  error: string | null;
  privacyPolicy: {
    modal: boolean;
    privacyHeader: null | string;
    privacy: null | string;
  };
  modalName: string;
  agreementTerms: {
    modal: boolean;
    text: string | null;
    from: string;
  };
}

const initialState: PrivacyPolicyState = {
  data: {} as PrivactPolicy,
  loading: false,
  error: null,
  privacyPolicy: {
    modal: false,
    privacyHeader: null,
    privacy: null,
  },
  modalName: "",
  agreementTerms: {
    modal: false,
    text: null,
    from: "",
  },
};

const privacyPolicyReducer = (
  state = initialState,
  action: any
): PrivacyPolicyState => {
  switch (action.type) {
    case FETCH_PRIVACY_POLICY_START:
      return { ...state, loading: true, error: null };
    case FETCH_PRIVACY_POLICY_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_PRIVACY_POLICY_ERROR:
      return { ...state, loading: false, error: action.payload };
    case OPEN_PRIVACY_POLICY:
      return {
        ...state,
        privacyPolicy: {
          modal: action.payload.modal,
          privacyHeader: action.payload.privacyHeader,
          privacy: action.payload.privacy,
        },
      };
    case MODAL_NAME:
      return {
        ...state,
        modalName: action.payload,
      };
    case AGREEMENT_TERMS:
      return {
        ...state,
        agreementTerms: {
          modal: action.payload.modal,
          text: action.payload.text,
          from: action.payload.from,
        },
      };
    default:
      return state;
  }
};

export default privacyPolicyReducer;
