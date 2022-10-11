import eventBackground from "assets/event/event.png";
import styles from "./ExpandedEvent.module.scss";
import { FiMapPin } from "react-icons/fi";
import { colorBrandPrimaryMedium } from "../../../styles/settings/styles";
import { Event } from "models/event";
import CalendarDate from "../../CalendarDate/CalendarDate";

export default function ExpandedEvent(event: Event) {
  return (
    <div className={styles["c-expanded-event"]}>
      <img
        className={styles["c-expanded-event__image"]}
        src={event.image || eventBackground}
        alt="Imagem do evento"
      />

      <div className={styles["c-expanded-event__container"]}>
        <CalendarDate startDate={event.startDate} />

        <div className={styles["c-expanded-event__container-wrapper"]}>
          <h2 className={styles["c-expanded-event__container-wrapper-title"]}>
            {event.title}
          </h2>
          <p className={styles["c-expanded-event__container-wrapper-address"]}>
            <FiMapPin
              className={
                styles["c-expanded-event__container-wrapper-address-icon"]
              }
              size={14}
              color={colorBrandPrimaryMedium}
            />{" "}
            {event.address}
          </p>
        </div>
      </div>
    </div>
  );
}
