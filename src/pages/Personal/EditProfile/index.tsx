import { Select, Spin } from "antd";
import "./index.css";
import { useTranslation } from "react-i18next";
import country_dial from "../../../locales/country_dial.json";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CLOUD from "../../../assets/cloud.svg";
import PROF_PIC from "../../../assets/prof-pic.png";
import FACEBOOK from "../../../assets/personal-fb.svg";
import INSTAGRAM from "../../../assets/personal-instagram.svg";
import LINKEDIN from "../../../assets/personal-linkedIn.svg";
import TELEGRAM from "../../../assets/personal-telegram.svg";
import VIBER from "../../../assets/personal-viber.svg";
import CLOSE from "../../../assets/close.svg";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { usePostRequest } from "../../../actions/apiActions";
import ARROW from "../../../assets/edit-profile/arrow-down.svg";
import { useWindowSize } from "../../../hooks/useWindowSize";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { congratsModal } from "../../../actions/congratsAction";
import cookies from "js-cookie";
import { Formik } from "formik";
// import { editProfileSchema } from "../../../Validation";
import { useNavigate } from "react-router";
import { scrollToTop } from "../../../globalFunctions/scrollToTop";
import EYE_OPEN from "../../../assets/eye-open-gray.svg";
import EYE_CLOSE from "../../../assets/eye-close-gray.svg";
import ValidationSchema from "../../../Validation";
const { Option } = Select;

