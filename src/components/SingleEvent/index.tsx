import ADDRESS from "../../assets/calendar/location-icon.svg";
import DATE from "../../assets/calendar/time-icon.svg";
import Button from "../Button";
import "./index.css";

interface SingleEventProps {
  img: string;
  title: string;
  desc: string;
  address: string;
  date: string;
  className?: string;
}

const SingleEvent: React.FC<SingleEventProps> = ({
  img,
  title,
  desc,
  address,
  date,
  className,
}) => {
  return (
    <div className={`${className} event_wrapper`}>
      <div className='event_wrapper_img'>
        <img src={img} alt='Event' decoding='async' loading='lazy' />
      </div>
      <div className='event_info'>
        <p className='event_title'>{title}</p>
        <p className='event_desc'>{desc}</p>
        <div className='event_address'>
          <img src={ADDRESS} alt='Address' decoding='async' loading='lazy' />
          <p>{address}</p>
        </div>
        <div className='event_date'>
          <img src={DATE} alt='Address' decoding='async' loading='lazy' />
          <p>{date}</p>
        </div>
        <Button
          text='Participate'
          link={false}
          to={""}
          className='calendar_participate_btn'
        />
      </div>
    </div>
  );
};

export default SingleEvent;
