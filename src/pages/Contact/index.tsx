import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import Header from "../../components/Header";
import { Helmet } from "react-helmet";
import SIDE_PATTERN from "../../assets/patterns/side-about-us.svg";
import SIDE_PATTERN_MOBILE from "../../assets/patterns/side-1-mobile.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import Background from "../../components/Background";
import Map from "../../components/Map";
import LOCATION from "../../assets/location-black.svg";
import PHONE from "../../assets/phone-black.svg";
import EMAIL from "../../assets/email-black.svg";
import FACEBOOK from "../../assets/fb.svg";
import INSTAGRAM from "../../assets/ig.svg";
import LINKEDIN from "../../assets/li.svg";
import TELEGRAM from "../../assets/tg.svg";
import WHATSAPP from "../../assets/wa.svg";
import "./index.css";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import cookies from "js-cookie";

const ContactPage = () => {
  const windowSize = useWindowSize();
  const { t } = useTranslation();
  const lang = cookies.get("i18next");

  const { data, loading } = useSelector((state: RootState) => state.contact);

  if (loading)
    return (
      <div className='loadingContainer'>
        <Spin size='large' />
      </div>
    );

  return (
    <div className='media_container'>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <Background
        pattern1={windowSize.width < 800 ? SIDE_PATTERN_MOBILE : SIDE_PATTERN}
        style={{
          flexDirection: "column",
          gap: "40px",
          padding: 0,
          paddingBottom: "40px",
        }}>
        <div className='media_header_wrapper'>
          <Header
            title={data?.contactText && data.contactText[`title_${lang}`]}
            description={
              data?.contactText && data.contactText[`description_${lang}`]
            }
          />
        </div>
        <Contact contactPage={true} className='contactPageContactForm' />
        <div className='contactPage_address_wrapper'>
          <div className='contactPage_address_1'>
            <p className='contactPage_address_title'>{t("contact.title")}</p>
            <div className='contactPage_adresses'>
              <div className='contactPage_address'>
                <img
                  src={LOCATION}
                  alt='Location'
                  decoding='async'
                  loading='lazy'
                />
                {data?.contact && data.contact[`address_${lang}`]}
              </div>
              <div className='contactPage_address'>
                <img src={PHONE} alt='Phone' decoding='async' loading='lazy' />
                {data?.contact?.phone}
              </div>
              <div className='contactPage_address'>
                <img
                  src={EMAIL}
                  alt='Location'
                  decoding='async'
                  loading='lazy'
                />
                {data?.contact?.email}
              </div>
            </div>
            <p className='contactPage_address_title'>{t("follow-us")}</p>
            <div className='contactPage_medias'>
              <a href='facebook.com'>
                <img
                  src={FACEBOOK}
                  alt='Facebook'
                  decoding='async'
                  loading='lazy'
                />
              </a>
              <a href='instagram.com'>
                <img
                  src={INSTAGRAM}
                  alt='Instagram'
                  decoding='async'
                  loading='lazy'
                />
              </a>
              <a href='linkedin.com'>
                <img
                  src={LINKEDIN}
                  alt='Linked In'
                  decoding='async'
                  loading='lazy'
                />
              </a>
              <a href='telegram.com'>
                <img
                  src={TELEGRAM}
                  alt='Telegram'
                  decoding='async'
                  loading='lazy'
                />
              </a>
              <a href='whatsapp.com'>
                <img
                  src={WHATSAPP}
                  alt='Whats App'
                  decoding='async'
                  loading='lazy'
                />
              </a>
            </div>
          </div>
          <div className='contactPage_address_2'>
            {true ? <Map /> : <Spin size='small' />}
          </div>
        </div>
      </Background>
      <Footer />
    </div>
  );
};

export default ContactPage;
