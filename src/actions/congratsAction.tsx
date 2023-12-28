import { CONGRATS_MODAL } from "../utils/action.types";

export const congratsModal = (val: boolean, text: string | null) => ({
  type: CONGRATS_MODAL,
  payload: {
    val,
    text,
  },
});
