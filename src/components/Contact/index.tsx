import { useEffect, useState } from "react";
import Background from "../Background";
import Header from "../Header";
import EMAIL from "../../assets/email.svg";
import "./index.css";
import Button from "../Button";
import SIDE_PATTERN_2 from "../../assets/patterns/side-2.svg";
import SIDE_PATTERN_2_MOBILE from "../../assets/patterns/side-2-mobile.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { usePostRequest } from "../../actions/apiActions";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { congratsModal } from "../../actions/congratsAction";
import { Formik } from "formik";
import ValidationSchema from "../../Validation";

interface ContactProps {
  separatedPart?: Boolean;
  contactPage?: boolean;
  className?: string;
}

const Contact: React.FC<ContactProps> = ({
  separatedPart,
  contactPage,
  className,
}) => {
  const { t } = useTranslation();
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { postRequest, postLoading, response } = usePostRequest();
  const handleSubmit = (values: any) => {
    postRequest("write-to-us", values, {});
  };
  const windowSize = useWindowSize();

  useEffect(() => {
    if (
      !postLoading &&
      response &&
      response.status === 201 &&
      response.data.response_code === 10
    )
      dispatch(congratsModal(true, t("congrats.contact-us")));
  }, [postLoading, response]);

  const { contactSchema } = ValidationSchema();

  return (
    <>
      {separatedPart && <div className='separatedPart'></div>}
      <Background
        pattern1={
          !contactPage
            ? windowSize.width < 975
              ? SIDE_PATTERN_2_MOBILE
              : SIDE_PATTERN_2
            : ""
        }
        shoudHaveSidePattern={false}
        pattern2LeftStyle={{ display: "none" }}
        pattern2RightStyle={{
          width: "190px",
          height: "190px",
          top: "480px",
        }}
        style={{ flexDirection: "column", padding: "0" }}>
        <Header
          title={t("contact.title")}
          description=''
          icon={EMAIL}
          style={{
            paddingTop: "40px",
            paddingBottom: "40px",
            width: "63vw",
            alignItems: "center",
          }}
        />
        <Formik
          validationSchema={contactSchema}
          initialValues={{
            name:
              user?.name && user?.last_name
                ? `${user?.name} ${user?.last_name}`
                : "",
            email: user?.email || "",
            message: "",
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
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
              className={`${className} formContainer`}
              noValidate
              onSubmit={handleSubmit}>
              <div className='formInner'>
                <div className='formInputs'>
                  <div className='formGroup'>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      placeholder={t("contact.your-name")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      aria-hidden={true}
                      className='form'
                    />
                    {errors.name && touched.name && (
                      <p className='error'>
                        {errors.name && touched.name
                          ? (errors.name as string)
                          : null}
                      </p>
                    )}
                  </div>
                  <div className='formGroup'>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      placeholder={t("contact.your-email")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      aria-hidden={true}
                      className='form'
                    />
                    {errors.email && touched.email && (
                      <p className='error'>
                        {errors.email && touched.email
                          ? (errors.email as string)
                          : null}
                      </p>
                    )}
                  </div>
                </div>
                <div className='formGroup'>
                  <textarea
                    id='message'
                    name='message'
                    placeholder={t("contact.write")}
                    rows={4}
                    cols={80}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    className='form'
                  />
                  {errors.message && touched.message && (
                    <p className='error'>{errors.message}</p>
                  )}
                </div>
              </div>
              <div className='btns'>
                <Button
                  text={
                    postLoading ? (
                      <Spin size='small' className='btn_spinner' />
                    ) : (
                      t("btns.send")
                    )
                  }
                  style={{
                    // padding: "15px 70px",
                    background: "#DD264E",
                    boxShadow: "-21px 16px 38px 0px rgba(191, 9, 48, 0.21)",
                    color: "#fff",
                    width: "200px",
                  }}
                  link={false}
                  to=''
                  className='homePage_btn'
                  type='submit'
                />
              </div>
            </form>
          )}
        </Formik>
      </Background>
    </>
  );
};

export default Contact;
