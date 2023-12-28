import { useTranslation } from "react-i18next";
import "./index.css";
import { usePostRequest } from "../../../actions/apiActions";
import cookies from "js-cookie";
import { Helmet } from "react-helmet";
import LOGO_301 from "../../../assets/logo/301-white.svg";
// import ROTATE from "../../../assets/logo/rotate.svg";
import { useEffect } from "react";
import { Popconfirm, Spin } from "antd";
import INFO_ICON from "../../../assets/info-icon.svg";
import { logout } from "../../../actions/authActions";
import { useNavigate } from "react-router";
import { congratsModal } from "../../../actions/congratsAction";
import { useDispatch } from "react-redux";

const Status = () => {
  const { t } = useTranslation();
  const { postRequest, postLoading, response, error } = usePostRequest();
  const lang = cookies.get("i18next");
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    postRequest(
      "get-user-donate",
      {
        lang,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      if (
        error.response?.data?.response_code === 31 ||
        error.response?.data?.response_code === 32
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(logout());
        navigate(`/${lang}/`);
        dispatch(congratsModal(true, t("congrats.login-again")));
      }
    }
  }, [error]);

  const payment_type = (type: string) => {
    if (type === "one_time") return t("payments.one_time");
    if (type === "project") return t("payments.project");
    if (type === "annual") return t("payments.annual");
    if (type === "monthly") return t("payments.monthly");
  };

  const payment_status = (status: string) => {
    if (status === "new") return t("payments.new");
    if (status === "paid") return t("payments.paid");
    if (status === "rejected") return t("payments.rejected");
  };
  const calcPriceOfSubscription = () => {
    const subs_type = response?.data?.subscription_type;
    const paymentSubsDate = new Date(response?.data?.subscription_date);
    const currentDate = new Date();
    const currMonth = currentDate.getMonth() + 1;
    const month = paymentSubsDate.getMonth() + 1;
    let price = 0;
    if (subs_type === "annual") {
      price = 12 * 301;
    } else if (subs_type === "monthly") {
      price = (12 - (currMonth - month)) * 301;
    }
    return price;
  };
  const sortedHistory = response?.data?.paymentHistory?.sort(
    (a: any, b: any) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  );

  return (
    <div className='personalInfo_wrapper'>
      <Helmet>
        <title>
          {user.name} | {t(`personal.status`)}
        </title>
      </Helmet>
      <p className='personalInfo_title'>{t(`personal.status`)}</p>
      <p className='personalInfo_event_content'>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to
      </p>
      {response ? (
        <div>
          {+response?.data?.subscription_status === 1 && (
            <div className='statusCardHolderWrapper'>
              <div className='statusCard'>
                <div className='statusCardInfo'>
                  <p>{t("payments.your_card")}</p>
                  <img src={LOGO_301} alt='301' />
                </div>
                <div className='statusCardHolder'>
                  <p className='statusCardId'>{response?.data?.card_number}</p>
                  <p className='statusCardHolderName'>
                    {response?.data?.client_name}
                  </p>
                </div>
              </div>
              <div className='statusSubscriptionWrapper'>
                <p className='statusSubscriptionTitle'>
                  {t("payments.subscription")}
                </p>
                <div className='statusSubscriptionData'>
                  <p className='statusMonthlySubs'>
                    {payment_type(response?.data?.subscription_type)}{" "}
                    {t("payments.subscription")}
                  </p>
                  <p className='statusMonthlySubsDate'>
                    {calcPriceOfSubscription()} $
                    <span>
                      /
                      {response?.data?.subscription_type === "annual"
                        ? t("payments.year")
                        : payment_type(response?.data?.subscription_type)}
                    </span>
                  </p>
                </div>
                {/* <button className='statusChangeCard'>
                  {t("payments.change_card")}
                  <img src={ROTATE} alt='Rotate' />
                </button> */}
              </div>
            </div>
          )}
          <div className='historyWrapper'>
            <p className='personalInfo_title'>{t(`personal.history`)}</p>
            <table id='historyTable'>
              <thead>
                <tr className='historyTableHeader'>
                  <th>{t("payments.date")}</th>
                  <th>{t("payments.type")}</th>
                  <th>{t("payments.amount")}</th>
                  <th>{t("personal.status")}</th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory?.map((pymnt: any, i: number) => {
                  const date = pymnt.created_at?.split(" ");
                  return (
                    <tr key={i}>
                      <td>
                        {date[0]} {date[1].slice(0, 5)}
                      </td>
                      <td>{payment_type(pymnt.type)}</td>
                      <td>{pymnt.amount}$</td>
                      <td className={`${pymnt.status} payment_status`}>
                        {payment_status(pymnt.status)}
                        {pymnt?.reason && pymnt?.status !== "paid" && (
                          <div className='rejected_reason'>
                            <Popconfirm
                              className='signUp_popover'
                              icon={false}
                              description={
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: pymnt.reason,
                                  }}
                                />
                              }
                              //@ts-ignore
                              // onConfirm={confirmAgreementTerms}
                              //@ts-ignore
                              // onCancel={cancel}
                              okText='ok'
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
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size='large' />
        </div>
      )}
    </div>
  );
};

export default Status;
