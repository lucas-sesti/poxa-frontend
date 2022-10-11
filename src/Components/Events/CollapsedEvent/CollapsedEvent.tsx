import { Event } from "models/event";
import styles from "./CollapsedEvent.module.scss";
import eventBackground from "assets/event/event.png";
import { FiMapPin } from "react-icons/fi";
import { colorBrandPrimaryMedium } from "../../../styles/settings/styles";
import dayjs from "dayjs";

export default function CollapsedEvent(event: Event) {
  const fullDate = dayjs.unix(event.startDate).format("DD [de] MMMM [de] YYYY");

  return (
    <div className={styles["c-collapsed-event"]}>
      <img
        className={styles["c-collapsed-event__image"]}
        src={event.image || eventBackground}
        alt="Foto do evento"
      />

      <div className={styles["c-collapsed-event__wrapper"]}>
        <p className={styles["c-collapsed-event__wrapper-date"]}>{fullDate}</p>
        <h2 className={styles["c-collapsed-event__wrapper-title"]}>
          {event.title}
        </h2>
        <p className={styles["c-collapsed-event__wrapper-address"]}>
          <FiMapPin
            className={styles["c-collapsed-event__wrapper-address-icon"]}
            color={colorBrandPrimaryMedium}
          />
          {event.address}
        </p>
      </div>
    </div>
  );
}
