import { useState } from "react";
import ARROW from "../../assets/arrow.svg";
import "./index.css";
import Button from "../Button";
import cookies from "js-cookie";
import { storageBase } from "../../utils/storage";
import { HeaderKeyOf } from "../../utils/keyof.type";
import { newsTypes } from "../News";

interface NewsSliderProps {
  data: any;
}

const NewsSlider: React.FC<NewsSliderProps> = ({ data }) => {
  const [active, setActive] = useState(0);
  const lang = cookies.get("i18next");

  const prevSlide = () => {
    setActive((active - 1 + data.length) % data.length);
  };

  const nextSlide = () => {
    setActive((active + 1) % data.length);
  };

  return (
    <div className='card_slider news_slider'>
      {data.map((item: any, index: number) => {
        const dynamicTitle = item[`title_${lang}` as keyof HeaderKeyOf];
        const altText = typeof dynamicTitle === "string" ? dynamicTitle : "";
        return (
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
                    __html: item[`description_${lang}` as keyof newsTypes],
                  }}
                />
                <p>{item.created_at.split("T")[0] as keyof newsTypes}</p>
              </div>
            </div>
          </div>
        );
      })}
      <button className='nav left' onClick={prevSlide}>
        <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
      </button>
      <button className='nav right' onClick={nextSlide}>
        <img src={ARROW} alt='Arrow' decoding='async' loading='lazy' />
      </button>
    </div>
  );
};

export default NewsSlider;
