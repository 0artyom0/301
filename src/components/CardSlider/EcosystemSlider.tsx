import { useRef, useState } from "react";
import ARROW from "../../assets/arrow.svg";
import "./index.css";
import cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import Header from "../Header";
import { storageBase } from "../../utils/storage";

interface EcosystemSliderProps {
  data: any;
}

const EcosystemSlider: React.FC<EcosystemSliderProps> = ({ data }) => {
  const { partners } = useSelector((state: RootState) => state.expertProject);
  const sliderRef = useRef(null);
  const scrollAmount = 200;

  const [active, setActive] = useState(0);
  const lang = cookies.get("i18next");

  const prevSlide = () => {
    setActive((active - 1 + data.length) % data.length);
  };

  const nextSlide = () => {
    setActive((active + 1) % data.length);
  };

  return (
    <div className='card_slider ecosystem_slider'>
      {data.map((ecosystem: any, index: number) => (
        <div
          key={index}
          className='card-container'
          style={
            {
              "--offset": (active - index) / 3,
              "--abs-offset": Math.abs(active - index) / 3,
              "--direction": Math.sign(active - index),
              "--opacity": Math.abs(active - index) <= 1 ? 1 : 0,
              "--active": index === active ? 1 : 0,
            } as React.CSSProperties
          }>
          <div className='ecosystem' key={ecosystem.id}>
            <div className='ecosystemInner'>
              <Header
                title={ecosystem.title}
                description={`${ecosystem.description.slice(0, 150)}...`}
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
        </div>
      ))}
      <button className='nav left' onClick={prevSlide}>
        <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
      </button>
      <button className='nav right' onClick={nextSlide}>
        <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
      </button>
    </div>
  );
};

export default EcosystemSlider;
