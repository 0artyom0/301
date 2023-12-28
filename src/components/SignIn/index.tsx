import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import FB from "../../assets/logo/fb.svg";
import GMAIL from "../../assets/logo/gmail.svg";
import PATTERN_1 from "../../assets/patterns/login-small.svg";
import PATTERN_2 from "../../assets/patterns/login-big.svg";
// import {
//   changePassSchema,
//   forgetPassShcema,
//   signInSchema,
// } from "../../Validation";
import { Formik } from "formik";
import "./index.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import {
  fetchingSocialMediaLogin,
  usePostRequest,
} from "../../actions/apiActions";
import { Spin } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import CHECK_EMAIL_ICON from "../../assets/checkEmailIcon.svg";
import { hasPreviousHistory, history } from "../Navbar";
import Terms from "../Terms";
import cookies from "js-cookie";
import { RootState } from "../../store/configureStore";
import { login } from "../../actions/authActions";
import { congratsModal } from "../../actions/congratsAction";
import EYE_OPEN from "../../assets/eye-open-gray.svg";
import EYE_CLOSE from "../../assets/eye-close-gray.svg";
import ValidationSchema from "../../Validation";

const SignIn = () => {
  const [forgetPassword, setForgetPassword] = useState(false);
  const handleForgetPassword = () => setForgetPassword(true);
  const navigate = useNavigate();
  const lang = cookies.get("i18next");

  const windowSize = useWindowSize();
  const { t } = useTranslation();
  const { postRequest, postLoading, response, error } = usePostRequest();

  const [hasNavigated, setHasNavigated] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const resetPass = searchParams.get("resetPass");
  const { signInSchema, forgetPassShcema, changePassSchema } =
    ValidationSchema();

  const signInState = () => {
    if (forgetPassword) return forgetPassShcema;
    else if (resetPass) return changePassSchema;
    else return signInSchema;
  };
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlSearchParams.get("token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);

      urlSearchParams.delete("token");
      const newSearch = urlSearchParams.toString();

      history.replace({
        pathname: window.location.pathname,
        search: newSearch,
      });
    }
  }, []);

  const socialMediaRedirectedData = useSelector(
    (state: RootState) => state.socialMediaLogin.data
  );
  useEffect(() => {
    if (socialMediaRedirectedData && socialMediaRedirectedData.url) {
      window.location.href = socialMediaRedirectedData.url;
    }
  }, [socialMediaRedirectedData]);
  useEffect(() => {
    if (response && response.data?.access_token) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(login());
      setHasNavigated(true);
      !hasNavigated && navigate(`/${lang}/`);
    } else if (error && error.response?.data) {
      if (
        error.response?.status == 401 &&
        error.response?.data.response_code === 34
      )
        dispatch(congratsModal(true, t("validation-errors.data-invalid")));
    }
    if (response) {
      if (response.data?.response_code === 17) {
        dispatch(congratsModal(true, t("validation-errors.pass-updated")));
        navigate(`/${lang}/`);
      }
    }
    if (error) {
      if (error.response?.data.response_code === 16) {
        dispatch(congratsModal(true, t("validation-errors.pass-not-updated")));
      }
      if (error.response?.data.response_code === 14) {
        dispatch(congratsModal(true, t("validation-errors.email-not-exist")));
      }
      if (error.response?.data.response_code === 18) {
        dispatch(congratsModal(true, t("validation-errors.user-not-exist")));
      }
    }
  }, [response, dispatch, navigate, hasNavigated, lang, error]);

  const [showPassword, setShowPassword] = useState(false);

  const navigateBack = () => {
    if (hasPreviousHistory()) navigate(-1);
    else {
      navigate("/");
    }
  };

  return (
    <>
      <Modal setOpenModal={navigateBack} openModal={true} headerShow={true}>
        <div className='modal_signIn'>
          {windowSize.width > 800 && (
            <div className='modal_signIn_leftSide'>
              <img
                src={PATTERN_1}
                alt='Pattern'
                decoding='async'
                loading='lazy'
              />
              <img
                src={PATTERN_2}
                alt='Pattern'
                decoding='async'
                loading='lazy'
              />
              <img
                src={PATTERN_1}
                alt='Pattern'
                decoding='async'
                loading='lazy'
              />
            </div>
          )}
          <div className='modal_signIn_rightSide'>
            <div
              className={`${
                forgetPassword && "modal_signIn_title_forgetPass"
              } modal_signIn_title`}>
              <p>
                {forgetPassword
                  ? response?.status === 201
                    ? t("forget-pass.check-email")
                    : t("forget-pass.forget-pass")
                  : t("sign-in.welcome")}
              </p>
              {forgetPassword && (
                <p className='forgetPass_desc'>
                  {response?.status === 201
                    ? t("forget-pass.sent-email")
                    : t("forget-pass.enter-email")}
                </p>
              )}
            </div>
            {forgetPassword &&
            response?.status === 201 &&
            response?.data.response_code === 15 ? (
              <div className='checkEmail_icon'>
                <img
                  src={CHECK_EMAIL_ICON}
                  alt='Check Email'
                  decoding='async'
                  loading='lazy'
                />
              </div>
            ) : (
              <Formik
                validationSchema={signInState()}
                initialValues={{
                  email: "",
                  password: "",
                  password_confirmation: "",
                }}
                onSubmit={values => {
                  if (forgetPassword) {
                    postRequest(
                      "reset-password-request",
                      { email: values.email, lang },
                      {}
                    );
                  } else if (resetPass) {
                    postRequest(
                      "change-password",
                      {
                        token,
                        password: values.password,
                        password_confirmation: values.password_confirmation,
                      },
                      {}
                    );
                  } else {
                    postRequest("login", values, {});
                    // submit(values);
                    // fetchData(values);
                  }
                }}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    className='signIn_form'>
                    <div className='signIn_formFields'>
                      {!resetPass && (
                        <>
                          <input
                            placeholder={t("sign-in.email")}
                            type='email'
                            name='email'
                            className='form'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <p className='error'>
                            {errors.email && touched.email && errors.email}
                          </p>
                        </>
                      )}
                      {(!forgetPassword || resetPass) && (
                        <>
                          <div className='passwordInputField'>
                            <input
                              placeholder={t("inputs.password")}
                              type={showPassword ? "text" : "password"}
                              name='password'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className='form'
                            />
                            <button
                              type='button'
                              onClick={e => {
                                e.preventDefault();
                                setShowPassword(!showPassword);
                              }}>
                              <img
                                src={showPassword ? EYE_OPEN : EYE_CLOSE}
                                alt='Eye'
                              />
                            </button>
                          </div>
                          <p className='error'>
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </p>
                        </>
                      )}
                      {resetPass && (
                        <>
                          <input
                            placeholder={t("inputs.password_confirmation")}
                            type='password'
                            name='password_confirmation'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password_confirmation}
                            className='form'
                          />
                          <p className='error'>
                            {errors.password_confirmation &&
                              touched.password_confirmation &&
                              errors.password_confirmation}
                          </p>
                        </>
                      )}
                    </div>
                    {response?.error && (
                      <p className='error'>{response.error}</p>
                    )}
                    {!forgetPassword && !resetPass && (
                      <div className='forgetPassword'>
                        <button onClick={handleForgetPassword} type='button'>
                          {t("sign-in.forget-pass")}
                        </button>
                      </div>
                    )}
                    <Button
                      text={
                        postLoading ? (
                          <Spin size='small' className='btn_spinner' />
                        ) : forgetPassword ? (
                          t("forget-pass.send")
                        ) : (
                          t("navbar.sign-in")
                        )
                      }
                      link={false}
                      to=''
                      style={{
                        background: "#DD264E",
                        color: "#fff",
                        width: "100%",
                      }}
                      type='submit'
                      className='signIn-btn'
                    />
                  </form>
                )}
              </Formik>
            )}
            {!forgetPassword && !resetPass ? (
              <div className='signIn_another'>
                <div className='signIn_another_title'>
                  <div className='line'></div>
                  <p>{t("sign-in.login-with")}</p>
                  <div className='line'></div>
                </div>
                <div className='signIn_another_icons'>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      dispatch(
                        //@ts-ignore
                        fetchingSocialMediaLogin(`auth/google?lang=${lang}`)
                      );
                    }}>
                    <img
                      src={GMAIL}
                      alt='Gmail'
                      decoding='async'
                      loading='lazy'
                    />
                  </button>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      dispatch(
                        //@ts-ignore
                        fetchingSocialMediaLogin(`auth/facebook?lang=${lang}`)
                      );
                    }}>
                    <img
                      src={FB}
                      alt='Facebook'
                      decoding='async'
                      loading='lazy'
                    />
                  </button>
                </div>
                <Terms aboutUs={false} />
              </div>
            ) : forgetPassword && response?.status === 201 ? null : (
              <div
                className={`${
                  forgetPassword && "signIn_another_privacy_forgetPass"
                } signIn_another_privacy`}>
                <p>
                  {t("forget-pass.need-help")}
                  <span className='mentioned_txt'>
                    {t("forget-pass.support")}
                  </span>
                </p>
              </div>
            )}
            <div className='signIn_signUp'>
              <p>
                {forgetPassword && response?.status ? (
                  <>
                    {t("forget-pass.back-to")}
                    <button
                      className='mentioned_txt'
                      onClick={() => setForgetPassword(false)}>
                      {t("navbar.sign-in")}
                    </button>
                  </>
                ) : (
                  <>
                    {t("sign-in.notHavingAcc")}{" "}
                    <NavLink
                      className='mentioned_txt'
                      to={`/${lang}/signUp`}
                      // onClick={() => setSignUp(true)}
                    >
                      {t("sign-in.sign-up")}
                    </NavLink>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(SignIn);
