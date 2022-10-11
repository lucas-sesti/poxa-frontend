import ExpandedEvent from "../../../Components/Events/ExpandedEvent/ExpandedEvent";
import styles from "./NextEvents.module.scss";
import { Event } from "models/event";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveEvent } from "../../../store/event/event.slice";

interface Props {
  events: Event[];
}

export default function NextEvents({ events }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles["c-next-events"]}>
      {events.map((event) => {
        return (
          <div
            onClick={() => {
              dispatch(setActiveEvent(event));
              navigate(`/evento/${event.id}`);
            }}
            key={event.id}
            className={styles["c-next-events__item"]}
          >
            <ExpandedEvent {...event} />
          </div>
        );
      })}
    </div>
  );
}
