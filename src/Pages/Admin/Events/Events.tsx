import styles from "./Events.module.scss";
import ExpandedEvent from "../../../Components/Events/ExpandedEvent/ExpandedEvent";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  selectEvents,
  setActiveEvent,
  setEvents,
} from "../../../store/event/event.slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { eventService } from "../../../services/event/event.service";
import Button from "../../../Components/Button/Button";
import dayjs from "dayjs";

export default function Events() {
  const events = useSelector(selectEvents);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEvents([]));

    eventService
      .get({
        params: {
          showExpired: true,
        },
      })
      .then((events) => {
        dispatch(addEvent(events));
      });
  }, []);

  return (
    <div className={styles["c-events"]}>
      <div className={styles["c-events__header"]}>
        <h1 className={styles["c-events__header-title"]}>Eventos</h1>

        <div className={styles["c-events__header-action"]}>
          <Button
            text="Criar evento"
            onClick={() => {
              dispatch(setActiveEvent(null));
              navigate("/admin/evento/criar");
            }}
          />
        </div>
      </div>

      {events && events.length > 0 && (
        <div className={styles["c-events__items"]}>
          {events.map((event) => {
            const now = dayjs();
            const eventDate = dayjs.unix(event.endDate);

            const isExpired = eventDate.isBefore(now);

            return (
              <div
                onClick={() => {
                  navigate(`/admin/evento/${event.id}`);
                  dispatch(setActiveEvent(event));
                }}
                className={styles["c-events__items-item"]}
                key={event.id}
              >
                {isExpired && (
                  <>
                    <p>Evento já aconteceu</p>
                    <div
                      className={styles["c-events__items-item--cover"]}
                    ></div>
                  </>
                )}
                <ExpandedEvent {...event} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
