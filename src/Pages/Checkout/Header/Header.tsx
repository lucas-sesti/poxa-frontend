import styles from "./Header.module.scss";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CheckoutHeader() {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles["c-header"]} onClick={onBack}>
      <FiChevronLeft size={27} className={styles["c-header__icon"]} />

      <p className={styles["c-header__title"]}>Voltar</p>
    </div>
  );
}
