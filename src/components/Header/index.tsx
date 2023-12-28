import { useWindowSize } from "../../hooks/useWindowSize";
import Button from "../Button";
import "./index.css";
import { useSelector } from "react-redux";
import cookies from "js-cookie";
import { RootState } from "../../store/configureStore";

interface HeaderProps {
  title: string;
  description: string;
  btns?: any;
  style?: Object;
  btnStyles?: React.CSSProperties[];
  icon?: string;
  mainImg?: string;
  className?: string;
  isEcosystem?: boolean;
  innerClassName?: string;
  id?: string;
  faqDesc?: any;
}

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  btns,
  icon,
  style,
  btnStyles,
  mainImg,
  className,
  isEcosystem,
  innerClassName,
  id,
  faqDesc,
}) => {
  const windowSize = useWindowSize();

  const lang = cookies.get("i18next");
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className={`${className} headerContainer`} id={id} style={style}>
      {icon && !isEcosystem && (
        <div className='icon'>
          <img src={icon} alt='Icon' decoding='async' loading='lazy' />
        </div>
      )}
      <div className='headerContent'>
        <div className={`${isEcosystem && "header_ecosystem"} header`}>
          {isEcosystem && (
            <div className='ecosystemImg'>
              <img src={icon} alt='Ecosystem' decoding='async' loading='lazy' />
            </div>
          )}
          <h1>{title}</h1>
        </div>
        {windowSize.width < 975 && mainImg && (
          <div className='mainImgHeader'>
            <img src={mainImg} alt='Main' decoding='async' loading='lazy' />
          </div>
        )}
        {description !== "" && (
          <div
            className={`${innerClassName} inner`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {faqDesc &&
          faqDesc.map((desc: string, i: number) => (
            <div
              key={i}
              className={`${innerClassName} inner`}
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          ))}
        {btns && (
          <div className='btns'>
            {btns.map((btn: any, index: number) => {
              if (isAuthenticated && isEcosystem) {
                return (
                  btn.become === "" && (
                    <Button
                      key={index}
                      text={btn.name}
                      style={btnStyles && btnStyles[index]}
                      link={btn.link !== ""}
                      to={`/${lang}${btn.link}`}
                      className={
                        className?.includes("homePageHeader")
                          ? "homePage_btn"
                          : undefined
                      }
                      // onClick={() => {
                      //   if (btn.become && btn.id) {
                      //     dispatch(
                      //       openAccountTypeModal({
                      //         open: true,
                      //         id: btn.id,
                      //         name: btn.become,
                      //         type: btn.type,
                      //       })
                      //     );
                      //     dispatch(isHomePageModal(true));
                      //   }
                      // }}
                    />
                    // ) : (
                    //   // <Button
                    //   //   key={index}
                    //   //   text={btn.name}
                    //   //   style={btnStyles && btnStyles[index]}
                    //   //   link={true}
                    //   //   to={`/${lang}/ecosystem/ambassadors`}
                    //   //   className={
                    //   //     className?.includes("homePageHeader")
                    //   //       ? "homePage_btn"
                    //   //       : undefined
                    //   //   }
                    //   //   // onClick={() => {
                    //   //   //   if (btn.become && btn.id) {
                    //   //   //     dispatch(
                    //   //   //       openAccountTypeModal({
                    //   //   //         open: true,
                    //   //   //         id: btn.id,
                    //   //   //         name: btn.become,
                    //   //   //         type: btn.type,
                    //   //   //       })
                    //   //   //     );
                    //   //   //     dispatch(isHomePageModal(true));
                    //   //   //   }
                    //   //   // }}
                    //   // />
                  )
                );
              } else {
                return (
                  <Button
                    key={index}
                    text={btn.name}
                    style={btnStyles && btnStyles[index]}
                    link={btn.link !== ""}
                    to={`/${lang}${btn.link}`}
                    className={
                      className?.includes("homePageHeader")
                        ? "homePage_btn"
                        : undefined
                    }
                    // onClick={() => {
                    //   if (btn.become && btn.id) {
                    //     dispatch(
                    //       openAccountTypeModal({
                    //         open: true,
                    //         id: btn.id,
                    //         name: btn.become,
                    //         type: btn.type,
                    //       })
                    //     );
                    //     dispatch(isHomePageModal(true));
                    //   }
                    // }}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
