import styles from "./EventTickets.module.scss";
import EventTicket from "../EventTicket/EventTicket";
import { SelectedTickets, Ticket } from "../../../models/ticket";
import React from "react";
import { Event } from "models/event";

interface Props {
  tickets: Ticket[];
  selectedTickets: SelectedTickets;
  event: Event;
}

export default function EventTickets({
  tickets,
  selectedTickets,
  event,
}: Props) {
  return (
    <div className={styles["c-event-tickets"]}>
      <h2 className={styles["c-event-tickets__title"]}>Ingressos</h2>

      <div className={styles["c-event-tickets__items"]}>
        {tickets
          .filter((ticket) => ticket.status)
          .map((ticket) => {
            return (
              <div className={styles["c-event-tickets__item"]} key={ticket.id}>
                <EventTicket
                  ticket={ticket}
                  selectedTickets={selectedTickets}
                  event={event}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
