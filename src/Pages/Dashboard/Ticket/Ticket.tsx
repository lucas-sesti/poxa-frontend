import { Qrcode } from "models/qrcode";
import ExpandedEvent from "Components/Events/ExpandedEvent/ExpandedEvent";
import styles from "./Ticket.module.scss";
import { User } from "models/user";
import Button from "../../../Components/Button/Button";
import eventBackground from "../../../assets/event/event.png";
import CalendarDate from "../../../Components/CalendarDate/CalendarDate";
import { FiInfo, FiMapPin } from "react-icons/fi";
import {
  colorBrandPrimaryMedium,
  colorNeutralMedium,
} from "styles/settings/styles";
import ReactTooltip from "react-tooltip";

interface Props {
  qrcode: Qrcode;
  user: User;
  onVisibleOnlyForMe?: (qrcode) => void;
}

export default function DashboardTicket({
  qrcode,
  user,
  onVisibleOnlyForMe,
}: Props) {
  const event = qrcode.ticket.event;
  const downloadUrl = `data:image/png;base64,${qrcode.finalMedia?.media}`;

  return (
    <div className={styles["c-ticket"]}>
      <div className={styles["c-ticket__qrcode"]}>
        <img
          className={styles["c-ticket__qrcode-image"]}
          src={qrcode.media}
          alt="Miniatura do ingresso"
        />
      </div>

      <div className={styles["c-expanded-event"]}>
        <img
          className={styles["c-expanded-event__image"]}
          src={event.image || eventBackground}
          alt="Imagem do evento"
        />

        <p className={styles["c-expanded-event__name"]}>{event.title}</p>

        <div className={styles["c-expanded-event__container"]}>
          <CalendarDate startDate={event.startDate} />

          <div className={styles["c-expanded-event__container-wrapper"]}>
            <h2 className={styles["c-expanded-event__container-wrapper-title"]}>
              {qrcode.userName}
            </h2>
            <p
              className={styles["c-expanded-event__container-wrapper-address"]}
            >
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

      <div className={styles["c-ticket__actions"]}>
        <a
          className={styles["c-ticket__actions-download"]}
          download={`Ingresso-${event.title}`}
          href={downloadUrl}
          target="_blank"
        >
          <Button text="Baixar ingresso" />
        </a>

        {qrcode.createdBy.cpf !== user.cpf && (
          <div className={styles["c-ticket__actions-visible-only-for-me"]}>
            <Button
              text="Deixar visível só para mim"
              onClick={() => onVisibleOnlyForMe(qrcode)}
            />

            <FiInfo
              data-tip="Este ingresso foi comprado por outra pessoa, ele ainda consegue ver seu ingresso. 
              Ao clicar no botão, somente você poderá vê-lo"
              className={styles["c-ticket__actions-visible-only-for-me-icon"]}
              size={20}
              color={colorNeutralMedium}
            />
          </div>
        )}
      </div>

      <ReactTooltip place="right" />
    </div>
  );
}
