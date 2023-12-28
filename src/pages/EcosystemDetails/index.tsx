import { useEffect, useRef, useState } from "react";
import Background from "../../components/Background";
import SAGES from "../../assets/info/1.svg";
import EXPERTS from "../../assets/info/10.svg";
import AMBASSADOR from "../../assets/signup-account-types/ambassador.svg";
import FRIENDS from "../../assets/signup-account-types/friends.svg";
import PARTNERS from "../../assets/signup-account-types/partners.svg";
import ELIPSE_SAGES from "../../assets/ecosystemDetails/elipse-sages.svg";
import ELIPSE_EXPERTS from "../../assets/ecosystemDetails/elipse-experts.svg";
import ELIPSE_AMBASSADORS from "../../assets/ecosystemDetails/elipse-ambassadors.svg";
import ELIPSE_FRIENDS from "../../assets/ecosystemDetails/elipse-friends.svg";
import Button from "../../components/Button";
import "./index.css";
import EcoSystemDetailsMember from "../../components/EcosystemDetailsMember";
import Footer from "../../components/Footer";
import { scrollToTop } from "../../globalFunctions/scrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../store/configureStore";
import {
  fetchingExpertProject,
  fetchingPartners,
} from "../../actions/apiActions";
import { Spin } from "antd";
import PATTERN from "../../assets/patterns/side-1.svg";
import PATTERN_MOBILE from "../../assets/patterns/side-1-mobile.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { openRecommentedModal } from "../../actions/donateAction";
import ClubIcon from "../../assets/info/7.svg";
import cookies from "js-cookie";
import ARROW from "../../assets/arrow.svg";

