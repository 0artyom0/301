import { Navigate } from "react-router-dom";
import { RootState } from "../../store/configureStore";
import { useSelector } from "react-redux";
import cookies from "js-cookie";
interface Props {
  children: any;
}

const AuthenticatedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const lang = cookies.get("i18next");
  if (!isAuthenticated && !localStorage.getItem("token")) {
    return <Navigate to={`/${lang}/login`} />;
  }
  return children;
};

export default AuthenticatedRoute;
