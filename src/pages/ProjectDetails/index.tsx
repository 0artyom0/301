import { useWindowSize } from "../../hooks/useWindowSize";
import ROSE_CIRCLE from "../../assets/projectAuthor/rose-circle.png";
import GREEN_CIRCLE from "../../assets/projectAuthor/green-circle.png";
import ORANGE_CIRCLE from "../../assets/projectAuthor/orange-circle.png";
import YELLOW_CIRCLE from "../../assets/projectAuthor/yellow-circle.png";
import BLUE_CIRCLE from "../../assets/projectAuthor/blue-circle.png";
import PURPLE_CIRCLE from "../../assets/projectAuthor/purple-circle.png";
import Button from "../../components/Button";
import ARROW from "../../assets/arrow.svg";
import FLAG from "../../assets/flag.svg";
import PATTERN from "../../assets/projectAuthor/pattern.svg";
import ARROW_TEAM_LEFT from "../../assets/arrow-left-team-member.svg";
import ARROW_TEAM_RIGHT from "../../assets/info/arrow-right-team-member.svg";
import "./index.css";
import RevolveText from "../../components/Revolve";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingFavoriteProjects,
  fetchingProjectDetails,
  fetchingProjects,
  usePostRequest,
} from "../../actions/apiActions";
import { RootState } from "../../store/configureStore";
import { useNavigate, useParams } from "react-router";
import Footer from "../../components/Footer";
import Background from "../../components/Background";
import PATTERN_SIDE from "../../assets/patterns/side-2.svg";
import PATTERN_MOBILE from "../../assets/patterns/side-2-mobile.svg";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { storageBase } from "../../utils/storage";
import { scrollToTop } from "../../globalFunctions/scrollToTop";
import { Helmet } from "react-helmet";
import "react-slideshow-image/dist/styles.css";
import BUDGET from "../../assets/projectAuthor/budget.svg";
import COLLECTED from "../../assets/projectAuthor/collected.svg";
import cookies from "js-cookie";

