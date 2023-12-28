import Background from "../../components/Background";
import SIDE_PATTERN from "../../assets/patterns/side-about-us.svg";
import SIDE_PATTERN_MOBILE from "../../assets/patterns/side-1-mobile.svg";
import Footer from "../../components/Footer";
import { useWindowSize } from "../../hooks/useWindowSize";
import IMG_1 from "../../assets/calendar/img-1.png";
import ADDRESS from "../../assets/calendar/location-icon.svg";
import PRICE from "../../assets/calendar/price-icon.svg";
import DATE from "../../assets/calendar/time-icon.svg";
import "./index.css";
import Button from "../../components/Button";
import HEART from "../../assets/calendar/heart.svg";
import Map from "../../components/Map";
import { events } from "../Calendar";
import SingleEvent from "../../components/SingleEvent";
import QR from "../../assets/calendar/qr-icon.svg";
import BOOKED_NOT_SELECTED from "../../assets/calendar/booked-not-selected-icon.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const CalendarDetails = () => {
  const windowSize = useWindowSize();
  const [book, setBook] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Background
        pattern1={windowSize.width < 800 ? SIDE_PATTERN_MOBILE : SIDE_PATTERN}
        style={{
          flexDirection: "column",
          gap: "40px",
          padding: 0,
          paddingBottom: "40px",
        }}>
        <div className='calendar_details_1'>
          <div className='calendar_details_1_bg'>
            <img
              src={IMG_1}
              alt='Calendar Details'
              decoding='async'
              loading='lazy'
            />
            <p className='calendar_details_1_title'>
              Lorem Ipsum is simply dummy
            </p>
          </div>
          <div className='calendar_details_wrapper'>
            <div className='calendar_details_1_info_wrapper'>
              <div className='calendar_details_1_content'>
                <p className='calendar_details_1_info_title'>
                  Lorem Ipsum is simply dummy
                </p>
                <p className='calendar_details_1_info_desc'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into{" "}
                </p>
                <div className='calendar_details_address_wrapper'>
                  <div className='calendar_details_address'>
                    <img
                      src={ADDRESS}
                      alt='Address'
                      decoding='async'
                      loading='lazy'
                    />
                    <p>Ереван, ул. Московяна 24</p>
                  </div>
                  <div className='calendar_details_date'>
                    <img
                      src={DATE}
                      alt='Date'
                      decoding='async'
                      loading='lazy'
                    />
                    <p>Fri, 10 Nov AM 10:30</p>
                  </div>
                  <div className='calendar_details_price'>
                    <img
                      src={PRICE}
                      alt='Date'
                      decoding='async'
                      loading='lazy'
                    />
                    <p>{20}$</p>
                  </div>
                </div>
                <div className='calendar_details_btns'>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                    }}>
                    <Button
                      text='Booked'
                      link={false}
                      to={""}
                      style={{
                        background: "#313A4B",
                        border: "none",
                        color: "#fff",
                        padding: "9px 25px",
                        boxShadow: "0px 26px 40px 0px rgba(191, 9, 48, 0.15)",
                        width: "100%",
                      }}
                      onClick={() => setBook(true)}
                    />
                    <Button
                      text='view qr'
                      link={false}
                      to=''
                      icon={QR}
                      style={{
                        color: "#fff",
                        background: "#DD264E",
                        gap: "10px",
                        padding: "9px 25px",
                        fontWeight: 600,
                        width: "100%",
                      }}
                    />
                  </div>
                  <Button
                    text={t("add-to-interesting")}
                    link={false}
                    to=''
                    icon={HEART}
                    style={{
                      color: "#717883",
                      border: "1px solid rgba(49, 58, 75, 0.19)",
                      gap: "10px",
                      padding: "9px 25px",
                      fontWeight: 600,
                      width: "50%",
                    }}
                  />
                </div>
              </div>
              <div className='calendar_details_1_info_map_wrapper'>
                <Map />
                <div className='calendar_details_address'>
                  <p>Ереван, ул. Московяна 24</p>
                </div>
              </div>
            </div>
          </div>
          <div className='recommended_events_wrapper'>
            <p className='recommended_events_title'>Recommended events</p>
            <div className='recommended_events'>
              {events.slice(0, 4).map(event => (
                <SingleEvent
                  img={event.img}
                  title={event.title}
                  desc={event.desc}
                  address={event.address}
                  date={event.date}
                  className='recommended_event'
                />
              ))}
            </div>
          </div>
        </div>
      </Background>
      <Footer />
    </>
  );
};

export default CalendarDetails;
