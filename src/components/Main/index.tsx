import Background from "../Background";
import Header from "../Header";
import SIDE_PATTERN from "../../assets/patterns/side-1.svg";
import SIDE_PATTERN_MOBILE from "../../assets/patterns/side-1-mobile.svg";
import SMALL_PATTERN from "../../assets/patterns/small-1.svg";
import BIG_PATTERN from "../../assets/patterns/big-1.svg";
import LOGO from "../../assets/301.png";
import LOGO_MOBILE from "../../assets/301-mobile.png";
import "./index.css";
import FollowUs from "../FollowUs";
import { useWindowSize } from "../../hooks/useWindowSize";
import BG from "../../assets/info/main-page-bg.svg";
import BG_MOBILE from "../../assets/info/main-page-bg-mobile.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { HeaderKeyOf } from "../../utils/keyof.type";

interface MainProps {
  lang: string;
}

const Main: React.FC<MainProps> = ({ lang }) => {
  const windowSize = useWindowSize();
  const { t } = useTranslation();
  const { landOfWisdom } = useSelector(
    (state: RootState) => state.homeData.data
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Background
      pattern1={windowSize.width < 975 ? SIDE_PATTERN_MOBILE : SIDE_PATTERN}
      pattern2={SMALL_PATTERN}
      pattern3={BIG_PATTERN}
      bigPatternStyle={{
        display: windowSize.width < 975 ? "none" : "block",
      }}
      shoudHaveSidePattern={true}
      style={{
        flexDirection: windowSize.width < 975 ? "column" : "row",
        paddingLeft: windowSize.width < 975 ? "15px" : 0,
        paddingRight: windowSize.width < 975 ? "15px" : 0,
      }}>
      {windowSize.width < 975 && (
        <div className='bgLogo'>
          <img
            src={BIG_PATTERN}
            className='mainBigPattern'
            alt='Pattern'
            decoding='async'
            loading='lazy'
          />
          <img
            src={LOGO_MOBILE}
            alt='301'
            className='logoMobile'
            decoding='async'
            loading='lazy'
          />
        </div>
      )}
      <div className='bg'>
        <img
          src={windowSize.width < 975 ? BG_MOBILE : BG}
          alt='Background'
          decoding='async'
          loading='lazy'
        />
      </div>
      <Header
        title={landOfWisdom[`title_${lang}` as keyof HeaderKeyOf]}
        icon={""}
        description={landOfWisdom[`description_${lang}` as keyof HeaderKeyOf]}
        btns={[
          {
            name: isAuthenticated ? t("btns.donate") : t("btns.become-301"),
            become: "доноры «301»",
            id: 1,
            link: isAuthenticated
              ? `/donation`
              : `/accountType?id=1?type=donor`,
          },
          {
            name: t("btns.whole-project"),
            link: `/projects`,
            become: "",
            id: null,
          },
        ]}
        btnStyles={[
          {
            background: "#DD264E",
            color: "#fff",
            border: "none",
          },
          {
            border: "2px solid #151C26",
            background: "rgba(255, 255, 255, 0.12)",
          },
        ]}
        style={{ padding: 0, width: "30vw" }}
        className='mainPageHeader homePageHeader'
      />
      {windowSize.width > 975 && (
        <div className='bgLogo'>
          <img src={LOGO} alt='301' decoding='async' loading='lazy' />
        </div>
      )}
      <FollowUs className='mainFollowUs' />
    </Background>
  );
};

export default Main;
