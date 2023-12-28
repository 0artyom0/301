import Modal from "../Modal";
import EcosystemModal from "../EcosystemModal";
import ONE_TIME_DONATION from "../../assets/donation-one-time.svg";
import PROJECT_DONATION from "../../assets/donation-project.svg";
import DONATION_301 from "../../assets/donation-301.svg";
import "./index.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { usePostRequest } from "../../actions/apiActions";
import { useEffect } from "react";
import { congratsModal } from "../../actions/congratsAction";
import { hasPreviousHistory } from "../Navbar";

const Donation = () => {
  const { t } = useTranslation();
  const lang = cookies.get("i18next");
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));
  const { postRequest, response } = usePostRequest();

  const donations_cards = [
    {
      id: 1,
      title: t("btns.one-time-donation"),
      desc: t("donation.one-time-donation"),
      img: ONE_TIME_DONATION,
      to: "one-time-donation",
    },
    {
      id: 2,
      title: t("btns.donate-to-project"),
      desc: t("donation.donate-to-project"),
      img: PROJECT_DONATION,
      to: "projects-donation",
    },
    {
      id: 3,
      title: t("btns.become-301"),
      desc: t("donation.become-301"),
      img: DONATION_301,
      to: "donation/accountType?id=1?type=donor",
    },
  ];

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

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

  const navigateBack = () => {
    if (hasPreviousHistory()) navigate(-1);
    else {
      navigate("/");
    }
  };

  return (
    <Modal setOpenModal={navigateBack} openModal={true}>
      <EcosystemModal
        back={false}
        onClose={navigateBack}
        header={t("btns.donate")}>
        <div className='donationWrapper'>
          <div className='donation'>
            {/* <div className='donation_info'>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in
              </p>
            </div> */}
            <div className='donation_cards'>
              {(isAuthenticated && +user.subscription_status === 1
                ? donations_cards.slice(0, 2)
                : donations_cards
              ).map(card => (
                <a
                  href={`/${lang}/${card.to}`}
                  onClick={e => {
                    if (
                      card.id === 3 &&
                      isAuthenticated &&
                      +user.subscription_status === 0
                    ) {
                      e.preventDefault();
                      const token = localStorage.getItem("token");
                      const result = {
                        ...user,
                        subscription_type: "annual",
                        lang,
                        user_id: user?.id,
                      };
                      postRequest("donation", result, {
                        Authorization: `Bearer ${token}`,
                      });
                    }
                  }}
                  className='donation_card'
                  key={card.id}
                  id={`donationCard-${card.id}`}>
                  <div className='donationCard_img'>
                    <img
                      src={card.img}
                      alt={card.title}
                      decoding='async'
                      loading='lazy'
                    />
                  </div>
                  <div className='donationCard_info'>
                    <p className='donationCard_title'>{card.title}</p>
                    <p className='donationCard_desc'>{card.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </EcosystemModal>
    </Modal>
  );
};

export default Donation;
