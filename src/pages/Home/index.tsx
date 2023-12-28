import Main from "../../components/Main";
import Background from "../../components/Background";
import Header from "../../components/Header";
import About from "../../components/Hypotheses";
import Projects from "../../components/Projects";
import Ecosystem from "../../components/Ecosystem";
import News from "../../components/News";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import { useWindowSize } from "../../hooks/useWindowSize";
import SIDE_PATTERN_2 from "../../assets/patterns/side-2.svg";
import SIDE_PATTERN_2_MOBILE from "../../assets/patterns/side-2-mobile.svg";
import SMALL_PATTERN_2 from "../../assets/patterns/small-2.svg";
import BIG_PATTERN_2 from "../../assets/patterns/big-2.svg";
import BIG_PATTERN_3 from "../../assets/patterns/big-3.svg";
import ICON_1 from "../../assets/info/1.svg";
import ICON_2 from "../../assets/info/2.svg";
import ICON_3 from "../../assets/info/3.svg";
import { Fragment, useEffect } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchingHome } from "../../actions/apiActions";
import { RootState } from "../../store/configureStore";
import { useTranslation } from "react-i18next";
import { HeaderTypes } from "../../utils/api.types";
import { HeaderKeyOf } from "../../utils/keyof.type";
import { Helmet } from "react-helmet";
import cookies from "js-cookie";

const Home = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchingHome("home"));
  }, [dispatch]);

  const lang = cookies.get("i18next") || "ru";

  const { loading, data } = useSelector((state: RootState) => state.homeData);
  if (loading)
    return (
      <div className='loadingContainer'>
        <Spin size='large' />
      </div>
    );

  const {
    OurProjects,
    dataHypotheses,
    ourMission,
    projects,
    whyImportant,
    hypothesesForTheFuture,
    landOfWisdom,
  } = data;

  const sections = [
    {
      id: 1,
      title: ourMission && ourMission[0][`title_${lang}`],
      shortDescription:
        ourMission && ourMission[0][`short_description_${lang}`],
      description: ourMission && ourMission[0][`description_${lang}`],
      btn: [
        {
          name: t("btns.learn-more"),
          link: "/about-us",
        },
      ],
      icon: ICON_1,
      pattern1: undefined,
      pattern2: SMALL_PATTERN_2,
      pattern3: BIG_PATTERN_2,
      shoudHaveSidePattern: false,
      innerClassName: undefined,
    },
    {
      id: 2,
      title:
        whyImportant && whyImportant[0][`title_${lang}` as keyof HeaderKeyOf],
      shortDescription: "",
      description:
        whyImportant &&
        whyImportant[0][`description_${lang}` as keyof HeaderKeyOf],
      btn: undefined,
      icon: ICON_2,
      pattern1: windowSize.width < 975 ? SIDE_PATTERN_2_MOBILE : SIDE_PATTERN_2,
      pattern2: SMALL_PATTERN_2,
      pattern3: BIG_PATTERN_3,
      shoudHaveSidePattern: false,
      innerClassName: "importantInner",
    },
    {
      id: 3,
      title:
        hypothesesForTheFuture &&
        hypothesesForTheFuture[0][`title_${lang}` as keyof HeaderTypes],
      shortDescription: "",
      description:
        hypothesesForTheFuture &&
        hypothesesForTheFuture[0][`description_${lang}` as keyof HeaderTypes],
      btn: undefined,
      icon: ICON_3,
      pattern1: windowSize.width < 975 ? SIDE_PATTERN_2_MOBILE : SIDE_PATTERN_2,
      pattern2: undefined,
      pattern3: undefined,
      shoudHaveSidePattern: false,
      innerClassName: "hypothesesInner",
    },
  ];

  return (
    <>
      <Helmet>
        <title>301 | Home</title>
      </Helmet>
      {data && landOfWisdom && (
        <>
          <Main lang={lang} />
          {sections.map(section => (
            <Fragment key={section.id}>
              <div className='separatedPart'></div>
              <Background
                pattern1={section.pattern1}
                pattern2={section.pattern2}
                pattern3={section.pattern3}
                shoudHaveSidePattern={section.shoudHaveSidePattern}
                style={{ padding: "60px 0" }}>
                <Header
                  title={section.title}
                  description={section.description}
                  btns={section.btn}
                  icon={section.icon}
                  innerClassName={section.innerClassName}
                  className='differedHeaderContainer homePageHeader'
                />
              </Background>
            </Fragment>
          ))}
          <About dataHypotheses={dataHypotheses} lang={lang} />
          <Projects OurProjects={OurProjects} lang={lang} projects={projects} />
          <Ecosystem lang={lang} />
          <News lang={lang} />
          <Contact separatedPart={true} />
          <Footer separatedPart={true} />
        </>
      )}
    </>
  );
};

export default Home;