const ProjectDetails = () => {
  const { t } = useTranslation();
  const lang = cookies.get("i18next");
  const colors = [
    "#DD264E",
    "#189387",
    "#C5D92D",
    "#2DD9B0",
    "#D9562D",
    "#D92DD2",
    "#EB407A",
    "#87B63B",
    "#7BA8FF",
    "#EB4040",
    "#CFA81F",
    "#7BD7FF",
  ];
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));

  const windowSize = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const donationsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { name } = useParams();
  useEffect(() => {
    //@ts-ignore
    dispatch(fetchingProjects("project"));
    //@ts-ignore
    dispatch(fetchingProjectDetails(`project-details/${name}`));
  }, [dispatch, name]);

  useEffect(() => {
    scrollToTop();
  }, []);

  const { data, loading } = useSelector(
    (state: RootState) => state.projectDetails
  );
  const { partners, project, projectCategory, projectStatus } = data;
  const { ourProject } = useSelector(
    (state: RootState) => state.projectData.data
  );
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

  useEffect(() => {
    if (project) {
      const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        const isIntersectingFromBottom = entry.isIntersecting;
        setIsVisible(isIntersectingFromBottom);
      });

      const currentRef = donationsRef.current;

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }
  }, [project]);

  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const scrollAmount = 200;

  const checkRole = (role: string) => {
    if (role === "project_manager") return ROSE_CIRCLE;
    if (role === "donor") return GREEN_CIRCLE;
    if (role === "ambassador") return ORANGE_CIRCLE;
    if (role === "volunteer") return YELLOW_CIRCLE;
    if (role === "experts") return BLUE_CIRCLE;
    if (role === "partners") return PURPLE_CIRCLE;
    return ROSE_CIRCLE;
  };

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    //@ts-ignore
    isAuthenticated && dispatch(fetchingFavoriteProjects("get-favorite"));
  }, [isAuthenticated, dispatch]);

  const { favoriteProjectsData } = useSelector(
    (state: RootState) => state.favoriteProjects
  );
  const getFavortieLoading = useSelector(
    (state: RootState) => state.favoriteProjects.loading
  );

  const { postRequest } = usePostRequest();
  const [favoriteProjects, setFavoriteProjects] = useState<number[]>(
    JSON.parse(localStorage.getItem("favoriteProjects") || "[]")
  );

  const existingProjects = JSON.parse(
    localStorage.getItem("favoriteProjects") || "[]"
  );

  const heartit = async (project_id: number, user_id: number) => {
    if (isAuthenticated) {
      const existingFavorite = favoriteProjectsData.favorites.find(
        (fav: any) => fav.project_id === project_id && fav.user_id === user?.id
      );

      try {
        if (existingFavorite) {
          await postRequest(
            "favorite",
            { project_id, user_id: user?.id, favorite: "remove" },
            {}
          );
        } else {
          await postRequest(
            "favorite",
            { project_id, user_id: user?.id, favorite: "add" },
            {}
          );
        }
        //@ts-ignore
        dispatch(fetchingFavoriteProjects("get-favorite"));
      } catch (error) {
        // Handle error if postRequest fails
        console.error("Error occurred:", error);
      }
    } else {
      const index = existingProjects.indexOf(project_id);

      if (index !== -1) {
        existingProjects.splice(index, 1);
      } else {
        existingProjects.push(project_id);
      }
      localStorage.setItem(
        "favoriteProjects",
        JSON.stringify(existingProjects)
      );
      setFavoriteProjects(
        JSON.parse(localStorage.getItem("favoriteProjects") || "[]")
      );
    }
  };
  const modifiedTeam = data?.team
    ?.reduce((acc: any, member: any) => {
      const foundIndex = acc.findIndex(
        (item: any) => item.role === member.role
      );

      if (foundIndex !== -1) {
        acc[foundIndex].id.push(member.id);
        acc[foundIndex].name.push(member.name);
        acc[foundIndex].last_name.push(member.last_name);
        acc[foundIndex].image?.push(member.last_name);
      } else {
        acc.push({
          id: [member.id],
          name: [member.name],
          last_name: [member.last_name],
          image: [member.image],
          role: member.role,
        });
      }
      return acc;
    }, [])
    .filter((t: any) => t.role !== "sages");
  const [nextMember, setNextMember] = useState({});

  const handleNextMember = (memberIdx: number, direction: number) => {
    const updatedNextMember = { ...nextMember };
    //@ts-ignore
    updatedNextMember[memberIdx] =
      //@ts-ignore
      (updatedNextMember[memberIdx] || 0) + direction;
    setNextMember(updatedNextMember);
  };

  if (loading)
    return (
      <div className='loadingContainer'>
        <Spin size='large' />
      </div>
    );

  return (
    <Background
      pattern1={windowSize.width < 800 ? PATTERN_MOBILE : PATTERN_SIDE}
      sidePatter2Style={{ display: "none" }}
      style={{ flexDirection: "column", padding: "0" }}>
      <Helmet>
        <title>{project && project[`project_name_${lang}`]}</title>
      </Helmet>
      {project && ourProject && (
        <>
          {/* <div className='filteringWrapper'>
            <Header
              title={ourProject[0][`title_${lang}`]}
              description={ourProject[0][`description_${lang}`]}
              icon={ICON}
            />
            {windowSize.width > 800 ? (
              <div className='filteringBtnsWrapper'>
                {projectCategory.map((category: any, i: number) => (
                  <button disabled={true} key={i}>
                    {category[`name_${lang}`]}
                  </button>
                ))}
              </div>
            ) : (
              <DropDown
                items={projectCategory}
                onClickItem={() => {}}
                type='projectCategory'
                text={
                  projectCategory.find((category: any) => category.id === 1)[
                    `name_${lang}`
                  ]
                }
                style={{ marginBottom: "20px" }}
                objKey='name'
              />
            )}
            {windowSize.width > 800 ? (
              <div className='typedBtnsWrapper'>
                {projectStatus.map((status: any) => (
                  <Fragment key={status.id}>
                    <Button
                      text={status[`name_${lang}`]}
                      link={false}
                      to={""}
                      style={{
                        padding: "12px 22px",
                        border: "none",
                      }}
                      disabled={true}
                      className='typedBtn'
                    />
                  </Fragment>
                ))}
              </div>
            ) : (
              <DropDown
                items={projectStatus}
                onClickItem={() => {}}
                type='projectStatus'
                text={
                  projectStatus.find((status: any) => status.id === 1)[
                    `name_${lang}`
                  ]
                }
                style={{ marginRight: "auto" }}
                objKey='name'
              />
            )}
          </div> */}
          <div className='fullProjectContainer'>
            <div className='fullProjectInner'>
              <div className='fullProjectBg'>
                <div className='overlay'></div>
                <button
                  className='backBtn'
                  onClick={() => navigate("/projects")}>
                  <img
                    src={ARROW}
                    alt='Back Button'
                    decoding='async'
                    loading='lazy'
                  />
                </button>
                <img
                  src={`${storageBase}/${project.banner_image}`}
                  alt='Project Background'
                  className='bgImg'
                  decoding='async'
                  loading='lazy'
                />
                <h1 className='fullProjectBg_title'>
                  {project[`project_name_${lang}`]}
                </h1>
              </div>
              <div className='fullProject_inner'>
                <div className='fullProject_titleInner'>
                  <div className='titlePart'>
                    <h2>{project[`project_name_${lang}`]}</h2>
                    {project.payment_type !== "buy" &&
                      project.payment_type !== "book" && (
                        <div className='flag'>
                          <img
                            src={FLAG}
                            alt='Flag'
                            decoding='async'
                            loading='lazy'
                          />
                          <span>{data.map_count}</span>
                        </div>
                      )}
                  </div>
                  <div className='ourProject__author'>
                    <img
                      src={`${storageBase}/${data?.user?.image}`}
                      alt='Author'
                      className='ourProject_author_img'
                      decoding='async'
                      loading='lazy'
                    />
                    <span>
                      {data?.user && data.user[`name_${lang}`]}{" "}
                      {data?.user && data.user[`last_name_${lang}`]}
                    </span>
                  </div>
                </div>
                <div className='fullProject_problemInner'>
                  <div className='problem_header'>
                    <div className='problem_heading'>
                      <img
                        src={PATTERN}
                        alt='Pattern'
                        decoding='async'
                        loading='lazy'
                      />
                      <h2>{t("project-details.problem")}</h2>
                    </div>
                    {/* {windowSize.width > 600 && (
                      <button className='download_pdf'>
                        <span>{t("btns.download-pdf")}</span>
                        <img src={PDF} alt='Pdf' />
                      </button>
                    )} */}
                  </div>
                  <div
                    className='problem_inner'
                    dangerouslySetInnerHTML={{
                      __html: project[`problem_description_${lang}`],
                    }}
                  />
                  {/* <div
                    className='problem_inner'
                    dangerouslySetInnerHTML={{
                      __html: project[`problem_description_${lang}`],
                    }}
                  /> */}
                  {/* {windowSize.width < 600 && (
                    <button className='download_pdf'>
                      <span>dawload presentation pdf</span>
                      <img src={PDF} alt='Pdf' />
                    </button>
                  )} */}
                </div>
                {project.video && (
                  <div className='videoContainer _inner'>
                    <ReactPlayer
                      url={`${storageBase}/${project.video}`}
                      width='100%'
                      controls
                    />
                  </div>
                )}
                {project.payment_type !== "buy" &&
                project.payment_type !== "book" ? (
                  <div className='roadMapContainer'>
                    {project &&
                    project.month_data &&
                    project.month_data[0]?.month_am !== "-" ? (
                      <div className='roadMap_heading problem_heading'>
                        <img src={PATTERN} alt='Pattern' />
                        <h2>
                          {+project.budget_price !== 0
                            ? t("project-details.road-map")
                            : t("project-in-progress")}
                        </h2>
                      </div>
                    ) : null}
                    {project &&
                      (+project.budget_price !== 0 ? (
                        <div className='roadMap_inner _inner'>
                          <div className='fullProject_slider'>
                            {project?.month_data.length ? (
                              <div className='chartContainer'>
                                <div className='chart_line'></div>
                                {project?.month_data.map(
                                  (month: any, i: number) => {
                                    return (
                                      <div className='chart' key={i}>
                                        <div className='chart_info'>
                                          {/* <h1>{month.month}</h1>asdasd */}
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                month[
                                                  `month_description_${lang}`
                                                ],
                                            }}
                                          />
                                        </div>
                                        <div className='chart_month'>
                                          {month.map_status ? (
                                            <img
                                              src={FLAG}
                                              alt='Flag'
                                              style={{
                                                marginLeft: "16px",
                                              }}
                                              decoding='async'
                                              loading='lazy'
                                            />
                                          ) : (
                                            <div
                                              style={{ height: "19px" }}></div>
                                          )}
                                          <div
                                            className='month_circle'
                                            style={{
                                              backgroundColor: colors[i],
                                            }}></div>
                                          <div className='month'>
                                            {month[`month_${lang}`]}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            ) : null}
                          </div>
                          <div className='budgetContainer'>
                            <div className='budget'>
                              <img
                                // src={`${storageBase}/${project?.budget_image}`}
                                src={BUDGET}
                                alt='Budget'
                                decoding='async'
                                loading='lazy'
                              />
                              <div className='budgetPrice'>
                                <span>{t("budget")}</span>
                                <h2>{project?.budget_price}$</h2>
                              </div>
                            </div>
                            <div className='collected'>
                              <img
                                // src={`${storageBase}/${project.collected_image}`}
                                src={COLLECTED}
                                alt='Collected'
                                decoding='async'
                                loading='lazy'
                              />
                              <div className='collectedPrice'>
                                <span>{t("collected")}</span>
                                <h2>{data.collectedPrice}$</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null)}
                  </div>
                ) : null}
                {modifiedTeam.length ? (
                  <div className='workTeamContainer'>
                    <div className='roadMap_heading problem_heading'>
                      <img
                        src={PATTERN}
                        alt='Pattern'
                        decoding='async'
                        loading='lazy'
                      />
                      <h2>Work Team</h2>
                    </div>
                    <div className='teamMembers _inner'>
                      <div className='firstTeam'>
                        {modifiedTeam?.map((t: any, i: number) => {
                          if (t.role !== "sages")
                            return (
                              <div className='memberWrapper' key={t.id}>
                                <div className='memberWrapper_withoutName'>
                                  {t?.id.length > 1 && (
                                    <button
                                      className='arrowBtn_teamMember'
                                      onClick={() =>
                                        //@ts-ignore
                                        (nextMember[i] === undefined ||
                                          //@ts-ignore
                                          nextMember[i] > 0) &&
                                        handleNextMember(i, -1)
                                      }>
                                      <img src={ARROW_TEAM_LEFT} alt='Arrow' />
                                    </button>
                                  )}
                                  <div className='member'>
                                    <img
                                      src={checkRole(t.role)}
                                      alt='Team Member'
                                      className='teamMember_bgImg'
                                      decoding='async'
                                      loading='lazy'
                                    />
                                    <img
                                      src={`${storageBase}/${
                                        t.image &&
                                        //@ts-ignore
                                        (t.image[nextMember[i]] || t?.image[0])
                                      }`}
                                      alt='Team Member'
                                      className='teamMember_img'
                                      decoding='async'
                                      loading='lazy'
                                    />
                                    <RevolveText
                                      span={50}
                                      north={0}
                                      spiral={false}
                                      size={200}
                                      text={t.role.split("_").join(" ")}
                                    />
                                  </div>
                                  {t?.id.length > 1 && (
                                    <button
                                      className='arrowBtn_teamMember'
                                      onClick={() => {
                                        //@ts-ignore
                                        (nextMember[i] === undefined ||
                                          //@ts-ignore
                                          nextMember[i] < t.id.length) &&
                                          handleNextMember(i, 1);
                                      }}>
                                      <img src={ARROW_TEAM_RIGHT} alt='Arrow' />
                                    </button>
                                  )}
                                </div>
                                <p className='member_name'>
                                  {
                                    //@ts-ignore
                                    t.name[nextMember[i]] || t?.name[0]
                                  }{" "}
                                  {
                                    //@ts-ignore
                                    t.last_name[nextMember[i]] ||
                                      t?.last_name[0]
                                  }
                                </p>
                              </div>
                            );
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}
                {partners.length ? (
                  <div className='partnersContainer'>
                    <div className='roadMap_heading problem_heading'>
                      <img
                        src={PATTERN}
                        alt='Pattern'
                        decoding='async'
                        loading='lazy'
                      />
                      <h2>{t("project-details.partners")}</h2>
                    </div>
                    {/* <div className='projectDetails_slider'>
                    <button
                      className='leftBtn'
                      onClick={() => {
                        const container = sliderRef.current;
                        if (container) {
                          //@ts-ignore
                          container.scrollLeft -= scrollAmount;
                        }
                      }}>
                      <img src={ARROW} alt='Arrow' />
                    </button> */}
                    {/* <div
                      className='ecosystemDetails_partners partners _inner'
                      ref={carousel}>
                      <div className='innerPartners'>
                        {partners.map((partner: any) => (
                          <div
                            className='ecosystemDetails_partners_item'
                            key={partner.id}>
                            <img
                              src={`${storageBase}/${partner.image}`}
                              alt={partner.name}
                            />
                          </div>
                        ))}
                      </div>
                    </div> */}
                    {/* <div
                      className='ecosystemDetails_partners partners _inner'
                      ref={sliderRef}>
                      {partners.map((partner: any) => {
                        return (
                          <div
                            className='ecosystemDetails_partners_item'
                            key={partner.id}>
                            <img
                              src={`${storageBase}/${partner.image}`}
                              alt={partner.name}
                              className='image'
                            /> */}
                    {/* <img
                              className='image'
                              alt='sliderImage'
                              src={`${storageBase}/${partner.image}`}
                            /> */}
                    {/* </div>
                        );
                      })}
                    </div> */}
                    {/* <button
                      className='rightBtn'
                      onClick={() => {
                        const container = sliderRef.current;
                        if (container) {
                          //@ts-ignore
                          container.scrollLeft += scrollAmount;
                        }
                      }}>
                      <img src={ARROW} alt='Arrow' />
                    </button> */}
                    {/* </div> */}
                    <div className='projectDetails_slider_1 partners _inner'>
                      {showArrowBtns && (
                        <button
                          className='leftBtn'
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
                        {partners.map((partner: any) => {
                          return (
                            <div
                              className='ecosystemDetails_partners_item'
                              key={partner.id}>
                              <img
                                alt='sliderImage'
                                src={`${storageBase}/${partner.image}`}
                                decoding='async'
                                loading='lazy'
                              />
                            </div>
                          );
                        })}
                      </div>
                      {showArrowBtns && (
                        <button
                          className='rightBtn'
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
                  </div>
                ) : null}
                <div className='_inner dontaionBtns_wrapper' ref={donationsRef}>
                  <div
                    className={`${
                      !isVisible && "dontaionBtnsFixed"
                    } dontaionBtns`}
                    style={{ position: isVisible ? "static" : "fixed" }}>
                    <Button
                      text={t("add-to-interesting")}
                      link={false}
                      to=''
                      svg={
                        getFavortieLoading ? (
                          <Spin size='small' />
                        ) : (
                          <svg
                            className={`heart ${
                              isAuthenticated
                                ? favoriteProjectsData?.favorites?.findIndex(
                                    (item: any) =>
                                      item.project_id === project?.id &&
                                      item.user_id === user.id
                                  ) !== -1
                                  ? "liked"
                                  : ""
                                : favoriteProjects.indexOf(project?.id) !== -1
                                ? "liked"
                                : ""
                            }`}
                            viewBox='0 0 32 29.6'>
                            <path d='M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'></path>
                          </svg>
                        )
                      }
                      style={{
                        color: "#717883",
                        border: "1px solid #000",
                        gap: "10px",
                        padding: "9px 35spx",
                        fontWeight: 600,
                        width: "100%",
                      }}
                      className='donationBtn'
                      onClick={() => heartit(project.id, data.user.id)}
                    />
                    {project && project.budget_price ? (
                      <Button
                        text={t(`${project.payment_type}`)}
                        link={true}
                        to={`/${lang}/projects-donation/${project.slug}`}
                        style={{
                          color: "#fff",
                          background: "#DD264E",
                          boxShadow: "0px 26px 40px 0px rgba(191, 9, 48, 0.15)",
                          padding: "12px 35px",
                          width: !isVisible ? "auto" : "100%",
                        }}
                        onClick={() => {
                          // dispatch(
                          //   openDonateSingleProject(true, "projectDetails")
                          // );
                          dispatch(
                            //@ts-ignore
                            fetchingProjectDetails(
                              `project-details/${project.slug}`
                            )
                          );
                        }}
                        className='donationBtn'
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer separatedPart={true} />
        </>
      )}
    </Background>
  );
};

export default ProjectDetails;
