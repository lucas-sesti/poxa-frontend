import styles from "./CalendarDate.module.scss";
import dayjs from "dayjs";

interface Props {
  startDate: number;
}

export default function CalendarDate({ startDate }: Props) {
  const month = dayjs.unix(startDate).format("MMM");
  const day = dayjs.unix(startDate).format("DD");

  return (
    <div className={styles["c-calendar-date"]}>
      <p className={styles["c-calendar-date__month"]}>{month?.toUpperCase()}</p>
      <p className={styles["c-calendar-date__day"]}>{day}</p>
    </div>
  );
}
