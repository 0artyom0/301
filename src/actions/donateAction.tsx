import {
  ACCOUNT_TYPE_MODAL,
  IS_DONATE_MODAL,
  IS_HOME_PAGE,
  OPEN_DONATE_SINGLE_PROJECT,
  RECOMMENTED_MODAL_OPEN,
} from "../utils/action.types";

export const openDonateModal = (val: boolean) => ({
  type: IS_DONATE_MODAL,
  payload: val,
});

export const openAccountTypeModal = (accountType: any) => ({
  type: ACCOUNT_TYPE_MODAL,
  payload: accountType,
});
export const isHomePageModal = (val: boolean) => ({
  type: IS_HOME_PAGE,
  payload: val,
});

export const openRecommentedModal = (val: boolean) => ({
  type: RECOMMENTED_MODAL_OPEN,
  payload: val,
});
export const openDonateSingleProject = (val: boolean, from: string) => ({
  type: OPEN_DONATE_SINGLE_PROJECT,
  payload: {
    val,
    from,
  },
});
