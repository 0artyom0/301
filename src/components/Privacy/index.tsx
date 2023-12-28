import Modal from "../Modal";
import EcosystemModal from "../EcosystemModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingPrivacyPolicy } from "../../actions/apiActions";
import { RootState } from "../../store/configureStore";
import { Spin } from "antd";
import { HeaderKeyOf } from "../../utils/keyof.type";
import { useLocation, useNavigate } from "react-router";
import cookies from "js-cookie";
import "./index.css";
import { hasPreviousHistory, history } from "../Navbar";

const Privacy = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const endpoint =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  useEffect(() => {
    dispatch(
      //@ts-ignore
      fetchingPrivacyPolicy("get-data")
    );
  }, [dispatch]);

  const { data, loading } = useSelector(
    (state: RootState) => state.privacyPolicy
  );
  const lang = cookies.get("i18next");
  const navigate = useNavigate();

  const navigateBack = () => {
    if (hasPreviousHistory()) navigate(-1);
    else {
      navigate("/");
    }
  };

  return (
    <Modal setOpenModal={navigateBack} openModal={true}>
      <EcosystemModal
        back={false}
        onClose={navigateBack}
        header={
          //@ts-ignore
          (data && data[endpoint] && data[endpoint][`title_${lang}`]) || ""
        }
        className='modal_back'>
        <div
          className={`agreementTerms_${loading && "loading"} agreementTerms`}
          style={{
            fontFamily: lang === "am" ? "Montserrat Arm" : "Montserrat",
          }}>
          {loading && data ? (
            <Spin size='large' />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html:
                  data &&
                  //@ts-ignore
                  data[endpoint] &&
                  //@ts-ignore
                  data[endpoint][`description_${lang}` as keyof HeaderKeyOf],
              }}
            />
          )}
        </div>
      </EcosystemModal>
    </Modal>
  );
};

export default Privacy;
