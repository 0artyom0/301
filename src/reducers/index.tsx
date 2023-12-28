import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./homeReducer";
import projectReducer from "./projectReducer";
import projectDetailsReducer from "./projectDetailsReducer";
import languageDitactorReducer from "./languageReducer";
import aboutUsReducer from "./aboutUsReducer";
import privacyPolicyReducer from "./privacyPolicyReducer";
import expertProjectReducer from "./expertProjectReducer";
import authReducer from "./authReducer";
import registerDataReducer from "./registerDataReducer";
import congratsReducer from "./congratsReducer";
import favoriteProjectsReducer from "./favoriteProjectsReducer";
import contactReducer from "./contactReducer";
import gmailLoginCallbackReducer from "./gmailLoginCallbackReducer";
import facebookLoginCallbackReducer from "./facebookLoginCallback";
import socialMediasReducer from "./socialMediasLogin";
import donationReducer from "./donationReducer";

const rootReducer = combineReducers({
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
});

export default rootReducer;
