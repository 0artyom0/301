import {
  ACCOUNT_TYPE_MODAL,
  FETCH_START,
  IS_HOME_PAGE,
} from "../utils/action.types";
import { FETCH_SUCCESS } from "../utils/action.types";
import { FETCH_ERROR } from "../utils/action.types";
import { HomeData } from "../utils/api.types";

interface HomeState {
  data: HomeData;
  loading: boolean;
  error: string | null;
  accountType: {
    open: boolean;
    id: number;
    name: string;
    type: string;
  };
  isHomePage: boolean;
}

const initialState: HomeState = {
  data: {} as HomeData,
  loading: false,
  error: null,
  accountType: {
    open: false,
    id: 0,
    name: "",
    type: "",
  },
  isHomePage: false,
};

const homeReducer = (state = initialState, action: any): HomeState => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ACCOUNT_TYPE_MODAL:
      return { ...state, accountType: action.payload };
    case IS_HOME_PAGE:
      return { ...state, isHomePage: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
