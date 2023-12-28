import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingDonation } from "../actions/apiActions";
import { RootState } from "../store/configureStore";
import cookies from "js-cookie";
import { congratsModal } from "../actions/congratsAction";
import { useTranslation } from "react-i18next";
import { login } from "../actions/authActions";

const Thanks = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.donation);
  const navigate = useNavigate();
  const lang = cookies.get("i18next");
  const { t } = useTranslation();

  useEffect(() => {
    if (location.search) {
      //@ts-ignore
      dispatch(fetchingDonation(`thanks${location.search + "&lang=" + lang}`));
    }
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem("donationToRegister")) {
      dispatch(login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      if (data.response_code === 25 && data.donation?.status === "paid") {
        if (localStorage.getItem("donationToRegister")) {
          dispatch(
            congratsModal(
              true,
              `${t("donation.payment.completed")} <br> <br> ${t(
                "congrats.register"
              )}`
            )
          );
          localStorage.removeItem("donationToRegister");
        } else {
          dispatch(congratsModal(true, t("donation.payment.completed")));
        }
        navigate(`/${lang}/`);
        localStorage.setItem("user", JSON.stringify(data.user));
        fetch(
          "https://machtech.bitrix24.com/rest/1/web91rw9otl9hmp4/crm.lead.add.json?FIELDS[NAME]=%D0%98%D0%B2%D0%B0%D0%BD&FIELDS[LAST_NAME]=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2&FIELDS[EMAIL][0][VALUE]=mail@example.com&FIELDS[EMAIL][0][VALUE_TYPE]=WORK&FIELDS[COMMENTS]=&FIELDS[STATUS_ID]=UC_QCYPUE&FIELDS[UF_CRM_1702052932941]=" +
            lang
        );
      } else if (
        data.response_code === 26 &&
        data.donation?.status === "rejected"
      ) {
        if (localStorage.getItem("donationToRegister")) {
          dispatch(
            congratsModal(
              true,
              `${t("donation.payment.declined")} <br> <br> ${
                data?.reason
              } <br> <br> ${t("congrats.register")}`
            )
          );
          localStorage.removeItem("donationToRegister");
        } else {
          dispatch(
            congratsModal(
              true,
              `${t("donation.payment.declined")} <br> <br> ${data?.reason}`
            )
          );
        }
        navigate(`/${lang}/`);
      }
    }
  }, [data]);

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h1>{t("donation.payment.checking")}</h1>
    </div>
  );
};

export default Thanks;
