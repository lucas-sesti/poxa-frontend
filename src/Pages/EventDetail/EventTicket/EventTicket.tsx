import styles from "./EventTicket.module.scss";
import { SelectedTickets, Ticket } from "models/ticket";
import { FiMinus, FiPlus } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Event } from "models/event";
import { setSelectedTickets as setSelectedTicketsStore } from "store/ticket/ticket.slice";
import { currencyFormatterWithoutPrefix } from "../../../utils/currency";

const CurrencyFormat = require("react-currency-format");

interface Props {
  ticket: Ticket;
  selectedTickets: SelectedTickets;
  event: Event;
}

function updateSelectedTicket(
  operation: "+" | "-",
  ticket: Ticket,
  selectedTickets: SelectedTickets,
  dispatch: React.Dispatch<any>,
  event: Event
) {
  dispatch(
    setSelectedTicketsStore({
      ticket: { ...ticket, event },
      operation,
    })
  );
}

export default function EventTicket({ ticket, selectedTickets, event }: Props) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (selectedTickets && selectedTickets.hasOwnProperty(ticket.id)) {
      setQuantity(selectedTickets[ticket.id].quantity);
    }
  }, [selectedTickets]);

  return (
    <div className={styles["c-event-ticket"]}>
      <div className={styles["c-event-ticket__wrapper"]}>
        <div className={styles["c-event-ticket__amount"]}>
          <p className={styles["c-event-ticket__amount-currency"]}>R$</p>
          <CurrencyFormat
            className={styles["c-event-ticket__amount-price"]}
            value={ticket.price}
            format={currencyFormatterWithoutPrefix}
            thousandSeparator="."
            decimalSeparator=","
            displayType={"text"}
            prefix={""}
          />
        </div>

        <div className={styles["c-event-ticket__information"]}>
          <h3 className={styles["c-event-ticket__information-title"]}>
            {ticket.title}
          </h3>
          <p className={styles["c-event-ticket__information-subtitle"]}>
            {ticket.subtitle}
          </p>
        </div>
      </div>

      <div className={styles["c-event-ticket__tickets"]}>
        <FiMinus
          className={styles["c-event-ticket__tickets-action"]}
          size={16}
          onClick={() => {
            updateSelectedTicket("-", ticket, selectedTickets, dispatch, event);
          }}
        />
        <p className={styles["c-event-ticket__tickets-value"]}>{quantity}</p>
        <FiPlus
          className={styles["c-event-ticket__tickets-action"]}
          size={16}
          onClick={() => {
            updateSelectedTicket("+", ticket, selectedTickets, dispatch, event);
          }}
        />
      </div>
    </div>
  );
}
