import styles from "./LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles["c-loading-spinner"]}>
      <div className={styles["c-loading-spinner__item"]}></div>
    </div>
  );
}
