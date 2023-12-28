import { ReactNode } from "react";
import "./index.css";

interface BgProps {
  children: ReactNode;
  pattern1?: string;
  pattern2?: string;
  pattern3?: string;
  style?: Object;
  pattern2LeftStyle?: Object;
  pattern2RightStyle?: Object;
  bigPatternStyle?: Object;
  sidePatter1Style?: Object;
  sidePatter2Style?: Object;
  shoudHaveSidePattern?: boolean;
}

const Background: React.FC<BgProps> = ({
  pattern1,
  pattern2,
  pattern3,
  children,
  style,
  pattern2LeftStyle,
  pattern2RightStyle,
  bigPatternStyle,
  sidePatter1Style,
  sidePatter2Style,
  shoudHaveSidePattern,
}) => {
  return (
    <div className='bgContainer'>
      {pattern1 && (
        <div className='sidePattern1' style={sidePatter1Style}>
          <img src={pattern1} alt='Pattern' decoding='async' loading='lazy' />
        </div>
      )}
      {/* {pattern2 && (
        <div className="pattern1" style={pattern2LeftStyle}>
          <img src={pattern2} alt="Pattern" />
        </div>
      )} */}
      {pattern3 && (
        <div className='bigPattern' style={bigPatternStyle}>
          <img src={pattern3} alt='Pattern' decoding='async' loading='lazy' />
        </div>
      )}
      {/* {pattern2 && (
        <div className="pattern2" style={pattern2RightStyle}>
          <img src={pattern2} alt="Pattern" />
        </div>
      )} */}
      <div className='bgContent' style={style}>
        {children}
      </div>
      {pattern1 && shoudHaveSidePattern && (
        <div className='sidePattern2' style={sidePatter2Style}>
          <img src={pattern1} alt='Pattern' decoding='async' loading='lazy' />
        </div>
      )}
    </div>
  );
};

export default Background;
