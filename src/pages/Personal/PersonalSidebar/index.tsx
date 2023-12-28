import ARROW from "../../../assets/arrow-next-red.svg";
import SMS from "../../../assets/sms.svg";
import "./index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { storageBase } from "../../../utils/storage";
import { useTranslation } from "react-i18next";
import NO_IMAGE from "../../../assets/no-image-user.png";
import cookies from "js-cookie";
import { usePostRequest } from "../../../actions/apiActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/authActions";
import { Spin } from "antd";
import { congratsModal } from "../../../actions/congratsAction";

const PersonalSidebar = () => {
  const { t } = useTranslation();

  const bar = [
    {
      id: 1,
      name: t("personal.personal-info"),
      path: "personal/personal-info",
      isActive: false,
    },
    {
      id: 2,
      name: t("personal.my-project"),
      path: "personal/my-project",
      isActive: false,
    },
    {
      id: 3,
      name: t("personal.my-events"),
      path: "personal/my-events",
      isActive: false,
    },
    {
      id: 4,
      name: t("personal.status"),
      path: "personal/status",
      isActive: false,
    },
  ];
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));
  // const user = useSelector((state: RootState) => state.auth.user);
  const lang = cookies.get("i18next");
  const { postRequest, postLoading, response, error } = usePostRequest();
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response && response?.data.response_code === 12 && !hasNavigated) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(logout());
      setHasNavigated(true);
      !hasNavigated && navigate(`/${lang}/`);
      // dispatch(congratsModal(true, t("validation-errors.data-invalid")));
    } else if (error) {
      if (
        error.response?.status == 401 &&
        error.response?.data.response_code === 13
      ) {
        dispatch(congratsModal(true, t("validation-errors.token-not-found")));
      }
    }
  }, [response, error]);

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

  // if (true) {
  //   return (
  //     <div className='logoutLoadingContainer'>
  //       <Spin size='large' />
  //     </div>
  //   );
  // }

  useEffect(() => {
    document.body.classList.toggle("no-scroll", postLoading);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [postLoading]);

  return (
    <div className='personal_bar_wrapper'>
      {postLoading && (
        <div className='logoutLoadingContainer'>
          <Spin size='large' />
        </div>
      )}
      <div className='person_wrapper'>
        <div className='person_bg'></div>
        <div className='person_profile'>
          <div className='prof_pic'>
            <img
              style={{ background: user.image ? "transparent" : "#fff" }}
              src={
                user?.image
                  ? `${storageBase}/upload/user_image/${user?.image}`
                  : NO_IMAGE
              }
              alt='Person'
              decoding='async'
              loading='lazy'
            />
          </div>
        </div>
        <p className='prof_name'>
          {user?.name} {user?.last_name}
        </p>
        <button className='prof_sms'>
          <div className='sms_img'>
            <span className='sms_notif'>0</span>
            <img src={SMS} alt='SMS ' decoding='async' loading='lazy' />
          </div>
          <span>{t("personal.my-message")}</span>
        </button>
      </div>
      <div className='personal_bar'>
        {bar.map(bar => (
          <NavLink
            end
            to={`/${lang}/${bar.path}`}
            key={bar.id}
            className={`personal_bar_item`}>
            {bar.name}
            <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
          </NavLink>
        ))}
        <button
          onClick={() => {
            const token = localStorage.getItem("token");
            postRequest(
              "logout",
              {},
              {
                Authorization: `Bearer ${token}`,
              }
            );
          }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default PersonalSidebar;
