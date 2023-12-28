import Header from "../Header";
import EcosystemIcon from "../../assets/info/5.svg";
import SagesIcon from "../../assets/info/6.svg";
import ClubIcon from "../../assets/info/7.svg";
import AmbassadorIcon from "../../assets/info/8.svg";
import ExpertIcon from "../../assets/info/10.svg";
import PartnersIcon from "../../assets/info/11.svg";
import FriendsIcon from "../../assets/info/12.svg";
import SAGES from "../../assets/info/sages.svg";
import CLUB from "../../assets/info/club.svg";
import AMBASSDOR from "../../assets/info/ambassador.svg";
import EXPERT from "../../assets/info/expert.svg";
import PARTNERS from "../../assets/info/partners.svg";
import FRIENDS from "../../assets/info/fond.svg";
import Background from "../Background";
import SIDE_PATTERN_2 from "../../assets/patterns/side-2.svg";
import SIDE_PATTERN_2_MOBILE from "../../assets/patterns/side-2-mobile.svg";
import "./index.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { HeaderTypes } from "../../utils/api.types";
import { HeaderKeyOf } from "../../utils/keyof.type";
import { storageBase } from "../../utils/storage";
import { useEffect, useRef } from "react";
import { fetchingPartners } from "../../actions/apiActions";
import ARROW from "../../assets/arrow.svg";
import EcosystemSlider from "../CardSlider/EcosystemSlider";

interface EcosystemProps {
  lang: string;
}

