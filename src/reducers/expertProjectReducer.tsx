import {
  FETCH_EXPERT_PROJECT_START,
  FETCH_EXPERT_PROJECT_SUCCESS,
  FETCH_EXPERT_PROJECT_ERROR,
  FETCH_PARTNERS_SUCCESS,
  RECOMMENTED_MODAL_OPEN,
} from "../utils/action.types";

interface ExpertProjectState {
  data: any;
  loading: boolean;
  error: string | null;
  partners: any;
  modalOpen: boolean;
}

const initialState: ExpertProjectState = {
  data: {},
  partners: null,
  loading: false,
  error: null,
  modalOpen: false,
};

const expertProjectReducer = (
  state = initialState,
  action: any
): ExpertProjectState => {
  switch (action.type) {
    case FETCH_EXPERT_PROJECT_START:
      return { ...state, loading: true, error: null };
    case FETCH_EXPERT_PROJECT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_EXPERT_PROJECT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case FETCH_PARTNERS_SUCCESS:
      return { ...state, loading: false, partners: action.payload };
    case RECOMMENTED_MODAL_OPEN:
      return {
        ...state,
        modalOpen: action.payload,
      };
    default:
      return state;
  }
};

export default expertProjectReducer;