const EditProfile = () => {
  const { t } = useTranslation();
  const filterOptionTel = (
    input: string,
    option: { label: string; value: string }
  ) => (option?.value ?? "").toLowerCase().includes(input.toLowerCase());
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));
  // const user = useSelector((state: RootState) => state.auth.user);
  const lang = cookies.get("i18next");

  // const [formData, setFormData] = useState({
  //   id: user.id,
  //   name: user.name,
  //   last_name: user.last_name,
  //   email: user.email,
  //   about_me_en: user[`about_me_${lang}`],
  //   phone: user.phone,
  //   current_password: "",
  //   password: "",
  //   password_confirmation: "",
  //   image: "",
  // });
  const [imagePreview, setImagePreview] = useState<any>("");
  const [image, setImage] = useState<any>("");
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("image", file);
      setImagePreview(URL.createObjectURL(file));
      setImage(data.getAll("image"));
    }
  };

  const separatePhoneNumber = (phone: string) => {
    const regex = /^(\+\d{1,3})\s?(\d+)$/;
    const matches = phone?.match(regex);
    let countryCode = "";
    let restOfNumber = "";

    if (matches && matches.length === 3) {
      countryCode = matches[1];
      restOfNumber = matches[2];
    }
    return {
      countryCode,
      restOfNumber,
    };
  };

  const [telCode, setTelCode] = useState(
    separatePhoneNumber(user?.phone).countryCode || ""
  );

  const { postRequest, postLoading, response, error } = usePostRequest();
  const windowSize = useWindowSize();
  const [openNewLink, setOpenNewLink] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (response) {
      if (response.data?.response_code === 20 && !hasNavigated) {
        dispatch(
          congratsModal(true, t("validation-errors.user-update-successfully"))
        );
        localStorage.setItem("user", JSON.stringify(response.data?.user));
        navigate(`/${lang}/personal/personal-info`);
        scrollToTop();
        setHasNavigated(true);
        // if (response.data?.message === "User data update successfully")
      }
    } else if (error) {
      // if (error) {
      if (
        error.response?.status == 422 &&
        error.response?.data?.response_code === 19
      )
        dispatch(congratsModal(true, t("errors.old-pass-not-match")));
      // }
    }
  }, [response, error]);
  console.log(error?.response);

  const [validateFormData, setValidateFormData] = useState({
    name: false,
    last_name: false,
    about_me: false,
    phone: false,
  });
  const shouldSendRequest = Object.values(validateFormData).some(val => val);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const { editProfileSchema } = ValidationSchema();

  return (
    <div className='personalInfo_wrapper'>
      <Helmet>
        <title>
          {user.name} {user.last_name} | Edit Profile
        </title>
      </Helmet>
      <p className='personalInfo_title'>{t("personal.edit-profile")}</p>
      <Formik
        validationSchema={editProfileSchema}
        initialValues={{
          name: user?.name,
          last_name: user?.last_name,
          about_me: user[`about_me_en`],
          phone: separatePhoneNumber(user?.phone).restOfNumber,
          email: user?.email,
          current_password: "",
          password: "",
          password_confirmation: "",
        }}
        onSubmit={values => {
          const completePhoneNumber = `${telCode} ${values.phone}`;
          const formData = {
            id: user.id,
            about_me_en: values.about_me,
            image,
            ...values,
            phone: completePhoneNumber,
          };
          // console.log(formData);
          const token = localStorage.getItem("token");
          postRequest("edit-profile", formData, {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          });
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
        }) => (
          <form className='personal_form' noValidate onSubmit={handleSubmit}>
            <div className='prof_pic'>
              <div>
                <div className='signUp_formGroup'>
                  <label htmlFor='personal_name'>{t("inputs.name")}</label>
                  <input
                    type='text'
                    id='personal_name'
                    name='name'
                    className='signUp_input'
                    onChange={e => {
                      handleChange(e);
                      if (e.target.value !== user.name) {
                        setValidateFormData(prev => ({
                          ...prev,
                          name: true,
                        }));
                      } else {
                        setValidateFormData(prev => ({
                          ...prev,
                          name: false,
                        }));
                      }
                    }}
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
                  <label htmlFor='personal_surname'>
                    {t("inputs.surname")}
                  </label>
                  <input
                    type='text'
                    id='personal_surname'
                    name='last_name'
                    className='signUp_input'
                    onChange={e => {
                      handleChange(e);
                      if (e.target.value !== user.last_name) {
                        setValidateFormData(prev => ({
                          ...prev,
                          last_name: true,
                        }));
                      } else {
                        setValidateFormData(prev => ({
                          ...prev,
                          last_name: false,
                        }));
                      }
                    }}
                    onBlur={handleBlur}
                    value={values.last_name}
                  />
                  <p className='error'>
                    {errors.last_name && touched.last_name
                      ? (errors.last_name as string)
                      : null}
                  </p>
                </div>
              </div>
              <div className='pic'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  id='pic_upload'
                />
                <img
                  src={imagePreview ? imagePreview : PROF_PIC}
                  alt='Profile'
                  className='prof_img'
                  decoding='async'
                  loading='lazy'
                />
                <label htmlFor='pic_upload'>
                  <img
                    src={CLOUD}
                    alt='Cloud'
                    decoding='async'
                    loading='lazy'
                  />
                  {t("personal.replace")}
                </label>
              </div>
            </div>
            <div className='signUp_formGroup signUp_textareaGroup'>
              <label htmlFor='personal_about'>{t("personal.about-me")}</label>
              <textarea
                id='personal_about'
                name='about_me'
                // rows={7}
                // cols={60}
                onChange={e => {
                  handleChange(e);
                  if (e.target.value !== user.about_me) {
                    setValidateFormData(prev => ({
                      ...prev,
                      about_me: true,
                    }));
                  } else {
                    setValidateFormData(prev => ({
                      ...prev,
                      about_me: false,
                    }));
                  }
                }}
                onBlur={handleBlur}
                value={values.about_me}
                className='signUp_textarea'
              />
            </div>
            <div className='signUp_formGroup'>
              <label htmlFor='personal_tel'>{t("inputs.phone")}</label>
              <div className='signUp_tel'>
                <Select
                  className='signUp_selector'
                  showSearch
                  placeholder={t("inputs.choose")}
                  optionFilterProp='children'
                  onChange={val => setTelCode(val)}
                  value={telCode || undefined}
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
                    id='personal_tel'
                    name='phone'
                    className='signUp_input'
                    onChange={e => {
                      handleChange(e);
                      if (e.target.value !== user.phone) {
                        setValidateFormData(prev => ({
                          ...prev,
                          phone: true,
                        }));
                      } else {
                        setValidateFormData(prev => ({
                          ...prev,
                          phone: false,
                        }));
                      }
                    }}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </div>
              </div>
              <p className='error'>
                {(values.phone && !telCode && "You should add tel code") ||
                  (telCode && !values.phone && "You should add phone number")}
              </p>
            </div>
            <div className='signUp_formGroup'>
              <label htmlFor='personal_email'>{t("sign-in.email")}</label>
              <input
                type='text'
                id='personal_email'
                name='email'
                className='signUp_input'
                onChange={e => {
                  handleChange(e);
                  if (e.target.value !== user.email) {
                    setValidateFormData(prev => ({
                      ...prev,
                      email: true,
                    }));
                  } else {
                    setValidateFormData(prev => ({
                      ...prev,
                      email: false,
                    }));
                  }
                }}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className='error'>
                {errors.email && touched.email
                  ? (errors.email as string)
                  : null}
              </p>
            </div>
            <div className='signUp_formGroup'>
              <label htmlFor='personal_pass'>
                {t("inputs.password_current")}
              </label>
              <div className='passwordInputField'>
                <input
                  type={showPassword1 ? "text" : "password"}
                  id='personal_pass'
                  name='current_password'
                  className='signUp_input'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.current_password}
                />
                <button
                  type='button'
                  onClick={e => {
                    e.preventDefault();
                    setShowPassword1(!showPassword1);
                  }}>
                  <img src={showPassword1 ? EYE_OPEN : EYE_CLOSE} alt='Eye' />
                </button>
              </div>
            </div>
            <div className='signUp_formGroup'>
              <label htmlFor='personal_newPass'>
                {t("inputs.password_new")}
              </label>
              <div className='passwordInputField'>
                <input
                  type={showPassword2 ? "text" : "password"}
                  id='personal_newPass'
                  name='password'
                  className='signUp_input'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <button
                  type='button'
                  onClick={e => {
                    e.preventDefault();
                    setShowPassword2(!showPassword2);
                  }}>
                  <img src={showPassword2 ? EYE_OPEN : EYE_CLOSE} alt='Eye' />
                </button>
              </div>
              <p className='error'>
                {errors.password && touched.password
                  ? (errors.password as string)
                  : null}
              </p>
            </div>
            <div className='signUp_formGroup'>
              <label htmlFor='personal_repeatPass'>
                {t("inputs.password_confirmation")}
              </label>
              <div className='passwordInputField'>
                <input
                  type={showPassword3 ? "text" : "password"}
                  id='personal_repeatPass'
                  name='password_confirmation'
                  className='signUp_input'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                />
                <button
                  type='button'
                  onClick={e => {
                    e.preventDefault();
                    setShowPassword3(!showPassword3);
                  }}>
                  <img src={showPassword3 ? EYE_OPEN : EYE_CLOSE} alt='Eye' />
                </button>
              </div>
              <p className='error'>
                {errors.password_confirmation && touched.password_confirmation
                  ? (errors.password_confirmation as string)
                  : null}
              </p>
            </div>
            <p className='onTheWeb'>{t("personal.on_the_web")}</p>
            <div className='personal_add_socialMedias'>
              <p className='onTheWeb'>{t("personal.social-media")}</p>
              <div className='socialMedia_inputs'>
                <div>
                  <img
                    src={FACEBOOK}
                    alt='Facebook'
                    decoding='async'
                    loading='lazy'
                  />
                  {windowSize.width > 600 ? (
                    <p>Facebook</p>
                  ) : (
                    <input
                      placeholder='Facebook'
                      value='@arnak.qerobyanh'
                      className='socialMedia_input'
                    />
                  )}
                </div>
                <div>
                  {windowSize.width > 600 && (
                    <input
                      placeholder='Facebook'
                      value='@arnak.qerobyanh'
                      className='socialMedia_input'
                    />
                  )}
                  <button onClick={e => e.preventDefault()}>
                    <img
                      src={CLOSE}
                      alt='Close'
                      decoding='async'
                      loading='lazy'
                    />
                  </button>
                </div>
              </div>
              <div className='socialMedia_inputs'>
                <div>
                  <img
                    src={INSTAGRAM}
                    alt='Instagram'
                    decoding='async'
                    loading='lazy'
                  />
                  {windowSize.width > 600 ? (
                    <p>Instagram</p>
                  ) : (
                    <input
                      placeholder='Instagram'
                      value='@arnak.qerobyanh'
                      className='socialMedia_input'
                    />
                  )}
                </div>
                <div>
                  {windowSize.width > 600 && (
                    <input
                      placeholder='Instagram'
                      value='@arnak.qerobyanh'
                      className='socialMedia_input'
                    />
                  )}
                  <button onClick={e => e.preventDefault()}>
                    <img
                      src={CLOSE}
                      alt='Close'
                      decoding='async'
                      loading='lazy'
                    />
                  </button>
                </div>
              </div>
              <div className='socialMedia_inputs'>
                <div>
                  <img
                    src={LINKEDIN}
                    alt='Linked In'
                    decoding='async'
                    loading='lazy'
                  />
                  {windowSize.width > 600 ? (
                    <p>Linked In</p>
                  ) : (
                    <input
                      placeholder='Linked In'
                      value='@arnak.qerobyanh'
                      className='socialMedia_input'
                    />
                  )}
                </div>
                <div>
                  {windowSize.width > 600 && (
                    <input
                      placeholder='Linked In'
                      value='@arnak.qerobyanh'
                      className='socialMedia_input'
                    />
                  )}
                  <button onClick={e => e.preventDefault()}>
                    <img
                      src={CLOSE}
                      alt='Close'
                      decoding='async'
                      loading='lazy'
                    />
                  </button>
                </div>
              </div>
              <div className='socialMedia_inputs'>
                <div>
                  <img
                    src={TELEGRAM}
                    alt='Telegram'
                    decoding='async'
                    loading='lazy'
                  />
                  {windowSize.width > 600 ? (
                    <p>Telegram</p>
                  ) : (
                    <input
                      placeholder='Telegram'
                      value='@arnak.qerobyanh'
                      className='socialMedia_input'
                    />
                  )}
                </div>
                <div>
                  {windowSize.width > 600 && (
                    <input
                      placeholder='Telegram'
                      value='@arnak.qerobyanh'
                      className='socialMedia_input'
                    />
                  )}
                  <button onClick={e => e.preventDefault()}>
                    <img
                      src={CLOSE}
                      alt='Close'
                      decoding='async'
                      loading='lazy'
                    />
                  </button>
                </div>
              </div>
              <div className='socialMedia_inputs socialMedia_inputs_add'>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenNewLink(!openNewLink)}>
                  <div className='new_link_'>
                    <img
                      src={VIBER}
                      alt='Viber'
                      decoding='async'
                      loading='lazy'
                    />
                    <p>Viber</p>
                  </div>
                  <img
                    src={CLOSE}
                    alt='Close'
                    decoding='async'
                    loading='lazy'
                  />
                </div>
                {/* {windowSize.width < 600 ? (
                  openNewLink && (
                    <div className='socialMedia_addLink'>
                      <div className='signUp_formGroup'>
                        <label htmlFor='personal_linkTitle'>Link Title</label>
                        <input
                          type='text'
                          id='personal_linkTitle'
                          name='signUp'
                          className='signUp_input'
                          placeholder='Enter link title'
                          // value='Peter'
                        />
                      </div>
                      <div className='signUp_formGroup'>
                        <label htmlFor='personal_url'>Url</label>
                        <input
                          type='text'
                          id='personal_url'
                          name='signUp'
                          className='signUp_input'
                          placeholder='Enter URL'
                          // value='Peter'
                        />
                      </div>
                      <div className='signUp_btns'>
                        <Button
                          text={t("btns.add")}
                          link={false}
                          to={""}
                          type='submit'
                          style={{
                            background: "var(--main-color)",
                            border: "none",
                            color: "#fff",
                            padding: "12px 25px",
                          }}
                        />
                      </div>
                    </div>
                  )
                ) : (
                  <div className='socialMedia_addLink'>
                    <div className='signUp_formGroup'>
                      <label htmlFor='personal_linkTitle'>Link Title</label>
                      <input
                        type='text'
                        id='personal_linkTitle'
                        name='signUp'
                        className='signUp_input'
                        placeholder='Enter link title'
                        // value='Peter'
                      />
                    </div>
                    <div className='signUp_formGroup'>
                      <label htmlFor='personal_url'>Url</label>
                      <input
                        type='text'
                        id='personal_url'
                        name='signUp'
                        className='signUp_input'
                        placeholder='Enter URL'
                        // value='Peter'
                      />
                    </div>
                    <div className='signUp_btns'>
                      <Button
                        text={t("btns.add")}
                        link={false}
                        to={""}
                        type='submit'
                        style={{
                          background: "var(--main-color)",
                          border: "none",
                          color: "#fff",
                          padding: "12px 25px",
                        }}
                        onClick={e => e.preventDefault()}
                      />
                    </div>
                  </div>
                )} */}
              </div>
            </div>
            <div className='signUp_btns'>
              <Button
                text={
                  postLoading ? (
                    <Spin size='small' className='btn_spinner' />
                  ) : (
                    t("btns.save")
                  )
                }
                link={false}
                to={""}
                type='submit'
                style={{
                  width: "344px",
                  background:
                    (isValid && shouldSendRequest) || image !== ""
                      ? "#dd264e"
                      : "#A3A3A3",
                  border: "none",
                  color: "#fff",
                }}
                // disabled={(isValid && !shouldSendRequest) || image !== ""}
                className='edit_profile_save_btn'
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
