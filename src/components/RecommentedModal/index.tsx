import Modal from "../Modal";
import EcosystemModal from "../EcosystemModal";
import Button from "../Button";
import { Select, Spin } from "antd";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./index.css";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import countries from "../../locales/countries.json";
import country_dial from "../../locales/country_dial.json";
import { useLocation, useNavigate } from "react-router";
import { usePostRequest } from "../../actions/apiActions";
import cookies from "js-cookie";
import { congratsModal } from "../../actions/congratsAction";
import { hasPreviousHistory } from "../Navbar";
import ValidationSchema from "../../Validation";
const { Option } = Select;

const RecommentedModal = () => {
  const { t } = useTranslation();
  const lang = cookies.get("i18next");
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const filterOption = (
    input: string,
    option: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const filterOptionTel = (
    input: string,
    option: { label: string; value: string }
  ) => (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

  const [telCode, setTelCode] = useState("");
  const handleTelCode = (val: string) => setTelCode(val);

  const navigate = useNavigate();

  const { postRequest, response, postLoading } = usePostRequest();
  const location = useLocation();
  const ecosystem = location.search.split("=")[1];

  useEffect(() => {
    if (response) {
      if (response.data?.response_code === 21) {
        dispatch(congratsModal(true, t("congrats.sages-recommendation")));
        navigate(`/${lang}/ecosystem/${ecosystem}`);
      }
    }
  }, [response]);

  const navigateBack = () => {
    if (hasPreviousHistory()) navigate(-1);
    else {
      navigate("/");
    }
  };

  const { recommendationSchema } = ValidationSchema();

  return (
    <Modal setOpenModal={navigateBack} openModal={true}>
      <EcosystemModal
        back={false}
        onClose={navigateBack}
        header={t("recommendation")}>
        <Formik
          validationSchema={recommendationSchema}
          initialValues={{
            name: user?.name || "",
            last_name: user?.last_name || "",
            country: user?.country || "",
            // activities: "",
            email: user?.email || "",
            your_contacts: "",
            phone: "",
            url: "",
          }}
          onSubmit={values => {
            postRequest("sages-recommendation", values, {});
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
            <form
              noValidate
              onSubmit={handleSubmit}
              className='signUp_form donation_form'>
              <div className='recommendation_wrapper'>
                <div className='recommendation_1st'>
                  <div className='signUp_formGroup'>
                    <label htmlFor='recommendation_name'>
                      {t("inputs.name")}*
                    </label>
                    <input
                      type='text'
                      id='recommendation_name'
                      name='name'
                      className='signUp_input'
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className='error'>
                      {errors.name && touched.name
                        ? (errors.name as string)
                        : null}{" "}
                    </p>
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='recommendation_surname'>
                      {t("inputs.surname")}*
                    </label>
                    <input
                      type='text'
                      id='recommendation_surname'
                      name='last_name'
                      className='signUp_input'
                      value={values.last_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className='error'>
                      {errors.last_name && touched.last_name
                        ? (errors.last_name as string)
                        : null}{" "}
                    </p>
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='recommendation_country'>
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
                            defaultValue={user?.country || ""}
                          />
                        )
                      }
                    </Field>
                    <p className='error'>
                      {errors.country && touched.country
                        ? (errors.country as string)
                        : null}{" "}
                    </p>
                  </div>
                  {/* <div className='signUp_formGroup'>
                    <label htmlFor='signUp_recommendation'>
                      {t("inputs.activities")}*
                    </label>
                    <Field name='recommendation_from'>
                      {
                        //@ts-ignore
                        ({ _, form }) => (
                          <Select
                            // {...field}
                            showSearch
                            optionFilterProp='children'
                            className='signUp_selector'
                            onChange={(_, obj: any) => {
                              form.setFieldValue("activities", obj.id);
                            }}
                            //@ts-ignore
                            filterOption={filterOption}
                            options={[
                              {
                                value: "jack",
                                label: "Jack",
                                id: "1",
                              },
                              {
                                value: "lucy",
                                label: "Lucy",
                                id: "2",
                              },
                              {
                                value: "tom",
                                label: "Tom",
                                id: "3",
                              },
                            ]}
                          />
                        )
                      }
                    </Field>
                    <p className='error'>
                      {errors.activities &&
                        touched.activities &&
                        errors.activities}
                    </p>
                  </div> */}
                  <div className='signUp_formGroup'>
                    <label htmlFor='recommendation_link'>
                      {t("sign-in.link")}
                    </label>
                    <input
                      type='text'
                      id='recommendation_link'
                      name='url'
                      className='signUp_input'
                      value={values.url}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className='error'>
                      {errors.url && touched.url && errors.url}
                    </p>
                  </div>
                </div>
                <div className='recommendation_2nd'>
                  {/* <div className='signUp_formGroup'>
                    <label htmlFor='recommendation_link'>
                      {t("sign-in.link")}
                    </label>
                    <input
                      type='text'
                      id='recommendation_link'
                      name='url'
                      className='signUp_input'
                      value={values.url}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className='error'>
                      {errors.url && touched.url && errors.url}
                    </p>
                  </div> */}
                  <div className='signUp_formGroup'>
                    <label htmlFor='recommendation_yourContact'>
                      {t("sign-in.your-contact")}
                    </label>
                    <input
                      type='text'
                      id='recommendation_yourContact'
                      name='your_contacts'
                      className='signUp_input'
                      value={values.your_contacts}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className='error'></p>
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='recommendation_email'>
                      {t("sign-in.email")}*
                    </label>
                    <input
                      type='text'
                      id='recommendation_email'
                      name='email'
                      className='signUp_input'
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className='error'>
                      {errors.email && touched.email
                        ? (errors.email as string)
                        : null}{" "}
                    </p>
                  </div>
                  <div className='signUp_formGroup'>
                    <label htmlFor='recommendation_tel'>
                      {t("inputs.phone")}
                    </label>
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
                          id='recommendation_tel'
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
                </div>
              </div>
              <div className='signUp_btns'>
                <Button
                  text={
                    postLoading ? (
                      <Spin size='small' className='btn_spinner' />
                    ) : (
                      t("btns.recommended")
                    )
                  }
                  link={false}
                  to={""}
                  type='submit'
                  style={{
                    width: "100%",
                    background:
                      isValid &&
                      ((values.phone === "" && telCode === "") ||
                        (values.phone !== "" && telCode !== ""))
                        ? "#dd264e"
                        : "#A3A3A3",
                    border: "none",
                    color: "#fff",
                  }}
                  className='donation_btn'
                  disabled={
                    (values.phone !== "" && telCode === "") ||
                    (values.phone === "" && telCode !== "")
                  }
                />
              </div>
            </form>
          )}
        </Formik>
      </EcosystemModal>
    </Modal>
  );
};

export default RecommentedModal;
