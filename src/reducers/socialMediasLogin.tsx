import {
  SOCIAL_MEDIAS_LOGIN_ERROR,
  SOCIAL_MEDIAS_LOGIN_START,
  SOCIAL_MEDIAS_LOGIN_SUCCESS,
} from "../utils/action.types";

interface SocialMediasLoginState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: SocialMediasLoginState = {
  data: null,
  loading: false,
  error: null,
};

const socialMediasReducer = (
  state = initialState,
  action: any
): SocialMediasLoginState => {
  switch (action.type) {
    case SOCIAL_MEDIAS_LOGIN_START:
      return { ...state, loading: true, error: null };
    case SOCIAL_MEDIAS_LOGIN_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case SOCIAL_MEDIAS_LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default socialMediasReducer;
