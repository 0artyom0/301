import { Fragment, useEffect, useState } from "react";
import LOGO from "../../assets/logo.svg";
import BIG_PATTERN from "../../assets/bigPatternNavbar.svg";
import SIDE_PATTERN from "../../assets/patterns/side-1-mobile.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import Button from "../Button";
import "./index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { scrollToTop } from "../../globalFunctions/scrollToTop";
import { createBrowserHistory } from "history";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import NOTIFICATION from "../../assets/notification.svg";
import { storageBase } from "../../utils/storage";
import NO_IMAGE from "../../assets/no-image-user.png";
import cookies from "js-cookie";
import i18next from "i18next";
import { usePostRequest } from "../../actions/apiActions";
import { logout } from "../../actions/authActions";
import { congratsModal } from "../../actions/congratsAction";

export const history = createBrowserHistory(); // Create a history instance
export const hasPreviousHistory = () => {
  return !!(window.history && window.history.length > 1);
};

export const menu = [
  {
    id: 1,
    name: "home",
    link: "/",
  },
  {
    id: 2,
    name: "projects",
    link: "/projects",
  },
  // {
  //   id: 3,
  //   name: "media",
  //   link: "/media",
  // },
  // {
  //   id: 4,
  //   name: "calendar",
  //   link: "/calendar",
  // },
  {
    id: 5,
    name: "about-us",
    link: "/about-us",
  },
  {
    id: 6,
    name: "contact",
    link: "/contact",
  },
  {
    id: 7,
    name: "news",
    link: "/#news",
  },
];

