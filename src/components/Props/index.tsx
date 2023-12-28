import { useNavigate } from "react-router";
import Modal from "../Modal";
import "./index.css";
import { hasPreviousHistory } from "../Navbar";
import EcosystemModal from "../EcosystemModal";
import DRAM from "../../assets/armenian-dram.png";
import EURO from "../../assets/euro.png";
import RUBLE from "../../assets/russian-ruble.png";
import DOLLAR from "../../assets/dollar.png";
import { useTranslation } from "react-i18next";

const Props = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateBack = () => {
    if (hasPreviousHistory()) navigate(-1);
    else {
      navigate("/");
    }
  };

  return (
    <Modal setOpenModal={navigateBack} openModal={true}>
      <EcosystemModal back={false} onClose={navigateBack} header={t("props")}>
        <div className='propsContainer'>
          <div className='propsMainInfo'>
            {/* <div className='valuta'>
              <img src={DRAM} alt='valuta' />
            </div> */}
            <p className='propsTitle'>{t("props-info.title")}</p>
            <div className='propsInfoContainer'>
              {/* <div className='propsInfo1'>
                <p className='accountHolderTitle'>ՀՎՀՀ`</p>
                <p className='accountHolderDescription'>01309994</p>
              </div> */}
              <div className='propsInfo1'>
                <p className='accountHolderTitle'>
                  {t("props-info.address-title")}
                </p>
                <p className='accountHolderDescription'>
                  {t("props-info.address")}
                </p>
              </div>
              {/* <div className='propsInfo1'>
                <p className='accountHolderTitle'>«ԱՄԵՐԻԱԲԱՆԿ» ՓԲԸ</p>
                <p className='accountHolderDescription'>
                  ՀՀ, ք. Երևան Մոսկովյան 24
                </p>
              </div> */}
              <div className='propsInfo1'>
                <p className='accountHolderTitle'>{t("props-info.email")}:</p>
                <p className='accountHolderDescription'>
                  301landofwisdom@gmail.com
                </p>
              </div>
              <div className='propsInfo1'>
                <p className='accountHolderTitle'>
                  {t("props-info.executive-director")}
                </p>
                <p className='accountHolderDescription'>
                  {t("props-info.director-name")}
                </p>
              </div>
            </div>
          </div>
          <div className='props1Container'>
            <div className='props1'>
              <div className='valuta'>
                <img src={DRAM} alt='valuta' />
              </div>
              <p className='propsTitle'>1570072504400100 </p>
              <div className='propsInfoContainer'>
                {/* <div className='propsInfo1'>
                <p className='accountHolderTitle'>ՀՎՀՀ`</p>
                <p className='accountHolderDescription'>01309994</p>
              </div> */}
                <div className='propsInfo1'>
                  <p className='accountHolderTitle'>{t("props-info.tin")}</p>
                  <p className='accountHolderDescription'>01309994</p>
                </div>
                {/* <div className='propsInfo1'>
                <p className='accountHolderTitle'>«ԱՄԵՐԻԱԲԱՆԿ» ՓԲԸ</p>
                <p className='accountHolderDescription'>
                  ՀՀ, ք. Երևան Մոսկովյան 24
                </p>
              </div> */}
                <div className='propsInfo1'>
                  <p className='accountHolderTitle'>{t("props-info.bank")}:</p>
                  <p className='accountHolderDescription'>
                    {t("props-info.bank-title")}
                  </p>
                </div>
                {/* <div className='propsInfo1'>
                  <p className='accountHolderTitle'>Գործադիր տնօրեն՝</p>
                  <p className='accountHolderDescription'>Գայանե Մանուկյան</p>
                </div> */}
              </div>
            </div>
            <div className='props1'>
              <div className='valuta'>
                <img src={RUBLE} alt='valuta' />
              </div>
              <p className='propsTitle'>1570072504400158</p>
              <div className='propsInfoContainer'>
                <div className='propsInfo1'>
                  <p className='accountHolderTitle'>{t("props-info.bank")}:</p>
                  <p className='accountHolderDescription'>
                    {t("props-info.bank-title-ru")}
                  </p>
                </div>
                <div className='propsInfo1'>
                  <p className='accountHolderTitle'>
                    {t("props-info.indicating-payment-details")}
                  </p>
                  <p className='accountHolderDescription'>
                    {t("props-info.donation")}
                  </p>
                </div>
              </div>
            </div>
            <div className='props1'>
              <div className='valuta'>
                <img src={DOLLAR} alt='valuta' />
              </div>
              <p className='propsTitle'>1570072504400101</p>
              <div className='propsInfoContainer'>
                <div className='propsInfo1'>
                  <p className='accountHolderTitle'>
                    {t("props-info.bank-of-recipient")}
                  </p>
                  <p className='accountHolderDescription'>
                    {t("props-info.usd-bank")}
                  </p>
                </div>
                <div className='propsInfo1'>
                  <p className='accountHolderTitle'>
                    {t("props-info.recipient")}
                  </p>
                  <p className='accountHolderDescription'>
                    {t("props-info.details-en")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EcosystemModal>
    </Modal>
  );
};

export default Props;
