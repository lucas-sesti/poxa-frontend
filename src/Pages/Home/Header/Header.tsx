import styles from "./Header.module.scss";
import { FiUser } from "react-icons/fi";
import { colorBrandPrimaryMedium } from "../../../styles/settings/styles";
import HeaderLogin from "../../../Components/HeaderLogin/HeaderLogin";

export default function Header() {
  return (
    <header className={styles["c-header"]}>
      <HeaderLogin />
    </header>
  );
}
