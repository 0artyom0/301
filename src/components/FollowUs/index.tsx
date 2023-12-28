import "./index.css";
import FB from "../../assets/fb.svg";
import IG from "../../assets/ig.svg";
import LI from "../../assets/li.svg";
import TG from "../../assets/tg.svg";
import WA from "../../assets/wa.svg";
import FB_WHITE from "../../assets/fb-white.svg";
import IG_WHITE from "../../assets/ig-white.svg";
import LI_WHITE from "../../assets/li-white.svg";
import TG_WHITE from "../../assets/tg-white.svg";
import WA_WHITE from "../../assets/wa-white.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

interface FollowUsProps {
  className?: Object;
}

const FollowUs: React.FC<FollowUsProps> = ({ className }) => {
  const { followUs } = useSelector((state: RootState) => state.homeData.data);

  const medias = [
    {
      id: 1,
      img: className ? FB : FB_WHITE,
      name: "Facebook",
      link: followUs?.facebook,
    },
    {
      id: 2,
      img: className ? IG : IG_WHITE,
      name: "Instagram",
      link: followUs?.instagram,
    },
    {
      id: 3,
      img: className ? LI : LI_WHITE,
      name: "Linked In",
      link: followUs?.linkedin,
    },
    {
      id: 4,
      img: className ? TG : TG_WHITE,
      name: "Telegram",
      link: followUs?.telegram,
    },
    {
      id: 5,
      img: className ? WA : WA_WHITE,
      name: "Whats App",
      link: followUs?.whatsapp,
    },
  ];

  return (
    <div className={`${className} followUsContainer`}>
      <div className='verticalText'>
        <span>Follow Us</span>
      </div>
      <div className='line'></div>
      <div className='socialMedias'>
        {medias.map(media => (
          <a
            href={media.link}
            target='_blank'
            rel='noreferrer'
            className='media'
            key={media.id}>
            <img
              src={media.img}
              alt={media.name}
              decoding='async'
              loading='lazy'
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FollowUs;