interface NavbarProps {
  setOpenModal: (arg: boolean) => void;
  signIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setOpenModal, signIn }) => {
  const windowSize = useWindowSize();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", openMenu);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openMenu]);
  const langs = [
    {
      id: 1,
      code: "en",
      longName: "ENGLISH",
    },
    {
      id: 2,
      code: "ru",
      longName: "Русский",
    },
    {
      id: 3,
      code: "am",
      longName: "Հայերեն",
    },
  ];
  const handleLanguageChange = (language: string) => {
    i18next.changeLanguage(language).then(() => {
      setOpenLangs(false);
      const currentPath = window.location.pathname;
      const languagePrefix = currentPath.split("/")[1];
      let newPath;
      if (languagePrefix && languagePrefix.length === 2) {
        newPath = currentPath.replace(`/${languagePrefix}`, `/${language}`);
      } else {
        newPath = `/${language}${currentPath}`;
      }
      window.location.href = newPath;
    });
  };

  const [openLangs, setOpenLangs] = useState(false);
  const lang = cookies.get("i18next");
  const copyLangs = langs.filter(item => item.code !== lang);
  const differentLang = langs.find(
    item1 => !copyLangs.some(item2 => item1.id === item2.id)
  );
  const { t } = useTranslation();

  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { postRequest, postLoading, response, error } = usePostRequest();
  const dispatch = useDispatch();
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   if (error) {
  //     if (
  //       error.response?.data?.response_code === 31 ||
  //       error.response?.data?.response_code === 32
  //     ) {
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("token");
  //       dispatch(logout());
  //       navigate(`/${lang}/`);
  //       dispatch(congratsModal(true, t("congrats.login-again")));
  //     }
  //   }
  // }, [error]);

  return (
    <div
      className='navbarContainer'
      style={{ zIndex: signIn || windowSize.width > 800 ? "99999" : "999999" }}>
      {windowSize.width < 975 && (
        <div className='mobileMenu'>
          <div
            className={`${openMenu && "openedHamburger"} hamburger`}
            onClick={() => setOpenMenu(!openMenu)}>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </div>
          {/* <p>Menu</p> */}
          {openMenu && (
            <div className='openedMobileMenu'>
              <div className='bigPatternNav'>
                <img
                  src={BIG_PATTERN}
                  alt='Pattern'
                  decoding='async'
                  loading='lazy'
                />
              </div>
              <div className='sidePattern1'>
                <img
                  src={SIDE_PATTERN}
                  alt='Pattern'
                  decoding='async'
                  loading='lazy'
                />
              </div>
              <div className='sidePattern2'>
                <img
                  src={SIDE_PATTERN}
                  alt='Pattern'
                  decoding='async'
                  loading='lazy'
                />
              </div>
              <div className='menu'>
                <div className='link'>
                  {isAuthenticated && (
                    <div className='navbar_user_wrapper'>
                      <NavLink
                        to={`/${lang}/personal/personal-info`}
                        className='navbar_user'
                        onClick={() => setOpenMenu(false)}>
                        <img
                          src={
                            user?.image
                              ? `${storageBase}/upload/user_image/${user?.image}`
                              : NO_IMAGE
                          }
                          alt='Person'
                          decoding='async'
                          loading='lazy'
                        />
                        <p style={{ fontSize: "18px", margin: 0 }}>
                          {user?.name} {user?.last_name}
                        </p>
                      </NavLink>
                    </div>
                  )}
                  {menu.map((link, i) => (
                    <NavLink
                      onClick={() => {
                        setOpenMenu(false);
                        scrollToTop();
                      }}
                      key={i}
                      to={`/${lang}${link.link}`}
                      style={{ animationDelay: `${i * 0.1}s` }}>
                      {t(`navbar.${link.name}`)}
                    </NavLink>
                  ))}
                </div>
                <div className='link logout'>
                  <NavLink
                    to={`/${lang}/login`}
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
                    {!isAuthenticated
                      ? t("navbar.sign-in")
                      : t("navbar.logout")}
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {openMenu ? (
        <div className='logo'>
          <span>Меню</span>
          <Button
            text={t(`btns.donate`)}
            link={true}
            to={`/${lang}/donation`}
            className='signIn-btn'
            onClick={() => {
              setOpenMenu(false);
            }}
            style={{
              padding: "9px 23px",
              background: "var(--main-color)",
              color: "#fff",
              display: "block",
              fontSize: "12px",
            }}
          />
          {isAuthenticated && (
            <button className='navbar_notif'>
              <img
                src={NOTIFICATION}
                alt='Notification'
                decoding='async'
                loading='lazy'
              />
              <span className='notification_number'>0</span>
            </button>
          )}
        </div>
      ) : (
        <NavLink to={`/${lang}/`} className='logo' onClick={scrollToTop}>
          <img src={LOGO} alt='Logo' decoding='async' loading='lazy' />
        </NavLink>
      )}
      <div className='menu'>
        <div className='link'>
          {menu.map((link, i) => (
            <a key={i} href={`/${lang}${link.link}`}>
              {t(`navbar.${link.name}`)}
            </a>
          ))}
        </div>
        <div className='langsWrapper'>
          <Button
            text={
              windowSize.width < 800 ? differentLang?.code : differentLang?.code
            }
            link={false}
            to={""}
            className='activeLang lang'
            onClick={() => setOpenLangs(!openLangs)}
          />
          <div className='notActiveLangs_wrapper'>
            {copyLangs.map((l, i) => (
              <a
                href={`/${l.code}${window.location.pathname}`}
                key={i}
                onClick={e => {
                  e.preventDefault();
                  handleLanguageChange(l.code);
                }}>
                <Button
                  text={l.code}
                  link={false}
                  to={""}
                  className={`${openLangs && "openedLang"} activeLang_${
                    i + 1
                  } lang`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      {windowSize.width > 800 ? (
        <>
          {isAuthenticated ? (
            <div className='navbar_user_wrapper'>
              <button className='navbar_notif'>
                <img
                  src={NOTIFICATION}
                  alt='Notification'
                  decoding='async'
                  loading='lazy'
                />
                <span className='notification_number'>0</span>
              </button>
              <NavLink
                to={`/${lang}/personal/personal-info`}
                className='navbar_user'>
                <img
                  src={
                    user?.image
                      ? `${storageBase}/upload/user_image/${user?.image}`
                      : NO_IMAGE
                  }
                  alt='Person'
                  decoding='async'
                  loading='lazy'
                />
                <p>
                  {user.name} {user.last_name}
                </p>
              </NavLink>
            </div>
          ) : (
            <div className='btns' style={{ margin: 0 }}>
              <Button
                text={t(`btns.donate`)}
                link={true}
                to={`/${lang}/donation`}
                className='signIn-btn'
                // onClick={() => {
                //   // dispatch(openDonateModal(true));
                //   // dispatch(getModalName("donate"));
                // }}
                style={{
                  padding: "9px 23px",
                  background: "var(--main-color)",
                  color: "#fff  ",
                  fontSize: "13px",
                }}
              />
              <Button
                text={t(`navbar.sign-in`)}
                link={true}
                to={`/${lang}/login`}
                className='signIn-btn'
                style={{ padding: "9px 23px", fontSize: "13px" }}
              />
            </div>
          )}
        </>
      ) : (
        <Button
          text={t(`navbar.sign-in`)}
          link={false}
          to=''
          className='signIn-btn'
          onClick={() => setOpenModal(true)}
          style={{ padding: "9px 23px" }}
        />
      )}
    </div>
  );
};

export default Navbar;
