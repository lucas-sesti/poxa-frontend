import styles from "./Button.module.scss";

interface Props {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

export default function Button({ text, onClick, type = "button" }: Props) {
  return (
    <button type={type} className={styles["c-button"]} onClick={onClick}>
      {text}
    </button>
  );
}
