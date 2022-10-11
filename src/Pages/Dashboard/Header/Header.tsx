import styles from "./Header.module.scss";
import { FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { colorBrandPrimaryMedium } from "../../../styles/settings/styles";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles["c-header"]}>
      <Link to="/" className={styles["c-header__item"]}>
        <FiHome size={27} color={colorBrandPrimaryMedium} />
        <p>Início</p>
      </Link>

      <Link to="/logout" className={styles["c-header__item"]}>
        <FiLogOut size={27} color={colorBrandPrimaryMedium} />
        <p>Sair</p>
      </Link>
    </div>
  );
}
