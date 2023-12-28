import Modal from "../Modal";
import EcosystemModal from "../EcosystemModal";
import Button from "../Button";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { congratsModal } from "../../actions/congratsAction";
import PATTERN_1 from "../../assets/patterns/login-small.svg";
import PATTERN_2 from "../../assets/patterns/login-big.svg";
import { useTranslation } from "react-i18next";

const Conragts = () => {
  const dispatch = useDispatch();
  const { text, open } = useSelector((state: RootState) => state.congrats);

  const handleClose = () => {
    dispatch(congratsModal(false, null));
  };

  const { t } = useTranslation();

  return (
    <Modal setOpenModal={handleClose} openModal={open} headerShow={true}>
      <EcosystemModal
        back={false}
        onClose={handleClose}
        header=''
        className='conragts_modal'
        headerChildren={
          <div className='congrats_pattern'>
            <img
              src={PATTERN_1}
              alt='Pattern'
              decoding='async'
              loading='lazy'
            />
            <img
              src={PATTERN_2}
              alt='Pattern'
              decoding='async'
              loading='lazy'
            />
            <img
              src={PATTERN_1}
              alt='Pattern'
              decoding='async'
              loading='lazy'
            />
          </div>
        }>
        <div className='conragts_modal_content'>
          <p
            className='conragts_text'
            dangerouslySetInnerHTML={{ __html: text }}></p>
          <Button
            text={t("btns.ok")}
            link={false}
            to={""}
            style={{
              padding: "9px 25px",
              background: "#DD264E",
              color: "#fff",
              width: "150px",
            }}
            onClick={handleClose}
          />
        </div>
      </EcosystemModal>
    </Modal>
  );
};

export default Conragts;
