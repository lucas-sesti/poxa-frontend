import Header from "./Header/Header";
import NextEvents from "./NextEvents/NextEvents";
import styles from "./Home.module.scss";
import Events from "./Events/Events";
import { useEffect, useState } from "react";
import { Event } from "models/event";
import { eventService } from "../../services/event/event.service";
import { getNextEvents } from "../../utils/events/get-next-events.utils";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, selectEvents } from "../../store/event/event.slice";
import { oauth } from "../../lib/OAuth";

export default function Home() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const [nextEvents, setNextEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    const events = await eventService.getEvents();
    dispatch(addEvent(events));
  };

  const onInit = async () => {
    if (!events || events?.length === 0) {
      await getEvents();
    }
  };

  useEffect(() => {
    onInit().then();
  }, []);

  useEffect(() => {
    if (events && events.length > 0) {
      const nextEvents = getNextEvents(events, 3);
      setNextEvents(nextEvents);
    }
  }, [events]);

  return (
    <div className={styles["c-home"]}>
      <Header />

      <div className={styles["c-home__wrapper"]}>
        <div className={styles["c-home__wrapper-next-events"]}>
          {nextEvents && nextEvents.length > 0 && (
            <NextEvents events={nextEvents} />
          )}
        </div>

        <div className={styles["c-home__wrapper-all-events"]}>
          {events && events.length > 0 && <Events events={events} />}
        </div>
      </div>
    </div>
  );
}
