import styles from "./HeaderLogin.module.scss";
import { FiUser } from "react-icons/fi";
import { colorBrandPrimaryMedium } from "../../styles/settings/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.slice";

export default function HeaderLogin() {
  const user = useSelector(selectUser);

  return (
    <Link to="/login" className={styles["c-header-login"]}>
      {user ? (
        <span>{user.full_name.substring(0, 1)}</span>
      ) : (
        <FiUser size={27} color={colorBrandPrimaryMedium} />
      )}
    </Link>
  );
}
