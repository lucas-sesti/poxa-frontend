import styles from "./Header.module.scss";
import { FiChevronLeft } from "react-icons/fi";
import HeaderLogin from "Components/HeaderLogin/HeaderLogin";
import { colorNeutralDarkest } from "styles/settings/styles";
import { useNavigate } from "react-router-dom";

interface Props {
  image: string;
}

export default function Header({ image }: Props) {
  const navigate = useNavigate();

  return (
    <header
      className={styles["c-header"]}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        onClick={() => {
          navigate("/");
        }}
        className={styles["c-header__back"]}
      >
        <FiChevronLeft color={colorNeutralDarkest} size={27} />
      </div>
      <HeaderLogin />
    </header>
  );
}
