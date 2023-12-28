import { NavLink } from "react-router-dom";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

interface TermsProps {
  aboutUs: boolean;
}

const Terms: React.FC<TermsProps> = ({ aboutUs }) => {
  const lang = cookies.get("i18next");
  const { t } = useTranslation();

  return (
    <div className='signIn_another_privacy'>
      <p>
        {!aboutUs && (
          <>
            {t("privacy.1")}
            <br></br>
          </>
        )}
        <NavLink className='mentioned_txt' to={`/${lang}/termsOfService`}>
          {t("privacy.terms")}
        </NavLink>{" "}
        {t("privacy.and")}{" "}
        <NavLink className='mentioned_txt' to={`/${lang}/privacyPolicy`}>
          {t("privacy.privacy")}
        </NavLink>
      </p>
    </div>
  );
};

export default Terms;
