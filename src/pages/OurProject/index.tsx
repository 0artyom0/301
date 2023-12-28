import { Fragment, useEffect, useState } from "react";
import Background from "../../components/Background";
import Header from "../../components/Header";
import PATTERN from "../../assets/patterns/side-2.svg";
import PATTERN_MOBILE from "../../assets/patterns/side-2-mobile.svg";
import ICON from "../../assets/info/4.svg";
import Project from "../../components/Project";
import { Spin } from "antd";
import Button from "../../components/Button";
import { useWindowSize } from "../../hooks/useWindowSize";
import DropDown from "../../components/Dropdown";
import "./index.css";
import Footer from "../../components/Footer";
import ARROW_NEXT from "../../assets/arrow-next.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingFavoriteProjects,
  fetchingProjects,
  usePostRequest,
} from "../../actions/apiActions";
import { RootState } from "../../store/configureStore";
import { storageBase } from "../../utils/storage";
import { scrollToTop } from "../../globalFunctions/scrollToTop";
import { Helmet } from "react-helmet";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const OurProjects = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));
  const {t} = useTranslation()

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchingProjects("project"));
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  const lang = cookies.get("i18next") || "ru";

  const { data, loading } = useSelector(
    (state: RootState) => state.projectData
  );
  const { ourProject, projects, projectCategory, projectStatus } = data;
  const [projectCategory_id, setProjectCategory_id] = useState(1);
  const [projectStatus_id, setProjectStatus_id] = useState(1);
  const filteredProjects =
    projects &&
    projects[0]?.filter(
      (project: any) =>
        project.project.project_category_id === projectCategory_id &&
        project.project.project_status_id === projectStatus_id
    );

  const handleProjectCategory_id = (id: number) => {
    setProjectCategory_id(id);
  };

  const handleProjectStatus_id = (id: number) => {
    setProjectStatus_id(id);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages =
    filteredProjects &&
    new Array(Math.ceil(filteredProjects?.length / projectsPerPage)).fill(0);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    //@ts-ignore
    isAuthenticated && dispatch(fetchingFavoriteProjects("get-favorite"));
  }, [isAuthenticated, dispatch]);

  const { favoriteProjectsData } = useSelector(
    (state: RootState) => state.favoriteProjects
  );

  const favoriteLoading = useSelector(
    (state: RootState) => state.favoriteProjects.loading
  );

  const [favoriteProjects, setFavoriteProjects] = useState<number[]>(
    JSON.parse(localStorage.getItem("favoriteProjects") || "[]")
  );

  const { postRequest } = usePostRequest();
  const [clickedHeartBtnProjectId, setClickedHeartBtnProjectId] = useState<
    null | number
  >(null);

  const heartit = async (project_id: number, user_id: number) => {
    if (isAuthenticated) {
      setClickedHeartBtnProjectId(project_id);
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
      const existingProjects = JSON.parse(
        localStorage.getItem("favoriteProjects") || "[]"
      );

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

  if (loading)
    return (
      <div className='loadingContainer'>
        <Spin size='large' />
      </div>
    );

  return (
    <Background
      pattern1={windowSize.width < 800 ? PATTERN_MOBILE : PATTERN}
      sidePatter2Style={{ display: "none" }}
      style={{ flexDirection: "column", padding: "0" }}>
      <Helmet>
        <title>Our Projects</title>
      </Helmet>
      {ourProject && projects[0] && (
        <>
          <div className='filteringWrapper'>
            <Header
              title={ourProject[0][`title_${lang}`]}
              description={ourProject[0][`description_${lang}`]}
              icon={ICON}
            />
            {windowSize.width > 800 ? (
              <div className='filteringBtnsWrapper'>
                {projectCategory.map((category: any, i: number) => (
                  <button
                    disabled={false}
                    key={i}
                    className={`${
                      projectCategory_id === category.id && "activeProjectBtn"
                    }`}
                    onClick={() => handleProjectCategory_id(category.id)}>
                    {category[`name_${lang}`]}
                  </button>
                ))}
              </div>
            ) : (
              <DropDown
                items={projectCategory}
                onClickItem={handleProjectCategory_id}
                type='projectCategory'
                text={
                  projectCategory.find(
                    (category: any) => category.id === projectCategory_id
                  )[`name_${lang}`]
                }
                style={{ marginBottom: "20px" }}
                objKey='name'
              />
            )}
            {windowSize.width > 800 ? (
              <div className='typedBtnsWrapper'>
                {projectStatus.map((status: any, i: number) => (
                  <Fragment key={i}>
                    <Button
                      text={status[`name_${lang}`]}
                      link={false}
                      active={projectStatus_id === status.id}
                      to={""}
                      style={{
                        padding: "12px 22px",
                        border: "none",
                      }}
                      onClick={() => handleProjectStatus_id(status.id)}
                      disabled={false}
                      className='typedBtn'
                    />
                  </Fragment>
                ))}
              </div>
            ) : (
              <DropDown
                items={projectStatus}
                onClickItem={handleProjectStatus_id}
                type='projectStatus'
                text={
                  projectStatus.find(
                    (status: any) => status.id === projectStatus_id
                  )[`name_${lang}`]
                }
                style={{ marginRight: "auto" }}
                objKey='name'
              />
            )}
          </div>
          {currentProjects.length ? (
            currentProjects?.map((project: any, i: number) => {
              return (
                <Fragment key={i}>
                  <Project
                    author={project?.project[`project_name_${lang}`]}
                    authorImg={`${storageBase}/${project?.user?.image}`}
                    // title={project?.project[`project_name_en`]}
                    flag={
                      project?.project?.payment_type !== "buy" &&
                      project?.project?.payment_type !== "book" &&
                      project.map_count
                    }
                    desc={project?.project[`problem_description_${lang}`]}
                    projectImg={`${storageBase}/${project?.project?.image}`}
                    heartit={() =>
                      heartit(project?.project?.id, project?.user?.id)
                    }
                    isSaved={
                      isAuthenticated
                        ? favoriteProjectsData?.favorites?.findIndex(
                            (item: any) =>
                              item.project_id === project?.project?.id &&
                              item.user_id === user?.id
                          ) !== -1
                        : favoriteProjects.indexOf(project?.project?.id) !== -1
                    }
                    id={project?.project?.id}
                    slug={project?.project.slug}
                    favoriteLoading={
                      favoriteLoading &&
                      project?.project.id === clickedHeartBtnProjectId
                    }
                  />
                </Fragment>
              );
            })
          ) : (
            <div className='noProject'>{t("no-project")}</div>
          )}
          {totalPages && totalPages.length > 1 && !!currentProjects?.length && (
            <div className='pagination'>
              <Button
                text='Prev'
                link={false}
                to={""}
                icon={ARROW_NEXT}
                onClick={() => setCurrentPage(currentPage - 1)}
                style={{
                  border: "1px solid #000",
                  gap: "10px",
                  fontWeight: "500",
                  opacity: currentPage === 1 ? 0 : 1,
                  cursor: currentPage === 1 ? "unset" : "pointer",
                }}
                className='pagination_backBtn'
              />
              <div className='paginationBtnWrapper'>
                {totalPages.map((_: any, i: number) => (
                  <button
                    key={i}
                    className={`${
                      currentPage === i + 1 && "paginationBtn_active"
                    } paginationBtn`}
                    onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <Button
                text='Next'
                link={false}
                to={""}
                icon={ARROW_NEXT}
                onClick={() => setCurrentPage(currentPage + 1)}
                style={{
                  border: "1px solid #000",
                  gap: "10px",
                  fontWeight: "500",
                }}
                disabled={currentPage === totalPages.length}
              />
            </div>
          )}
          <Footer separatedPart={true} />
        </>
      )}
    </Background>
  );
};

export default OurProjects;
