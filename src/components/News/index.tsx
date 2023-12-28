import Background from "../Background";
import Header from "../Header";
import HeaderIcon from "../../assets/info/news.svg";
import SIDE_PATTERN_2 from "../../assets/patterns/side-2.svg";
import SIDE_PATTERN_2_MOBILE from "../../assets/patterns/side-2-mobile.svg";
// import NEWS_1 from "../../assets/news1.png";
import ARROW from "../../assets/arrow.svg";
import "./index.css";
import Button from "../Button";
import { useRef, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { HeaderKeyOf } from "../../utils/keyof.type";
import { storageBase } from "../../utils/storage";
import CardSlider from "../CardSlider";
import NewsSlider from "../CardSlider/NewsSlider";

export interface newsTypes {
  id: number;
  title_am: string;
  title_en: string;
  title_ru: string;
  description_am: string;
  description_ru: string;
  description_en: string;
  image: string;
  created_at: string;
}

interface NewsProps {
  lang: string;
}

const News: React.FC<NewsProps> = ({ lang }) => {
  const sliderRef = useRef(null);
  const scrollAmount = 500;

  const windowSize = useWindowSize();
  const { t } = useTranslation();
  const { news } = useSelector((state: RootState) => state.homeData.data);

  return (
    <>
      <div className='separatedPart'></div>
      <Background
        pattern1={
          windowSize.width < 975 ? SIDE_PATTERN_2_MOBILE : SIDE_PATTERN_2
        }
        pattern2LeftStyle={{
          width: "190px",
          height: "190px",
          top: "350px",
        }}
        pattern2RightStyle={{
          display: "none",
        }}
        style={{ flexDirection: "column", padding: "0" }}>
        <Header
          title={t("news-301")}
          description=''
          icon={HeaderIcon}
          style={{
            paddingTop: "40px",
            paddingBottom: "40px",
            width: "63vw",
            alignItems: "center",
          }}
          id='news'
        />
        {/* <button className='leftBtn newsBtn' onClick={handleBack}>
          <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
        </button>
        <button className='rightBtn newsBtn' onClick={handleNext}>
          <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
        </button> */}
        <div className='projectDetails_slider_1 partners _inner newsProjectDetailsSlider'>
          {windowSize.width > 900 && (
            <button
              className='leftBtn'
              onClick={() => {
                const container = sliderRef.current;
                if (container) {
                  //@ts-ignore
                  container.scrollLeft -= scrollAmount;
                }
              }}>
              <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
            </button>
          )}
          <div className='images-container newsWrapper' ref={sliderRef}>
            {windowSize.width > 900 ? (
              news.slice(0, 4).map((item: any) => {
                const dynamicTitle = item[`title_${lang}` as keyof HeaderKeyOf];
                const altText =
                  typeof dynamicTitle === "string" ? dynamicTitle : "";
                return (
                  <div className={`news`} key={item.id}>
                    <div className='newsImg'>
                      <img
                        src={`${storageBase}/${item.image}`}
                        alt={altText}
                        decoding='async'
                        loading='lazy'
                      />
                    </div>
                    <div className='newsContent'>
                      <h1>{dynamicTitle}</h1>
                      <div
                        dangerouslySetInnerHTML={{
                          //@ts-ignore
                          __html:
                            item[`description_${lang}` as keyof newsTypes],
                        }}
                      />
                      <p>{item.created_at.split("T")[0] as keyof newsTypes}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <NewsSlider data={news} />
            )}
          </div>
          {windowSize.width > 900 && (
            <button
              className='rightBtn'
              onClick={() => {
                const container = sliderRef.current;
                if (container) {
                  //@ts-ignore
                  container.scrollLeft += scrollAmount;
                }
              }}>
              <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
            </button>
          )}
        </div>
        {/* <div
          className='btns newsBtns'
          style={{ margin: 0, padding: "0 20px", marginBottom: "40px" }}>
          <Button
            text={t("btns.all-news")}
            style={{
              color: "#DD264E",
              boxShadow: "-21px 16px 38px 0px rgba(191, 9, 48, 0.21)",
              margin: windowSize.width < 975 ? 0 : "50px 0",
              // padding: "15px 30px",
            }}
            link={true}
            to={""}
            className='homePage_btn'
          />
        </div> */}
      </Background>
    </>
  );
};

export default News;
