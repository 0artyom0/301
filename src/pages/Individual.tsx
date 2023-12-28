import { useEffect } from "react";
import { usePostRequest } from "../actions/apiActions";
import { useDispatch } from "react-redux";
import { congratsModal } from "../actions/congratsAction";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Individual = () => {
  const { postRequest, response } = usePostRequest();
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location.search);

  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  console.log(amount);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const result = {
      name: "Individual",
      last_name: "Donation",
      email: "individual@301land.net",
      amount,
      currency_type: "USD",
    };

    postRequest("donation", result, {
      Authorization: `Bearer ${token}`,
    });
  }, [dispatch]);

  useEffect(() => {
    if (response) {
      if (response.data?.redirectURL) {
        window.location.href = response.data.redirectURL;
      } else if (response.data?.message) {
        dispatch(congratsModal(true, response.data?.message));
        response.data?.user &&
          localStorage.setItem("user", JSON.stringify(response.data?.user));
      }
    }
  }, [response]);

  const { t } = useTranslation();

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h1>{t("individual-donation")}</h1>
    </div>
  );
};

export default Individual;
