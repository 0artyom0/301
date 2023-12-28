import { LANGUAGE_DITACTOR } from "../utils/action.types";

interface ProjectsState {
  lang: string;
}

const initialState: ProjectsState = {
  lang: "ru",
};

const languageDitactorReducer = (
  state = initialState,
  action: any
): ProjectsState => {
  switch (action.type) {
    case LANGUAGE_DITACTOR:
      return {
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default languageDitactorReducer;
