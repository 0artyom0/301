import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingFacebookCallback } from "../actions/apiActions";
import { RootState } from "../store/configureStore";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { login } from "../actions/authActions";

const LoginFacebook = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const state = location.search.split("code=")[1];
  useEffect(() => {
    state &&
      dispatch(
        //@ts-ignore
        fetchingFacebookCallback(
          `auth/facebook/callback?lang=${lang}&code=${state}`
        )
      );
  }, [state, dispatch]);

  const [hasNavigated, setHasNavigated] = useState(false);
  const data = useSelector(
    (state: RootState) => state.facebookLoginCallback.data
  );
  const navigate = useNavigate();
  const lang = cookies.get("i18next");

  useEffect(() => {
    if (data && data.access_token) {
      //   if (data.user.role === null) {
      if (data.registered === "registered") {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(login());
        navigate(`/${lang}`);
      } else navigate(`/${lang}/signUp`);
      //   } else navigate(`/${lang}/`);
      setHasNavigated(true);
    }
  }, [data, dispatch, navigate, hasNavigated, lang]);

  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "150px",
      }}>
      <h1>{t("login-with-fb")}</h1>
    </div>
  );
};

export default LoginFacebook;
