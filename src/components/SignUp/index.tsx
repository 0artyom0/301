import Modal from "../Modal";
import DONOR from "../../assets/signup-account-types/donor.svg";
import AMBASSADOR from "../../assets/signup-account-types/ambassador.svg";
import EXPERTS from "../../assets/signup-account-types/expert.svg";
import PARTNERS from "../../assets/signup-account-types/partners.svg";
import FRIENDS from "../../assets/signup-account-types/friends.svg";
import DONOR_MAIN from "../../assets/signup-account-types/donor-main.svg";
import AMBASSADOR_MAIN from "../../assets/signup-account-types/ambassador-main.svg";
import EXPERTS_MAIN from "../../assets/signup-account-types/experts-main.svg";
import PARTNERS_MAIN from "../../assets/signup-account-types/partners-main.svg";
import FRIENDS_MAIN from "../../assets/signup-account-types/friends-main.svg";
import PATTERN from "../../assets/signup-account-types/bg-pattern.svg";
import "./index.css";
import Button from "../Button";
import EcosystemModal from "../EcosystemModal";
import { useDispatch, useSelector } from "react-redux";
import { openAccountTypeModal } from "../../actions/donateAction";
import CardSlider from "../CardSlider";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import cookies from "js-cookie";
import { hasPreviousHistory } from "../Navbar";

const SignUp = () => {
  const { t } = useTranslation();

  const accountTypes = [
    {
      id: 1,
      name: t("footer.ecosystem.donor"),
      type: "donor",
      icon: DONOR,
      mainImg: DONOR_MAIN,
      btn: t("btns.become-301"),
      btnStyle: {
        background: "#189387",
        boxShadow: "-9px 11px 24px 0px rgba(24, 147, 135, 0.35)",
      },
    },
    {
      id: 2,
      name: t("footer.ecosystem.ambassadors"),
      type: "ambassadors",
      icon: AMBASSADOR,
      mainImg: AMBASSADOR_MAIN,
      btn: t("btns.become-ambassador"),
      btnStyle: {
        background: "#EE8842",
        boxShadow: "-9px 11px 24px 0px rgba(238, 136, 66, 0.35)",
      },
    },
    {
      id: 3,
      name: t("footer.ecosystem.experts"),
      type: "experts",
      icon: EXPERTS,
      mainImg: EXPERTS_MAIN,
      btn: t("btns.become-expert"),
      btnStyle: {
        background: "#42CFEE",
        boxShadow: "-9px 11px 24px 0px rgba(24, 147, 135, 0.35)",
      },
    },
    {
      id: 4,
      name: t("footer.ecosystem.partners"),
      type: "partners",
      icon: PARTNERS,
      mainImg: PARTNERS_MAIN,
      btn: t("btns.become-partner"),
      btnStyle: {
        background: "#C12DD9",
        boxShadow: "-9px 11px 24px 0px rgba(193, 45, 217, 0.35)",
      },
    },
    {
      id: 5,
      name: t("footer.ecosystem.friends"),
      type: "friends",
      icon: FRIENDS,
      mainImg: FRIENDS_MAIN,
      btn: t("btns.become-fund-friend"),
      btnStyle: {
        background: "#6442EE",
        boxShadow: "-9px 11px 24px 0px rgba(100, 66, 238, 0.35)",
      },
    },
  ];
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const lang = cookies.get("i18next");

  const navigateBack = () => {
    if (hasPreviousHistory()) navigate(-1);
    else {
      navigate("/");
    }
  };

  return (
    <Modal
      setOpenModal={navigateBack}
      openModal={true}
      className='signUp_overlay'
      headerShow={false}>
      <EcosystemModal
        back={true}
        className='modal_back'
        onClose={navigateBack}
        header={t("select-acount-type")}>
        <div className='signUp_content_accountTypes'>
          <img
            src={PATTERN}
            alt='Pattern'
            className='accountTYpes_pattern'
            decoding='async'
            loading='lazy'
          />
          {windowSize.width >= 800 ? (
            accountTypes.map(account => (
              <div
                className='accountType'
                key={account.id}
                id={`accountType-${account.id}`}>
                <div className='accountType_header'>
                  <img
                    src={account.icon}
                    alt='Account'
                    decoding='async'
                    loading='lazy'
                  />
                  <span>{account.name}</span>
                </div>
                <div className='accountType_mainImg'>
                  <img
                    src={account.mainImg}
                    alt='Account Main'
                    decoding='async'
                    loading='lazy'
                  />
                </div>
                <Button
                  text={account.btn}
                  style={{
                    ...account.btnStyle,
                    color: "#fff",
                    border: "none",
                  }}
                  className='accountType_btn'
                  link={true}
                  to={`/${lang}/accountType?id=${account.id}?type=${account.type}`}
                />
              </div>
            ))
          ) : (
            <CardSlider data={accountTypes} />
          )}
        </div>
      </EcosystemModal>
    </Modal>
  );
};

export default SignUp;
