import EcosystemModal from "../EcosystemModal";
import Modal from "../Modal";
import SingleProjectBox from "../SingleProjectBox";
import "./index.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchingProjectDetails } from "../../actions/apiActions";
import { Spin } from "antd";
import { storageBase } from "../../utils/storage";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import cookies from "js-cookie";
import { hasPreviousHistory } from "../Navbar";

const DonationProjectsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateBack = () => {
    if (hasPreviousHistory()) navigate(-1);
    else {
      navigate("/");
    }
  };

  const handleSingleProject = (slug: string) => {
    // dispatch(openDonateSingleProject(true, "donation"));
    // setDonateProjects(false);
    //@ts-ignore
    dispatch(fetchingProjectDetails(`project-details/${slug}`));
  };
  const [p, setP] = useState(null);

  const { t } = useTranslation();
  const lang = cookies.get("i18next");

  useEffect(() => {
    fetch("https://301.machtech.site/api/get-all-project")
      .then(response => response.json())
      .then(data => setP(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Modal setOpenModal={navigateBack} openModal={true}>
      <EcosystemModal
        back={true}
        className='modal_back'
        onClose={navigateBack}
        header={t("btns.donate")}>
        <div className='donationProjects_wrapper'>
          <div className='donationProjects_title'>{t("select-project")}</div>
          {false ? (
            <div className='donationProjects_spinner'>
              <Spin size='large' />
            </div>
          ) : (
            <div
              className='donationProjects'
              style={{ justifyContent: "flex-start" }}>
              {p &&
                //@ts-ignore
                p?.data
                  .filter(
                    (p: any) =>
                      p.project.payment_type !== "buy" &&
                      p.project.payment_type !== "book"
                  )
                  ?.map((p: any, i: number) => {
                    return (
                      <NavLink
                        to={`/${lang}/projects-donation/${p.project.slug}`}
                        key={i}>
                        <SingleProjectBox
                          // title={p?.project[`project_name_${lang}`]}
                          // description={removeHtmlTags(
                          //   p?.project[`problem_description_${lang}`]
                          // )}
                          flag={
                            p?.project?.payment_type !== "buy" &&
                            p?.project?.payment_type !== "book" &&
                            p.map_count
                          }
                          author={
                            p && p.project && p?.project[`project_name_${lang}`]
                          }
                          authorImg={`${storageBase}/${p?.sages?.image}`}
                          budget={p?.project?.budget_price}
                          collected={p?.collectedPrice}
                          projectImg={`${storageBase}/${p?.project?.image}`}
                          className='donation_project'
                          onClick={() => handleSingleProject(p?.project?.slug)}
                          buyBook={
                            p?.project?.payment_type !== "buy" &&
                            p?.project?.payment_type !== "book"
                          }
                        />
                      </NavLink>
                    );
                  })}
            </div>
          )}
        </div>
      </EcosystemModal>
    </Modal>
  );
};

export default DonationProjectsModal;
