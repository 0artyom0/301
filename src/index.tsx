import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import store from "./store/configureStore";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

i18next
  .use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["ru", "en", "am"],
    fallbackLng: "ru",
    // debug: false,
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

root.render(
  <BrowserRouter>
    {/* <Suspense fallback='Loading'> */}
    <Provider store={store}>
      {/* <I18nextProvider i18n={i18n}> */}
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
      {/* </I18nextProvider> */}
    </Provider>
    {/* </Suspense> */}
  </BrowserRouter>
);

reportWebVitals();
