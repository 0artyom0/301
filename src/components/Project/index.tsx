import { useDispatch, useSelector } from "react-redux";
import FLAG from "../../assets/flag.svg";
import Button from "../Button";
import "./index.css";
import { fetchingProjectDetails } from "../../actions/apiActions";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../hooks/useWindowSize";
import { RootState } from "../../store/configureStore";
import { Spin } from "antd";

interface ProjectProps {
  author: string;
  authorImg: string;
  title?: string;
  flag: number;
  desc: string;
  projectImg: string;
  isSaved: boolean;
  id: number;
  heartit: () => void;
  slug: string;
  favoriteLoading?: boolean;
}

const Project: React.FC<ProjectProps> = ({
  author,
  authorImg,
  title,
  flag,
  desc,
  projectImg,
  isSaved,
  id,
  heartit,
  slug,
  favoriteLoading,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className='ourProject__project'>
      <div className='ourProject__projectInner'>
        <div className='ourProject__projectInfo'>
          <div className='ourProject__author'>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: author.length < 40 ? "center" : "flex-start",
              }}>
              <img
                src={authorImg}
                alt='Author'
                className='ourProject_author_img'
                decoding='async'
                loading='lazy'
              />
              <span>{author}</span>
            </div>
            {flag ? (
              <div className='flag'>
                <img src={FLAG} alt='FLAG' decoding='async' loading='lazy' />
                <span>{flag}</span>
              </div>
            ) : null}
          </div>
          {title ? (
            <div className='ourProject__title'>
              <span>
                {title && title.length > 19
                  ? `${title.slice(0, 18)}. . .`
                  : title}
              </span>
              {/* {flag ? (
              <div className='flag'>
                <img src={FLAG} alt='FLAG' />
                <span>{flag}</span>
              </div>
            ) : null} */}
            </div>
          ) : null}
          <div
            className='ourProject__desc'
            dangerouslySetInnerHTML={{
              __html:
                width < 1600
                  ? desc.length > 100
                    ? `${desc.slice(0, 140)}. . .`
                    : desc
                  : desc.length > 100
                  ? `${desc.slice(0, 200)}. . .`
                  : desc,
            }}
          />
        </div>
        <div
          className='btns'
          style={{ width: "100%", justifyContent: "space-between" }}>
          <Button
            text={t("btns.view")}
            link={true}
            to={slug}
            style={{
              padding: "9px 30px",
              height: "35px",
              background: "#DD264E",
              color: "#fff",
              fontWeight: "500",
            }}
            className='view-btn'
            onClick={() => {
              //@ts-ignore
              dispatch(fetchingProjectDetails(`project-details/${slug}`));
            }}
          />
          <button className={`heart-btn`} onClick={heartit}>
            {/* <span>{t("btns.save-project")}</span> */}
            <div className='heartWrapper'>
              {favoriteLoading ? (
                <Spin size='small' />
              ) : (
                <svg
                  className={`heart ${isSaved ? "liked" : ""}`}
                  viewBox='0 0 32 29.6'>
                  <path d='M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z' />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
      <div className='ourProject__projectImg'>
        <img src={projectImg} alt='Project' decoding='async' loading='lazy' />
      </div>
    </div>
  );
};

export default Project;
