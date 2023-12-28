import { LANGUAGE_DITACTOR } from "../utils/action.types";

export const languageDitactor = (lang: string) => ({
  type: LANGUAGE_DITACTOR,
  payload: lang,
});
