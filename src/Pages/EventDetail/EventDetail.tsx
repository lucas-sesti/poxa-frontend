import styles from "./EventDetail.module.scss";
import Header from "./Header/Header";
import EventDate from "./EventDate/EventDate";
import EventTickets from "./EventTickets/EventTickets";
import { SelectedTickets, Ticket } from "models/ticket";
import EventAddress from "./EventAddress/EventAddress";
import EventFooter from "./EventFooter/EventFooter";
import { useEffect, useState } from "react";
import { selectSelectedTickets } from "store/ticket/ticket.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveEvent, setActiveEvent } from "store/event/event.slice";
import { eventService } from "services/event/event.service";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { showToast } from "../../utils/toaster/toaster.utils";

function calculateTotal(selectedTickets: SelectedTickets): number {
  return Object.values(selectedTickets).reduce((acc, ticket) => {
    return acc + ticket.quantity * ticket.price;
  }, 0);
}

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const event = useSelector(selectActiveEvent);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const selectedTickets = useSelector(selectSelectedTickets) ?? {};
  const [totalTicket, setTotalTicket] = useState<number>(0);

  const onGetEvent = async () => {
    const event = await eventService.getOne(eventId, { public: true });
    dispatch(setActiveEvent(event));
  };

  const onInit = async () => {
    if (eventId && !event) {
      await onGetEvent();
    }
  };

  useEffect(() => {
    onInit().then();
  }, []);

  useEffect(() => {
    if (event) {
      const now = dayjs();
      const eventDate = dayjs.unix(event.endDate);

      const isExpired = eventDate.isBefore(now);

      if (isExpired) {
        showToast(
          "Este evento já aconteceu, redirecionando para a página principal...",
          "loading"
        );
        navigate("/");
        return;
      }

      if (event.tickets && event.tickets.length > 0) {
        const newTickets = [...event.tickets];

        newTickets.sort((a, b) => a.price - b.price);
        setTickets(newTickets);
      }
    }
  }, [event]);

  useEffect(() => {
    const total = calculateTotal(selectedTickets);
    setTotalTicket(total);
  }, [selectedTickets]);

  return (
    event && (
      <div className={styles["c-event-detail"]}>
        <Header image={event.image} />

        <div className={styles["c-event-detail__wrapper"]}>
          <h1 className={styles["c-event-detail__wrapper-title"]}>
            {event.title}
          </h1>

          <div className={styles["c-event-detail__wrapper-date"]}>
            <EventDate startDate={event.startDate} endDate={event.endDate} />
          </div>

          {tickets && tickets.length > 0 && (
            <EventTickets
              tickets={tickets}
              selectedTickets={selectedTickets}
              event={event}
            />
          )}

          <div className={styles["c-event-detail__wrapper-information"]}>
            <h2 className={styles["c-event-detail__wrapper-information-title"]}>
              Informações
            </h2>

            <div
              className={
                styles["c-event-detail__wrapper-information-description"]
              }
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></div>
          </div>

          <div className={styles["c-event-detail__wrapper-address"]}>
            <EventAddress address={event.address} />
          </div>
        </div>

        <div className={styles["c-event-detail__footer"]}>
          <EventFooter total={totalTicket} />
        </div>
      </div>
    )
  );
}
