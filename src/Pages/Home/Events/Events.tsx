import styles from "./Events.module.scss";
import { FiSearch } from "react-icons/fi";
import { colorNeutralMedium } from "../../../styles/settings/styles";
import CollapsedEvent from "../../../Components/Events/CollapsedEvent/CollapsedEvent";
import { Event } from "models/event";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setActiveEvent, setEvents } from "../../../store/event/event.slice";
import { useDispatch } from "react-redux";
import Input from "../../../Components/Input/Input";
import { debounce } from "../../../utils/debounce/debounce.utils";
import { eventService } from "../../../services/event/event.service";
import _ from "lodash";

interface Props {
  events: Event[];
}

export default function Events({ events }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (
    <div className={styles["c-events"]}>
      <div className={styles["c-events__header"]}>
        <h2 className={styles["c-events__header-title"]}>Todos os eventos</h2>

        <div className={styles["c-events__header-search"]}>
          <Input
            label="Pesquisar"
            value={search}
            onChange={async (e) => {
              setSearch(e.target.value);

              // _.debounce(async () => {
              //   console.log("searching");
              // }, 2000);

              const events = await eventService.searchEvents(e.target.value);

              dispatch(setEvents(events));
            }}
          />

          <div className={styles["c-events__header-search-icon"]}>
            <FiSearch color={colorNeutralMedium} size={24} />
          </div>
        </div>
      </div>

      <div className={styles["c-events__wrapper"]}>
        <div className={styles["c-events__wrapper-events"]}>
          {events.map((event) => {
            return (
              <div
                className={styles["c-events__wrapper-events-item"]}
                key={event.id}
              >
                <div
                  onClick={() => {
                    dispatch(setActiveEvent(event));
                    navigate(`/evento/${event.id}`);
                  }}
                  className={styles["c-events__wrapper-events-item-link"]}
                >
                  <CollapsedEvent {...event} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
