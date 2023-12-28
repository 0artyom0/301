import { useTranslation } from "react-i18next";
import * as yup from "yup";

const ValidationSchema = () => {
  const { t } = useTranslation();

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .required(t("validation-errors.email-required"))
      .email(t("validation-errors.invalid-email")),
    password: yup
      .string()
      .required(t("validation-errors.pass-required"))
      .min(8, t("validation-errors.valid-pass")),
  });
  const forgetPassShcema = yup.object().shape({
    email: yup
      .string()
      .required(t("validation-errors.email-required"))
      .email(t("validation-errors.invalid-email")),
  });
  const changePassSchema = yup.object().shape({
    password: yup
      .string()
      .required(t("validation-errors.pass-required"))
      .min(8, t("validation-errors.valid-pass")),
    password_confirmation: yup
      .string()
      .required(t("validation-errors.pass-required"))
      .oneOf([yup.ref("password")], t("validation-errors.pass-must-match")),
  });

  const signUpSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+$/, t("validation-errors.valid-name"))
      .required(t("validation-errors.name-required")),
    last_name: yup
      .string()
      .matches(/^[A-Za-z]+$/, t("validation-errors.valid-last-name"))
      .required(t("validation-errors.last-name-required")),
    email: yup
      .string()
      .required(t("validation-errors.email-required"))
      .email(t("validation-errors.invalid-email")),
    phone: yup.string().matches(/^[0-9]+$/, t("validation-errors.valid-phone")),
    country: yup.string().required(t("validation-errors.country-required")),
    organization: yup
      .string()
      .required(t("validation-errors.organization-required")),
    how_did_you_know: yup
      .string()
      .required(t("validation-errors.this-is-required")),
    projects_interested: yup
      .array()
      .of(yup.string())
      .required(t("validation-errors.at-least-one-project-required"))
      .min(1, t("validation-errors.at-least-one-project-required")),
    recommendation_from: yup
      .string()
      .required(t("validation-errors.this-is-required")),
    password: yup
      .string()
      .required(t("validation-errors.pass-required"))
      .min(8, t("validation-errors.valid-pass")),
    password_confirmation: yup
      .string()
      .required(t("validation-errors.pass-required"))
      .oneOf([yup.ref("password")], t("validation-errors.pass-must-match")),
    support_form: yup
      .boolean()
      .oneOf([true, false], t("validation-errors.selected-field-required")),
    club_code_of_ethics_301: yup
      .boolean()
      .oneOf([true], t("validation-errors.selected-field-required")),
    agreement_terms: yup
      .boolean()
      .oneOf([true], t("validation-errors.selected-field-required")),
  });

  const doanteSignUpSchema = yup.object().shape({
    ...signUpSchema.fields,
    subscription_type: yup
      .string()
      .required(t("validation-errors.this-is-required")),
  });

  const otherSignUpSchema = yup.object().shape({
    ...signUpSchema.fields,
    participation_form: yup
      .string()
      .required(t("validation-errors.this-is-required")),
    sages_id: yup.string().required(t("validation-errors.this-is-required")),
  });

  const donationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+$/, t("validation-errors.valid-name"))
      .required(t("validation-errors.name-required")),
    last_name: yup
      .string()
      .matches(/^[A-Za-z]+$/, t("validation-errors.valid-last-name"))
      .required(t("validation-errors.last-name-required")),
    email: yup
      .string()
      .required(t("validation-errors.email-required"))
      .email(t("validation-errors.invalid-email")),
    amount: yup
      .number()
      .typeError(t("validation.errors.amount-number-valid"))
      .positive(t("validation-errors.amount-positive-valid"))
      .required(t("validation-errors.amount-required")),
  });

  const recommendationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+$/, t("validation-errors.valid-name"))
      .required(t("validation-errors.name-required")),
    last_name: yup
      .string()
      .matches(/^[A-Za-z]+$/, t("validation-errors.valid-last-name"))
      .required(t("validation-errors.last-name-required")),
    country: yup.string().required(t("validation-errors.country-required")),
    // activities: yup.string().required("Activities is a required field"),
    email: yup
      .string()
      .required(t("validation-errors.email-required"))
      .email(t("validation-errors.invalid-email")),
    phone: yup.string().matches(/^[0-9]+$/, t("validation-errors.valid-phone")),
  });

  const socialMediaRegisterSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+$/, t("validation-errors.valid-name"))
      .required(t("validation-errors.name-required")),
    last_name: yup
      .string()
      .matches(/^[A-Za-z]+$/, t("validation-errors.valid-last-name"))
      .required(t("validation-errors.last-name-required")),
    email: yup
      .string()
      .required(t("validation-errors.email-required"))
      .email(t("validation-errors.invalid-email")),
    phone: yup.string().matches(/^[0-9]+$/, t("validation-errors.valid-phone")),
    country: yup.string().required(t("validation-errors.country-required")),
    organization: yup
      .string()
      .required(t("validation-errors.organization-required")),
    how_did_you_know: yup
      .string()
      .required(t("validation-errors.this-is-required")),
    projects_interested: yup
      .array()
      .of(yup.string())
      .required(t("validation-errors.at-least-one-project-required"))
      .min(1, t("validation-errors.at-least-one-project-required")),
    recommendation_from: yup
      .string()
      .required(t("validation-errors.this-is-required")),
  });

  const contactSchema = yup.object().shape({
    name: yup.string().required(t("validation-errors.this-is-required")),
    email: yup
      .string()
      .required(t("validation-errors.email-required"))
      .email(t("validation-errors.invalid-email")),
    message: yup.string().required(t("validation-errors.this-is-required")),
  });

  const editProfileSchema = yup.object().shape({
    name: yup.string().required(t("validation-errors.name-required")),
    last_name: yup.string().required(t("validation-errors.last-name-required")),
    about_me: yup.string(),
    // .matches(/^[A-Za-z]+$/, t("validation-errors.valid-last-name")),
    // .required(t("validation-errors.last-name-required")),
    phone: yup.string().matches(/^[0-9]+$/, t("validation-errors.valid-phone")),
    email: yup
      .string()
      // .required(t("validation-errors.email-required"))
      .email(t("validation-errors.invalid-email")),
    password: yup.string().min(8, t("validation-errors.valid-pass")),
    // .required(t("validation-errors.pass-required"))
    password_confirmation: yup
      .string()
      // .required(t("validation-errors.pass-required"))
      .oneOf([yup.ref("password")], t("validation-errors.pass-must-match")),
  });

  return {
    signInSchema,
    forgetPassShcema,
    changePassSchema,
    signUpSchema,
    doanteSignUpSchema,
    otherSignUpSchema,
    donationSchema,
    recommendationSchema,
    socialMediaRegisterSchema,
    contactSchema,
    editProfileSchema,
  };
};

export default ValidationSchema;
