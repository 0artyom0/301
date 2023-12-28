import "./index.css";
import { motion } from "framer-motion";
import FLAG from "../../assets/flag.svg";

interface SingleProjectBoxProps {
  title?: string;
  description?: string;
  author?: string;
  flag: number;
  authorImg?: string;
  budget?: string;
  collected?: string;
  projectImg?: string;
  className?: string;
  onClick?: () => void;
  buyBook?: boolean;
}

const SingleProjectBox: React.FC<SingleProjectBoxProps> = ({
  title,
  description,
  author,
  flag,
  authorImg,
  budget,
  collected,
  projectImg,
  className,
  onClick,
  buyBook,
}) => {
  const calcPercent = (val1: number, val2: number) => {
    return Math.floor((val1 / val2) * 100);
  };

  if (className?.includes("donation_project")) {
    return (
      <motion.div className={`${className} project`} onClick={onClick}>
        <div
          className='projectImg'
          style={{ backgroundImage: `url(${projectImg})` }}></div>
        <div className='projectInfo'>
          <div className='author'>
            <div className='ourProject__author'>
              <img
                src={authorImg}
                alt='Author'
                className='ourProject_author_img'
                decoding='async'
                loading='lazy'
              />
              <span>{author}</span>
            </div>
            {flag && (
              <span className='flag'>
                <img src={FLAG} alt='Flag' decoding='async' loading='lazy' />
                {flag}
              </span>
            )}
          </div>
          <div className='donationProject_title'>
            {title && <h1>{title}</h1>}
            {description && (
              <span className='donationProject_desc'>
                {description?.slice(0, 3)}
              </span>
            )}
          </div>
          <div className='project_progress'>
            <div className='projectProgress_info'>
              <span className='sum'>{budget} USD</span>
              {buyBook && (
                <span className='percent'>
                  {budget &&
                    collected &&
                    (+collected >= +budget
                      ? "100%"
                      : `${calcPercent(+collected, +budget)}%`)}
                </span>
              )}
            </div>
            {buyBook && (
              <div className='progress'>
                <div
                  className='progress_line'
                  style={{
                    width:
                      budget &&
                      collected &&
                      (+collected >= +budget
                        ? "100%"
                        : `${calcPercent(+collected, +budget)}%`),
                  }}></div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
  if (className?.includes("personal_project")) {
    return (
      <motion.div className={`${className} project`} onClick={onClick}>
        <div
          className='projectImg'
          style={{ backgroundImage: `url(${projectImg})` }}></div>
        <div className='projectInfo'>
          <div className='author'>
            <h1>{title}</h1>
            {flag && (
              <span className='flag'>
                <img src={FLAG} alt='Flag' decoding='async' loading='lazy' />
                {flag}
              </span>
            )}
          </div>
          <span className='donationProject_desc'>
            {description?.slice(0, 40)}...
          </span>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div className={`${className} project`}>
      <div
        className='projectImg'
        style={{ backgroundImage: `url(${projectImg})` }}></div>
      <div
        className={`${
          className === "home_project" && "projectInfo_withoutDesc_home"
        } projectInfo`}>
        <h1>{title}</h1>
        {description && <span>{description?.slice(0, 3)}</span>}
        <div className='author'>
          <span>{author}</span>
          {flag && (
            <span className='flag'>
              <img src={FLAG} alt='Flag' decoding='async' loading='lazy' />
              {flag}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SingleProjectBox;