const Ecosystem: React.FC<EcosystemProps> = ({ lang }) => {
  const { t } = useTranslation();
  const {
    ourEcosystem,
    //@ts-ignore
    sages,
    club301,
    ambassadors,
    experts,
    partnerInfo,
    foundationFriends,
  } = useSelector((state: RootState) => state.homeData.data);
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(fetchingPartners("partners"));
  }, [dispatch]);

  const { partners } = useSelector((state: RootState) => state.expertProject);
  const data = [
    {
      id: 1,
      title: sages[0][`title_${lang}` as keyof HeaderTypes],
      headerIcon: SagesIcon,
      description: sages[0][`description_${lang}` as keyof HeaderTypes],
      mainImg: SAGES,
      btn: [
        {
          name: t("btns.learn-more"),
          link: "/ecosystem/sages",
          id: null,
          become: "",
        },
      ],
      btnStyle: [
        {
          // padding: "13px 40px",
          color: "#000",
        },
      ],
      partners: null,
    },
    {
      id: 2,
      title: club301[0][`title_${lang}` as keyof HeaderTypes],
      headerIcon: ClubIcon,
      description: club301[0][`description_${lang}` as keyof HeaderTypes],
      mainImg: CLUB,
      btn: [
        {
          name: t("btns.become-301"),
          become: "доноры «301»",
          id: 1,
          link: "/accountType?id=1?type=donor",
        },
        // {
        //   name: t("btns.learn-more"),
        //   link: "/ecosystem/club301",
        //   become: "",
        //   id: null,
        // },
      ],
      btnStyle: [
        {
          background: "#189387",
          color: "#fff",
          // padding: "13px 40px",
          boxShadow: "-21px 16px 38px 0px rgba(24, 147, 135, 0.38)",
          border: "none",
        },
        {
          border: "1px solid #189387",
          // padding: "13px 40px",
          color: "#000",
        },
      ],
      partners: null,
    },
    {
      id: 3,
      title: ambassadors[0][`title_${lang}` as keyof HeaderTypes],
      headerIcon: AmbassadorIcon,
      description: ambassadors[0][`description_${lang}` as keyof HeaderTypes],
      mainImg: AMBASSDOR,
      btn: [
        {
          name: t("btns.become-ambassador"),
          link: "/accountType?id=2?type=ambassadors",
          become: "Амбассадор",
          id: 2,
        },
      ],
      btnStyle: [
        {
          background: "#EE8842",
          color: "#fff",
          // padding: "13px 40px",
          border: "none",
          boxShadow: " -21px 16px 38px 0px rgba(238, 136, 66, 0.42)",
        },
      ],
      partners: null,
    },
    {
      id: 5,
      title: experts[0][`title_${lang}` as keyof HeaderTypes],
      headerIcon: ExpertIcon,
      description: experts[0][`description_${lang}` as keyof HeaderTypes],
      mainImg: EXPERT,
      btn: [
        {
          name: t("btns.become-expert"),
          link: "/accountType?id=3?type=experts",
          become: "Эксперты",
          id: 3,
        },
        // {
        //   name: t("btns.learn-more"),
        //   link: "/ecosystem/experts",
        //   become: "",
        //   id: null,
        // },
      ],
      btnStyle: [
        {
          background: " #42CFEE",
          border: "none",
          // padding: "13px 40px",
          color: "#fff",
          boxShadow: "-21px 16px 38px 0px rgba(66, 207, 238, 0.36)",
        },
        {
          // padding: "13px 40px",
          color: "#000",
          borderColor: "#42CFEE",
        },
      ],
      partners: null,
    },
    {
      id: 6,
      title: partnerInfo && partnerInfo[0] && partnerInfo[0][`title_${lang}`],
      headerIcon: PartnersIcon,
      description:
        partnerInfo &&
        partnerInfo[0] &&
        partnerInfo &&
        partnerInfo[0][`description_${lang}`],
      mainImg: PARTNERS,
      btn: [
        {
          name: t("btns.become-partner"),
          link: "/accountType?id=4?type=partners",
          become: "Партнеры",
          id: 4,
        },
        {
          name: t("btns.all-partners"),
          link: "/ecosystem/partners",
          become: "",
          id: null,
        },
      ],
      btnStyle: [
        {
          background: "#C12DD9",
          color: "#fff",
          // padding: "13px 40px",
          border: "none",
          boxShadow: "-21px 16px 38px 0px rgba(193, 45, 217, 0.32)",
        },
        {
          border: "1px solid #C12DD9",
          // padding: "13px 40px",
          color: "#000",
        },
      ],
      partners: partners?.partners,
    },
    {
      id: 7,
      title: foundationFriends[0][`title_${lang}` as keyof HeaderTypes],
      headerIcon: FriendsIcon,
      description:
        foundationFriends[0][`description_${lang}` as keyof HeaderTypes],
      mainImg: FRIENDS,
      btn: [
        {
          name: t("btns.become-fund-friend"),
          link: "/accountType?id=5?type=friends",
          become: "Друзья",
          id: 5,
        },
        // {
        //   name: t("btns.learn-more"),
        //   link: "/ecosystem/friends-foundation",
        //   become: "",
        //   id: null,
        // },
      ],
      btnStyle: [
        {
          background: "#6442EE",
          // padding: "13px 40px",
          border: "none",
          color: "#fff",
          boxShadow: "-21px 16px 38px 0px rgba(100, 66, 238, 0.37)",
        },
        {
          border: "1px solid #6442EE",
          color: "#000",
        },
      ],
      partners: null,
    },
  ];
  const windowSize = useWindowSize();
  const sliderRef = useRef(null);
  const scrollAmount = 200;

  return (
    <>
      <div className='separatedPart'></div>
      <Background
        pattern1={
          windowSize.width < 975 ? SIDE_PATTERN_2_MOBILE : SIDE_PATTERN_2
        }
        shoudHaveSidePattern={false}
        style={{ flexDirection: "column", padding: "60px 0" }}>
        <Header
          title={ourEcosystem[0][`title_${lang}` as keyof HeaderKeyOf]}
          description={
            ourEcosystem[0][`description_${lang}` as keyof HeaderKeyOf]
          }
          icon={EcosystemIcon}
          style={{ marginBottom: "80px" }}
          className='differedHeaderContainer'
        />
        <div className='ecosystemContainer'>
          {windowSize.width > 900 ? (
            data.map(ecosystem => (
              <div className='ecosystem' key={ecosystem.id}>
                <div className='ecosystemInner'>
                  <Header
                    title={ecosystem.title}
                    description={ecosystem.description}
                    btns={ecosystem.btn}
                    icon={ecosystem.headerIcon}
                    btnStyles={ecosystem.btnStyle}
                    style={{ padding: 0 }}
                    mainImg={ecosystem.mainImg}
                    isEcosystem={true}
                    className='homePageHeader'
                  />
                  <div className='img'>
                    <img
                      src={ecosystem.mainImg}
                      alt='Icon'
                      decoding='async'
                      loading='lazy'
                    />
                  </div>
                </div>
                {ecosystem.partners && (
                  <div className='projectDetails_slider_1 partners _inner'>
                    <button
                      className='leftBtn'
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
                    </button>
                    <div className='images-container' ref={sliderRef}>
                      {ecosystem.partners.map((partner: any) => {
                        return (
                          <div
                            className='ecosystemDetails_partners_item'
                            key={partner.id}>
                            <img
                              alt='sliderImage'
                              src={`${storageBase}/${partner.image}`}
                              decoding='async'
                              loading='lazy'
                            />
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className='rightBtn'
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
                  </div>
                )}
              </div>
            ))
          ) : (
            <EcosystemSlider data={data} />
          )}
        </div>
      </Background>
    </>
  );
};

export default Ecosystem;