const EcoSystemDetails = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const ecosystemProject = [
    {
      name: "sages",
      color: "rgb(221, 38, 78)",
      colorWeak: "#DD264E99",
      icon: SAGES,
      elipse: ELIPSE_SAGES,
    },
    {
      name: "experts",
      color: "#42CFEE",
      colorWeak: "#42CFEE99",
      icon: EXPERTS,
      elipse: ELIPSE_EXPERTS,
    },
    {
      name: "ambassador",
      color: "",
      colorWeak: "",
      icon: AMBASSADOR,
      elipse: ELIPSE_AMBASSADORS,
    },
    {
      name: "friends-foundation",
      color: "#6442EE",
      colorWeak: "#6442EE99",
      icon: FRIENDS,
      elipse: ELIPSE_FRIENDS,
    },
    {
      name: "partners",
      color: "",
      colorWeak: "",
      icon: PARTNERS,
      elipse: "",
    },
    {
      name: "club301",
      color: "",
      colorWeak: "",
      icon: ClubIcon,
      elipse: "",
    },
  ];

  const dispatch = useDispatch();
  const { ecosystem } = useParams();

  useEffect(() => {
    if (ecosystem === "partners") {
      //@ts-ignore
      dispatch(fetchingExpertProject(`all-${ecosystem}`));
      //@ts-ignore
      dispatch(fetchingPartners("partners"));
    } else if (ecosystem === "friends-foundation") {
      //@ts-ignore
      dispatch(fetchingExpertProject("friends-foundation"));
    } else if (ecosystem === "club301") {
      //@ts-ignore
      dispatch(fetchingExpertProject("club-301"));
    } else if (ecosystem === "ambassador") {
      //@ts-ignore
      dispatch(fetchingExpertProject("ambassador"));
    } else {
      //@ts-ignore
      dispatch(fetchingExpertProject(`${ecosystem}-project`));
    }
  }, [dispatch, ecosystem]);

  const { data, partners, loading } = useSelector(
    (state: RootState) => state.expertProject
  );
  const [header, setHeader] = useState(null);
  const [project, setProject] = useState<any>(null);
  useEffect(() => {
    if (ecosystem) {
      if (ecosystem === "partners") {
        setHeader(partners?.partnersDescription);
      } else if (ecosystem === "ambassador") {
        setHeader(data?.ambassador_description);
      } else if (ecosystem === "friends-foundation") {
        setHeader(data?.friendsOfTheFoundationDescription);
      } else setHeader(data[ecosystem]);
    }
  }, [data, ecosystem, partners]);

  useEffect(() => {
    if (ecosystem) {
      if (ecosystem === "partners") {
        setProject(partners?.partners);
      } else if (ecosystem === "friends-foundation") {
        setProject(data?.friendsOfTheFoundation);
      } else if (ecosystem === "club301") {
        setProject(data?.donor);
      } else if (ecosystem === "ambassador") {
        setProject(data?.ambassador);
      } else {
        setProject(data[`${ecosystem}Project`]);
      }
    }
  }, [data, ecosystem, partners?.partners]);
  const lang = cookies.get("i18next");
  const ecosystemResult = ecosystemProject.find(e => e.name === ecosystem);
  const windowSize = useWindowSize();
  const { t } = useTranslation();

  const sliderRef = useRef(null);
  const scrollAmount = 200;

  const [showArrowBtns, setShowArrowBtns] = useState(false);
  const partnersContainer = document.querySelector(".partners");
  const images = document.querySelectorAll(".ecosystemDetails_partners_item");

  useEffect(() => {
    const gap = 30;
    let totalWidth = 0;
    if (partnersContainer && images) {
      images.forEach(img => {
        //@ts-ignore
        totalWidth += img.offsetWidth + gap;
      });
      //@ts-ignore
      setShowArrowBtns(totalWidth > partnersContainer.offsetWidth);
    }
  }, [partnersContainer, images]);

  if (loading)
    return (
      <div className='loadingContainer'>
        <Spin size='large' />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>
          {ecosystem &&
            ecosystem.split("-")[0].charAt(0).toUpperCase() +
              ecosystem.split("-")[0].slice(1)}
        </title>
      </Helmet>
      {header && (
        <>
          <Background
            style={{ flexDirection: "column" }}
            pattern1={windowSize.width < 975 ? PATTERN_MOBILE : PATTERN}>
            <div className='ecosystemDetails'>
              <div className='ecosystemDetails_'>
                <div className='ecosystemDetails-title'>
                  <img
                    src={ecosystemResult?.icon}
                    alt='Ecosystem'
                    decoding='async'
                    loading='lazy'
                  />
                  <h1>{header[`title_${lang}`]}</h1>
                </div>
                <div className='ecosystemDetails-header'>
                  <div className='ecosystemDetails-content'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: header[`description_${lang}`],
                      }}
                    />
                  </div>
                  <Button
                    text={t("btns.recommended")}
                    link={true}
                    to={`/${lang}/recommendation?ecosystem=${ecosystem}`}
                    style={{
                      background: ecosystemResult?.color,
                      color: "#fff",
                      marginLeft: "auto",
                      border: "none",
                    }}
                    className='recommented'
                    // onClick={() => dispatch(openRecommentedModal(true))}
                  />
                </div>
              </div>
              <div
                className={`${
                  ecosystem === "partners" &&
                  "projectDetails_slider_1 ecosystemDetails_partners partners"
                } ecoSystemDetailsMember_wrapper`}
                style={{ margin: 0, overflow: "initial" }}>
                {ecosystem === "partners" && (
                  <button
                    className='leftBtn'
                    style={{ left: "-25px" }}
                    onClick={() => {
                      const container = sliderRef.current;
                      if (container) {
                        //@ts-ignore
                        container.scrollLeft -= scrollAmount;
                      }
                    }}>
                    <img
                      src={ARROW}
                      alt='Arrow'
                      decoding='async'
                      loading='lazy'
                    />
                    {/* <ChevronLeftIcon /> */}
                  </button>
                )}
                {ecosystem === "partners" ? (
                  <div className='images-container' ref={sliderRef}>
                    {project?.map((p: any, i: number) => (
                      <EcoSystemDetailsMember
                        key={i}
                        expertProject={ecosystemResult}
                        project={p}
                      />
                    ))}
                  </div>
                ) : (
                  project?.map((p: any, i: number) => (
                    <EcoSystemDetailsMember
                      key={i}
                      expertProject={ecosystemResult}
                      project={p}
                    />
                  ))
                )}
                {ecosystem === "partners" && (
                  <button
                    className='rightBtn'
                    style={{ right: "-25px" }}
                    onClick={() => {
                      const container = sliderRef.current;
                      if (container) {
                        //@ts-ignore
                        container.scrollLeft += scrollAmount;
                      }
                    }}>
                    <img
                      src={ARROW}
                      alt='Arrow'
                      decoding='async'
                      loading='lazy'
                    />
                  </button>
                )}
              </div>
            </div>
          </Background>
          <Footer />
        </>
      )}
    </>
  );
};

export default EcoSystemDetails;
