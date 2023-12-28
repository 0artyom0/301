import Modal from "../Modal";
import EcosystemModal from "../EcosystemModal";
import { Select, Checkbox, Popconfirm, Spin } from "antd";
import "./index.css";
import Button from "../Button";
import INFO_ICON from "../../assets/info-icon.svg";
import countries from "../../locales/countries.json";
import country_dial from "../../locales/country_dial.json";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import {
  fetchingPrivacyPolicy,
  fetchingRegisterData,
  usePostRequest,
} from "../../actions/apiActions";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store/configureStore";
import { congratsModal } from "../../actions/congratsAction";
import { useLocation, useNavigate } from "react-router";
import Terms from "../Terms";
import cookies from "js-cookie";
import { login } from "../../actions/authActions";
import EYE_OPEN from "../../assets/eye-open-gray.svg";
import EYE_CLOSE from "../../assets/eye-close-gray.svg";
import ValidationSchema from "../../Validation";

const { Option } = Select;

const filterOption = (
  input: string,
  option: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const filterOptionTel = (
  input: string,
  option: { label: string; value: string }
) => (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

const filterOptionSages = (input: string, option: any) =>
  (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

const AccountTypeModal = () => {
  const { t } = useTranslation();
  const lang = cookies.get("i18next");
  const dispatch = useDispatch();
  const confirmAgreementTerms = () => {
    navigate(`/${lang}/agreementTerms`);
  };
  const confirmClubCodeEthics = () => {
    navigate(`/${lang}/clubCodeOfEthics`);
  };
  const location = useLocation();

  const [howDoYouKnow, setHowDoYouKnow] = useState<string>("");
  const handleHowDoYouKnowChange = (val: string) => setHowDoYouKnow(val);
  const handleCheckboxChange = (e: any, form: any) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    let updatedProjectsInterested;

    if (isChecked) {
      updatedProjectsInterested = [...form.values.projects_interested, value];
    } else {
      updatedProjectsInterested = form.values.projects_interested.filter(
        (item: string) => item !== value
      );
    }

    form.setFieldValue("projects_interested", updatedProjectsInterested);
  };
  const [participation_form, setParticipation_form] = useState("");
  const [telCode, setTelCode] = useState("");
  const handleTelCode = (val: string) => setTelCode(val);

  const { postRequest, postLoading, response, error } = usePostRequest();
  const donatePostRequest = usePostRequest();
  const [hasNavigated, setHasNavigated] = useState(false);
  const gmailLoginCallbackData = useSelector(
    (state: RootState) => state.gmailLoginCallback.data
  );

  const facebookLoginCallbackData = useSelector(
    (state: RootState) => state.facebookLoginCallback.data
  );
  useEffect(() => {
    if (
      response &&
      response.data &&
      (response.data.access_token || response.data.user) &&
      !hasNavigated
    ) {
      setHasNavigated(true);
      if (gmailLoginCallbackData || facebookLoginCallbackData) {
        if (gmailLoginCallbackData)
          localStorage.setItem("token", gmailLoginCallbackData.access_token);
        else if (facebookLoginCallbackData)
          localStorage.setItem("token", facebookLoginCallbackData.access_token);
      } else localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (!location.pathname.includes("donation")) {
        dispatch(login());
        !hasNavigated && navigate(`/${lang}/`);
      }
    }
  }, [response, dispatch, error, t, location]);

  useEffect(() => {
    if (response?.data?.user) {
      if (location.pathname.includes("donation")) {
        localStorage.setItem("donationToRegister", "true");
        const result = {
          ...response.data.user,
          lang,
        };
        donatePostRequest.postRequest("donation", result, {
          Authorization: `Bearer ${response.data.access_token}`,
        });
        // console.log(response.data);
      } else {
        dispatch(congratsModal(true, t("congrats.register")));
      }
    }
  }, [response]);

  useEffect(() => {
    if (donatePostRequest.response) {
      if (donatePostRequest.response.data?.redirectURL) {
        // console.log(donatePostRequest.response);
        window.location.href = donatePostRequest.response.data.redirectURL;
      } else if (donatePostRequest.response.data?.message) {
        dispatch(congratsModal(true, donatePostRequest.response.data?.message));
        donatePostRequest.response.data?.user &&
          localStorage.setItem(
            "user",
            JSON.stringify(donatePostRequest.response.data?.user)
          );
      }
    }
  }, [donatePostRequest.response]);

  const { data } = useSelector((state: RootState) => state.registerData);
  const id = +location.search?.split("?")[1]?.split("=")[1];
  const type = location.search?.split("?")[2]?.split("=")[1];
  const navigate = useNavigate();
  useEffect(() => {
    //@ts-ignore
    dispatch(fetchingRegisterData("get-register-data"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      //@ts-ignore
      fetchingPrivacyPolicy("get-data")
    );
  }, [dispatch]);

  const privacyData = useSelector(
    (state: RootState) => state.privacyPolicy.data
  );

  const {
    doanteSignUpSchema,
    otherSignUpSchema,
    signUpSchema,
    socialMediaRegisterSchema,
  } = ValidationSchema();

  const schema = () => {
    if (location.pathname.includes("donation")) {
      return doanteSignUpSchema;
    } else {
      if (gmailLoginCallbackData || facebookLoginCallbackData)
        return socialMediaRegisterSchema;
      else if (id == 3) return otherSignUpSchema;
      else return signUpSchema;
    }
  };

  useEffect(() => {
    if (error && error.response) {
      const value1 = Object.values(JSON.parse(error.response.data)).flat()[0];
      const value2 = Object.values(JSON.parse(error.response.data)).flat()[1];
      if (value1) {
        dispatch(
          congratsModal(true, t("validation-errors.email-already-taken"))
        );
      }
      if (value2) {
        dispatch(congratsModal(true, `${value2}`));
      }
      if (value1 && value2) {
        dispatch(congratsModal(true, `${value1} and ${value2}`));
      }
    }
  }, [error]);

  // console.log(error?.response);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <Modal
      setOpenModal={() => navigate(-1)}
      openModal={true}
      className='signUp_overlay'
      headerShow={false}>
      <EcosystemModal
        back={true}
        onClose={() => navigate(-1)}
        header={t(`footer.ecosystem.${type}`)}
        className='modal_back'>
        <Formik
          validationSchema={schema()}
          initialValues={{
            name:
              gmailLoginCallbackData?.user?.name ||
              facebookLoginCallbackData?.user?.name ||
              "",
            last_name:
              gmailLoginCallbackData?.user?.last_name ||
              facebookLoginCallbackData?.user?.last_name ||
              "",
            email:
              gmailLoginCallbackData?.user?.email ||
              facebookLoginCallbackData?.user?.email ||
              "",
            phone: "",
            organization: "",
            how_did_you_know: "",
            projects_interested: [],
            recommendation_from: "",
            country: "",
            password: "",
            password_confirmation: "",
            subscription_type: `annual`,
            participation_form: "",
            sages_id: "",
            agreement_terms: false,
            club_code_of_ethics_301: false,
            support_form: false,
          }}
          onSubmit={values => {
            const completePhoneNumber = `${telCode} ${values.phone}`;
            const result = {
              ...values,
              phone: completePhoneNumber,
              type,
              // agreement_terms: agreementTermsChecked,
              // club_code_of_ethics_301: clubCodeOfEthics301Checked,
              // support_form: supportFormChecked,
              user_id: (gmailLoginCallbackData || facebookLoginCallbackData)
                ?.user?.id,
              lang,
            };
            // console.log(result);
            // console.log(completePhoneNumber);
            if (gmailLoginCallbackData || facebookLoginCallbackData) {
              let token = "";
              if (gmailLoginCallbackData)
                token = gmailLoginCallbackData.access_token;
              if (facebookLoginCallbackData)
                token = facebookLoginCallbackData.access_token;
              postRequest("update-user", result, {
                Authorization: `Bearer ${token}`,
              });
            } else {
              postRequest("register-user", result, {});
            }
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form noValidate onSubmit={handleSubmit} className='signUp_form'>
              <div className='signUp_formInputs'>
                <div className='signUp_form1st'>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_name'>{t("inputs.name")}*</label>
                    <input
                      type='text'
                      id='signUp_name'
                      name='name'
                      className='signUp_input'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <p className='error'>
                      {errors.name && touched.name
                        ? (errors.name as string)
                        : null}
                    </p>
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_surname'>
                      {t("inputs.surname")}*
                    </label>
                    <input
                      type='text'
                      id='signUp_surname'
                      name='last_name'
                      className='signUp_input'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                    />
                    <p className='error'>
                      {errors.last_name && touched.last_name
                        ? (errors.last_name as string)
                        : null}
                    </p>
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_oraganization'>
                      {t("inputs.organization")}*
                    </label>
                    <input
                      type='text'
                      id='signUp_oraganization'
                      name='organization'
                      className='signUp_input'
                      value={values.organization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className='error'>
                      {errors.organization && touched.organization
                        ? (errors.organization as string)
                        : null}
                    </p>
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_country'>
                      {t("inputs.country")}*
                    </label>
                    <Field name='country'>
                      {
                        //@ts-ignore
                        ({ _, form }) => (
                          <Select
                            // {...field}
                            showSearch
                            optionFilterProp='children'
                            className='signUp_selector'
                            onChange={(_, obj: any) => {
                              form.setFieldValue("country", obj.label);
                            }}
                            //@ts-ignore
                            filterOption={filterOption}
                            options={countries}
                          />
                        )
                      }
                    </Field>
                    <ErrorMessage
                      name='country'
                      component='p'
                      className='error'
                    />
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_recommendation'>
                      {t("inputs.recommendation")}*
                    </label>
                    <input
                      type='text'
                      id='signUp_recommendation'
                      name='recommendation_from'
                      className='signUp_input'
                      value={values.recommendation_from}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* <Field name='recommendation_from'>
                      {
                        //@ts-ignore
                        ({ _, form }) => (
                          <Select
                            showSearch
                            optionFilterProp='children'
                            className='signUp_selector'
                            onChange={(_, obj: any) => {
                              form.setFieldValue(
                                "recommendation_from",
                                obj.value
                              );
                            }}
                            //@ts-ignore
                            filterOption={filterOptionSages}>
                            {data?.sages.map((sage: any, i: number) => (
                              <Option
                                key={i}
                                value={`${sage.name} ${sage.last_name}`}>
                                {`${sage[`name_${lang}`]} ${
                                  sage[`last_name_${lang}`]
                                }`}
                              </Option>
                            ))}
                          </Select>
                        )
                      }
                    </Field> */}
                    <ErrorMessage
                      name='recommendation_from'
                      component='p'
                      className='error'
                    />
                  </div>
                  {type === "experts" && (
                    <div className='signUp_formGroup'>
                      <label htmlFor='signUp_sages'>{t("which_sages")}*</label>
                      <Field name='sages_id'>
                        {
                          //@ts-ignore
                          ({ _, form }) => (
                            <Select
                              className='signUp_selector'
                              showSearch
                              optionFilterProp='children'
                              onChange={(_, obj: any) => {
                                form.setFieldValue("sages_id", obj.key);
                              }}
                              //@ts-ignore
                              filterOption={filterOptionSages}>
                              {data?.sages.map((sage: any, i: number) => (
                                <Option
                                  key={i}
                                  value={`${sage.name} ${sage.last_name}`}>
                                  {`${sage[`name_${lang}`]} ${
                                    sage[`last_name_${lang}`]
                                  }`}
                                </Option>
                              ))}
                            </Select>
                          )
                        }
                      </Field>
                      <p className='error'>
                        {errors.sages_id && touched.sages_id && errors.sages_id}
                      </p>
                      {/* <ErrorMessage
                        name='sages_id'
                        component='p'
                        className='error'
                      /> */}
                    </div>
                  )}
                </div>
                <div className='signUp_form2nd'>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_fund'>
                      {t("inputs.how_did_you_know")}*
                    </label>
                    <Field name='how_did_you_know'>
                      {
                        //@ts-ignore
                        ({ _, form }) => (
                          <>
                            <Checkbox
                              className='signUp_radio'
                              value='Social network'
                              checked={howDoYouKnow === "Social network"}
                              onChange={e => {
                                handleHowDoYouKnowChange(e.target.value);
                                form.setFieldValue(
                                  "how_did_you_know",
                                  e.target.value
                                );
                              }}>
                              {t("checkboxes.social_network")}
                            </Checkbox>
                            <Checkbox
                              value='Community Members 301'
                              checked={howDoYouKnow === "Community Members 301"}
                              className='signUp_radio'
                              onChange={e => {
                                handleHowDoYouKnowChange(e.target.value);
                                form.setFieldValue(
                                  "how_did_you_know",
                                  e.target.value
                                );
                              }}>
                              {t("checkboxes.community_members_301")}
                            </Checkbox>
                            <Checkbox
                              value='other'
                              checked={howDoYouKnow === "other"}
                              className='signUp_radio'
                              onChange={e => {
                                handleHowDoYouKnowChange(e.target.value);
                                // form.setFieldValue(
                                //   "how_did_you_know",
                                //   e.target.value
                                // );
                              }}>
                              {t("checkboxes.other")}
                            </Checkbox>
                            {howDoYouKnow === "other" ? (
                              <input
                                type='text'
                                id='signUp_howDoYouKnow'
                                placeholder='Enter URL'
                                name='how_did_you_know'
                                className='signUp_input howDoYouKnow_other'
                                value={values.how_did_you_know}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            ) : null}
                          </>
                        )
                      }
                    </Field>
                    <ErrorMessage
                      name='how_did_you_know'
                      component='p'
                      className='error'
                    />
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_project'>
                      {t("inputs.projects_interested")}
                    </label>
                    <Field name='projects_interested'>
                      {
                        //@ts-ignore
                        ({ _, form }) => (
                          <>
                            <Checkbox
                              className='signUp_radio'
                              onChange={e => {
                                handleCheckboxChange(e, form);
                              }}>
                              {t("checkboxes.education")}
                            </Checkbox>
                            <Checkbox
                              className='signUp_radio'
                              value='All directions'
                              onChange={e => {
                                handleCheckboxChange(e, form);
                              }}>
                              {t("checkboxes.all_directions")}
                            </Checkbox>
                            <Checkbox
                              value='The science'
                              className='signUp_radio'
                              onChange={e => {
                                handleCheckboxChange(e, form);
                              }}>
                              {t("checkboxes.science")}
                            </Checkbox>
                            <Checkbox
                              value='Innovation'
                              className='signUp_radio'
                              onChange={e => {
                                handleCheckboxChange(e, form);
                              }}>
                              {t("checkboxes.innovation")}
                            </Checkbox>
                            <Checkbox
                              value='Culture'
                              className='signUp_radio'
                              onChange={e => {
                                handleCheckboxChange(e, form);
                              }}>
                              {t("checkboxes.culture")}
                            </Checkbox>
                            <Checkbox
                              value='Holistic development of territories'
                              className='signUp_radio'
                              onChange={e => {
                                handleCheckboxChange(e, form);
                              }}>
                              {t("checkboxes.territories")}
                            </Checkbox>
                          </>
                        )
                      }
                    </Field>
                    <ErrorMessage
                      name='projects_interested'
                      component='p'
                      className='error'
                    />
                  </div>
                  {id === 3 && (
                    <div className='signUp_formGroup'>
                      <label htmlFor='signUp_fund'>
                        {t("inputs.participation_form")}*
                      </label>
                      <Field name='participation_form'>
                        {
                          //@ts-ignore
                          ({ _, form }) => (
                            <>
                              <Checkbox
                                value='Consultations'
                                checked={participation_form === "Consultations"}
                                className='signUp_radio'
                                onChange={e => {
                                  setParticipation_form(e.target.value);
                                  form.setFieldValue(
                                    "participation_form",
                                    e.target.value
                                  );
                                }}>
                                {t("checkboxes.consultations")}
                              </Checkbox>
                              <Checkbox
                                value='Project activities'
                                checked={
                                  participation_form === "Project activities"
                                }
                                className='signUp_radio'
                                onChange={e => {
                                  setParticipation_form(e.target.value);
                                  form.setFieldValue(
                                    "participation_form",
                                    e.target.value
                                  );
                                }}>
                                {t("checkboxes.project_activities")}
                              </Checkbox>
                              <Checkbox
                                value='both options'
                                checked={participation_form === "both options"}
                                className='signUp_radio'
                                onChange={e => {
                                  setParticipation_form(e.target.value);
                                  form.setFieldValue(
                                    "participation_form",
                                    e.target.value
                                  );
                                }}>
                                {t("checkboxes.both_options")}
                              </Checkbox>
                            </>
                          )
                        }
                      </Field>
                      <ErrorMessage
                        name='how_did_you_know'
                        component='p'
                        className='error'
                      />
                    </div>
                  )}
                </div>
                <div className='signUp_form3rd'>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_email'>{t("sign-in.email")}*</label>
                    <input
                      type='text'
                      id='signUp_email'
                      name='email'
                      className='signUp_input'
                      value={values.email}
                      onChange={handleChange}
                    />
                    <p className='error'>
                      {errors.email && touched.email
                        ? (errors.email as string)
                        : null}{" "}
                    </p>
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='signUp_tel'>{t("inputs.phone")}</label>
                    <div className='signUp_tel'>
                      <Select
                        className='signUp_selector'
                        showSearch
                        placeholder={t("inputs.choose")}
                        optionFilterProp='children'
                        onChange={handleTelCode}
                        //@ts-ignore
                        filterOption={filterOptionTel}
                        // options={country_dial}
                      >
                        {country_dial.map(country => (
                          <Option key={country.value} value={country.label}>
                            <div
                              className='custom-option'
                              style={{ display: "flex", gap: "6px" }}>
                              <span
                                className={`fi fi-${country.value.toLowerCase()}`}
                              />
                              {country.label}
                            </div>
                          </Option>
                        ))}
                      </Select>
                      <div className='signUp_telWrapper'>
                        <input
                          type='number'
                          name='phone'
                          id='signUp_tel'
                          className='signUp_input'
                          value={values.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <p className='error'>
                      {(values.phone &&
                        !telCode &&
                        "You should add tel code") ||
                        (telCode &&
                          !values.phone &&
                          "You should add phone number")}
                    </p>
                  </div>
                  {facebookLoginCallbackData ||
                  gmailLoginCallbackData ? null : (
                    <>
                      <div className='signUp_formGroup'>
                        <label htmlFor='signUp_password'>
                          {t("inputs.password")}*
                        </label>
                        <div className='passwordInputField'>
                          <input
                            type={showPassword1 ? "text" : "password"}
                            id='signUp_password'
                            name='password'
                            className='signUp_input'
                            value={values.password}
                            onChange={handleChange}
                          />
                          <button
                            type='button'
                            onClick={() => setShowPassword1(!showPassword1)}>
                            <img
                              src={showPassword1 ? EYE_OPEN : EYE_CLOSE}
                              alt='Eye'
                            />
                          </button>
                        </div>
                        <p className='error'>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                      <div className='signUp_formGroup'>
                        <label htmlFor='signUp_repeatPassword'>
                          {t("inputs.password_confirmation")}*
                        </label>
                        <div className='passwordInputField'>
                          <input
                            type={showPassword2 ? "text" : "password"}
                            id='signUp_repeatPassword'
                            name='password_confirmation'
                            className='signUp_input'
                            value={values.password_confirmation}
                            onChange={handleChange}
                          />
                          <button
                            type='button'
                            onClick={() => setShowPassword2(!showPassword2)}>
                            <img
                              src={showPassword2 ? EYE_OPEN : EYE_CLOSE}
                              alt='Eye'
                            />
                          </button>
                        </div>
                        <p className='error'>
                          {errors.password_confirmation &&
                            touched.password_confirmation &&
                            errors.password_confirmation}
                        </p>
                      </div>
                    </>
                  )}
                  {location.pathname.includes("donation") && (
                    <div className='signUp_formGroup'>
                      <label htmlFor='signUp_subs_type'>
                        {t("inputs.subs_type")}*
                      </label>
                      <Field name='subscription_type'>
                        {
                          //@ts-ignore
                          ({ _, form }) => (
                            <Select
                              // {...field}
                              showSearch
                              optionFilterProp='children'
                              className='signUp_selector'
                              onChange={(_, obj: any) => {
                                form.setFieldValue(
                                  "subscription_type",
                                  obj.value
                                );
                              }}
                              //@ts-ignore
                              filterOption={filterOption}
                              defaultValue={`${t("payments.annual")} 3612$`}
                              options={[
                                {
                                  label: `${t("payments.annual")} 3612$`,
                                  value: "annual",
                                },
                                {
                                  label: `${t("payments.monthly")} 301$`,
                                  value: "monthly",
                                },
                              ]}
                            />
                          )
                        }
                      </Field>
                      <ErrorMessage
                        name='subscription_type'
                        component='p'
                        className='error'
                      />
                    </div>
                  )}
                  <div className='signUp_formGroup terms_formGroup'>
                    <div
                      className='signUp_info'
                      style={{
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "flex-start",
                      }}>
                      <div>
                        <Checkbox
                          className='signUp_radio'
                          checked={values.agreement_terms}
                          onChange={() =>
                            setFieldValue(
                              "agreement_terms",
                              !values.agreement_terms
                            )
                          }>
                          {t("checkboxes.agreement_terms")}*
                        </Checkbox>
                        <Popconfirm
                          className='signUp_popover'
                          icon={false}
                          description={
                            <span
                              dangerouslySetInnerHTML={{
                                __html: privacyData?.agreementTerms
                                  ? //@ts-ignore
                                    privacyData?.agreementTerms[
                                      `description_${lang}`
                                    ].slice(0, 230)
                                  : "",
                              }}
                            />
                          }
                          //@ts-ignore
                          onConfirm={confirmAgreementTerms}
                          //@ts-ignore
                          // onCancel={cancel}
                          okText='more'
                          showCancel={false}
                          title={undefined}>
                          <img
                            src={INFO_ICON}
                            alt='Info'
                            decoding='async'
                            loading='lazy'
                          />
                        </Popconfirm>
                      </div>
                      <ErrorMessage
                        name='agreement_terms'
                        component='p'
                        className='error'
                      />
                    </div>
                    <div
                      className='signUp_info'
                      style={{
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "flex-start",
                      }}>
                      <div>
                        <Checkbox
                          className='signUp_radio'
                          checked={values.club_code_of_ethics_301}
                          onChange={() =>
                            setFieldValue(
                              "club_code_of_ethics_301",
                              !values.club_code_of_ethics_301
                            )
                          }>
                          {t("checkboxes.club_code_of_ethics_301")}*
                        </Checkbox>
                        <Popconfirm
                          className='signUp_popover'
                          description={
                            <span
                              dangerouslySetInnerHTML={{
                                __html: privacyData?.clubCodeOfEthics
                                  ? //@ts-ignore
                                    privacyData?.clubCodeOfEthics[
                                      `description_${lang}`
                                    ].slice(0, 230)
                                  : "",
                              }}
                            />
                          }
                          icon={false}
                          //@ts-ignore
                          onConfirm={confirmClubCodeEthics}
                          //@ts-ignore
                          okText='more'
                          showCancel={false}
                          title={undefined}>
                          <img
                            src={INFO_ICON}
                            alt='Info'
                            decoding='async'
                            loading='lazy'
                          />
                        </Popconfirm>
                      </div>
                      <ErrorMessage
                        name='club_code_of_ethics_301'
                        component='p'
                        className='error'
                      />
                    </div>
                    <div
                      className='signUp_info'
                      style={{
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "flex-start",
                      }}>
                      <div>
                        <Checkbox
                          className='signUp_radio'
                          checked={values.support_form}
                          onChange={() =>
                            setFieldValue("support_form", !values.support_form)
                          }>
                          {t("checkboxes.support_form")}
                        </Checkbox>
                        <Popconfirm
                          className='signUp_popover popover_support_from'
                          description={
                            <div className='support_popover'>
                              <div className='support_popover-list-item'>
                                <div className='support_popover-list-circle'></div>
                                <div
                                  className='support_popover-list-text'
                                  dangerouslySetInnerHTML={{
                                    __html: t("privacy.support_popover_1"),
                                  }}
                                />
                              </div>
                              <div className='support_popover-list-item'>
                                <div className='support_popover-list-circle'></div>
                                <div
                                  className='support_popover-list-text'
                                  dangerouslySetInnerHTML={{
                                    __html: t("privacy.support_popover_2"),
                                  }}
                                />
                              </div>
                            </div>
                          }
                          icon={false}
                          okText={""}
                          showCancel={false}
                          title={undefined}>
                          <img
                            src={INFO_ICON}
                            alt='Info'
                            decoding='async'
                            loading='lazy'
                          />
                        </Popconfirm>
                      </div>
                      <ErrorMessage
                        name='support_form'
                        component='p'
                        className='error'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='signUp_btns'>
                <Button
                  text={
                    postLoading ? (
                      <Spin size='small' className='btn_spinner' />
                    ) : (
                      t("btns.register")
                    )
                  }
                  link={false}
                  to={""}
                  type='submit'
                  style={{
                    background:
                      isValid &&
                      ((values.phone === "" && telCode === "") ||
                        (values.phone !== "" && telCode !== ""))
                        ? "#dd264e"
                        : "#A3A3A3",
                    border: "none",
                    color: "#fff",
                  }}
                  disabled={
                    (values.phone !== "" && telCode === "") ||
                    (values.phone === "" && telCode !== "")
                  }
                  className='donation_btn'
                />
                <Terms aboutUs={false} />
              </div>
            </form>
          )}
        </Formik>
      </EcosystemModal>
    </Modal>
  );
};

export default AccountTypeModal;
