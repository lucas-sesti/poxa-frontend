import styles from "./EventDate.module.scss";
import CalendarDate from "../../../Components/CalendarDate/CalendarDate";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toTitleCase } from "../../../utils/text/text.utils";

interface Props {
  startDate: number;
  endDate: number;
}

export default function EventDate({ startDate, endDate }: Props) {
  const startDateUtc = dayjs.unix(startDate);
  const endDateUtc = dayjs.unix(endDate);

  const weekday = startDateUtc.format("dddd");
  const startHour = startDateUtc.format("HH:mm");
  const endHour = endDateUtc.format("HH:mm");

  return (
    <div className={styles["c-event-date"]}>
      <CalendarDate startDate={startDate} />

      <div className={styles["c-event-date__information"]}>
        <p className={styles["c-event-date__information-weekday"]}>
          {toTitleCase(weekday)}
        </p>
        <p className={styles["c-event-date__information-hour"]}>
          {startHour} - {endHour}
        </p>
      </div>
    </div>
  );
}
