import Background from "../Background";
import Header from "../Header";
import SIDE_PATTERN_2 from "../../assets/patterns/side-2.svg";
import SIDE_PATTERN_2_MOBILE from "../../assets/patterns/side-2-mobile.svg";
import SMALL_PATTERN_1 from "../../assets/patterns/small-1.svg";
import ICON from "../../assets/info/4.svg";
import ARROW from "../../assets/arrow.svg";
import "./index.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { removeHtmlTags } from "../../globalFunctions/removeHtmlTags";
import { HeaderTypes, ProjectsTypes } from "../../utils/api.types";
import { HeaderKeyOf, ProjectKeyOf } from "../../utils/keyof.type";
import SingleProjectBox from "../SingleProjectBox";
import { storageBase } from "../../utils/storage";
import { NavLink } from "react-router-dom";

interface ProjectsProps {
  OurProjects: HeaderTypes[];
  lang: string;
  projects: ProjectsTypes[];
}

const Projects: React.FC<ProjectsProps> = ({ OurProjects, lang }) => {
  const { t } = useTranslation();
  const windowSize = useWindowSize();
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    carousel.current &&
      windowSize.width &&
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [windowSize.width]);

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const { projects } = useSelector((state: RootState) => state.homeData.data);

  const [showArrowBtns, setShowArrowBtns] = useState(false);

  useEffect(() => {
    const partnersContainer = document.querySelector(".partners ");
    const images = document.querySelectorAll(".ecosystemDetails_partners_item");
    const gap = 30;
    let totalWidth = 0;
    if (partnersContainer && images) {
      images.forEach(img => {
        //@ts-ignore
        totalWidth += img.offsetWidth + gap;
      });
      //@ts-ignore
      setShowArrowBtns(totalWidth > partnersContainer.offsetWidth);
    }
  }, []);

  const sliderRef = useRef(null);
  const scrollAmount = 200;

  return (
    <>
      {projects && (
        <>
          <div className='separatedPart'></div>
          <Background
            pattern1={
              windowSize.width < 975 ? SIDE_PATTERN_2_MOBILE : SIDE_PATTERN_2
            }
            pattern2={SMALL_PATTERN_1}
            shoudHaveSidePattern={false}
            style={{ padding: "60px 0" }}>
            <div className='projectsContainer' id='projects'>
              <Header
                title={OurProjects[0][`title_${lang}` as keyof HeaderKeyOf]}
                description={
                  OurProjects[0][`description_${lang}` as keyof HeaderKeyOf]
                }
                icon={ICON}
                className='differedHeaderContainer'
                style={{ width: "100%" }}
              />
              <div className='slider'>
                {windowSize.width > 975 ? (
                  <div
                    className='projectDetails_slider_1'
                    style={{ padding: 0 }}>
                    {true && (
                      <button
                        className='leftBtn'
                        style={{ left: "-25px" }}
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
                        {/* <ChevronLeftIcon /> */}
                      </button>
                    )}
                    <div className='images-container' ref={sliderRef}>
                      {projects.map((project: any) => {
                        return (
                          <NavLink
                            to={`/${lang}/projects/${project.project.slug}`}
                            key={project.project.id}>
                            <SingleProjectBox
                              title={
                                project.project[
                                  `project_name_${lang}` as keyof ProjectKeyOf
                                ]
                              }
                              // description={removeHtmlTags(
                              //   project.project[
                              //     `description_${lang}` as keyof ProjectKeyOf
                              //   ]
                              // )
                              //   ?.split(" ")
                              //   .slice(0, 2)
                              //   .join(" ")}
                              flag={
                                project?.project?.payment_type !== "buy" &&
                                project?.project?.payment_type !== "book" &&
                                project.map_count
                              }
                              author={
                                project[`sector_${lang}` as keyof ProjectKeyOf]
                              }
                              projectImg={`${storageBase}/${project.project.image}`}
                              className='home_project'
                            />
                          </NavLink>
                        );
                      })}
                    </div>
                    {true && (
                      <button
                        className='rightBtn'
                        style={{ right: "-25px" }}
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
                    )}
                  </div>
                ) : (
                  <div className='innerCarousel'>
                    {projects.slice(0, 4).map((project: any) => {
                      return (
                        <NavLink
                          to={`/${lang}/projects/${project.project.slug}`}
                          key={project.project.id}>
                          <SingleProjectBox
                            title={
                              project.project[
                                `project_name_${lang}` as keyof ProjectKeyOf
                              ]
                            }
                            // description={removeHtmlTags(
                            //   project.project[
                            //     `description_${lang}` as keyof ProjectKeyOf
                            //   ]
                            // )
                            //   ?.split(" ")
                            //   .slice(0, 2)
                            //   .join(" ")}
                            flag={
                              project?.project?.payment_type !== "buy" &&
                              project?.project?.payment_type !== "book" &&
                              project.map_count
                            }
                            author={
                              project[`sector_${lang}` as keyof ProjectKeyOf]
                            }
                            projectImg={`${storageBase}/${project.project.image}`}
                            className='home_project'
                          />
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className='btns'>
                <Button
                  text={t("btns.other-projects")}
                  style={{
                    background: "#DD264E",
                    boxShadow: "-21px 16px 38px 0px rgba(191, 9, 48, 0.21)",
                    color: "#fff",
                  }}
                  link={true}
                  to='/projects'
                  className='homePage_btn'
                />
              </div>
            </div>
          </Background>
        </>
      )}
    </>
  );
};

export default Projects;
