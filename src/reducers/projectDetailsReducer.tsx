import {
  DETAILS_PROJECT_FETCH_START,
  DETAILS_PROJECT_FETCH_SUCCESS,
  DETAILS_PROJECT_FETCH_ERROR,
  IS_DONATE_MODAL,
} from "../utils/action.types";

interface ProjectsState {
  data: any;
  loading: boolean;
  error: string | null;
  isDonateModal: boolean;
}

const initialState: ProjectsState = {
  data: [],
  loading: false,
  error: null,
  isDonateModal: false,
};

const projectDetailsReducer = (
  state = initialState,
  action: any
): ProjectsState => {
  switch (action.type) {
    case DETAILS_PROJECT_FETCH_START:
      return { ...state, loading: true, error: null };
    case DETAILS_PROJECT_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DETAILS_PROJECT_FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case IS_DONATE_MODAL:
      return {
        ...state,
        isDonateModal: action.payload,
      };
    default:
      return state;
  }
};

export default projectDetailsReducer;
