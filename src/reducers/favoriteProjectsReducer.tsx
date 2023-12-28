import {
  FETCH_FAVORITE_PROJECTS_START,
  FETCH_FAVORITE_PROJECTS_SUCCESS,
} from "../utils/action.types";

interface favoriteProjectsState {
  favoriteProjectsData: any;
  loading: boolean;
  error: string | null;
}

const initialState: favoriteProjectsState = {
  favoriteProjectsData: null,
  loading: false,
  error: null,
};

const projectDetailsReducer = (
  state = initialState,
  action: any
): favoriteProjectsState => {
  switch (action.type) {
    case FETCH_FAVORITE_PROJECTS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FAVORITE_PROJECTS_SUCCESS:
      return {
        loading: false,
        favoriteProjectsData: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default projectDetailsReducer;
