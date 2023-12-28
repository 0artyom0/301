import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../reducers/homeReducer";
import projectReducer from "../reducers/projectReducer";
import projectDetailsReducer from "../reducers/projectDetailsReducer";
import languageDitactorReducer from "../reducers/languageReducer";
import aboutUsReducer from "../reducers/aboutUsReducer";
import privacyPolicyReducer from "../reducers/privacyPolicyReducer";
import expertProjectReducer from "../reducers/expertProjectReducer";
import authReducer from "../reducers/authReducer";
import registerDataReducer from "../reducers/registerDataReducer";
import congratsReducer from "../reducers/congratsReducer";
import favoriteProjectsReducer from "../reducers/favoriteProjectsReducer";
import contactReducer from "../reducers/contactReducer";
import gmailLoginCallbackReducer from "../reducers/gmailLoginCallbackReducer";
import facebookLoginCallbackReducer from "../reducers/facebookLoginCallback";
import socialMediasReducer from "../reducers/socialMediasLogin";
import donationReducer from "../reducers/donationReducer";

const store = configureStore({
  reducer: {
    homeData: homeReducer,
    projectData: projectReducer,
    projectDetails: projectDetailsReducer,
    languageDitactor: languageDitactorReducer,
    aboutUs: aboutUsReducer,
    privacyPolicy: privacyPolicyReducer,
    expertProject: expertProjectReducer,
    auth: authReducer,
    registerData: registerDataReducer,
    congrats: congratsReducer,
    favoriteProjects: favoriteProjectsReducer,
    contact: contactReducer,
    socialMediaLogin: socialMediasReducer,
    gmailLoginCallback: gmailLoginCallbackReducer,
    facebookLoginCallback: facebookLoginCallbackReducer,
    donation: donationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
