import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { SelectedTicket, SelectedTickets, Ticket } from "../../models/ticket";
import { showToast } from "../../utils/toaster/toaster.utils";

export interface TicketState {
  tickets: {
    selectedTickets: SelectedTickets;
  };
}

function checkIfTicketIsFromAnotherEvent(
  selectedTickets: SelectedTickets,
  ticket: Ticket
) {}

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    selectedTickets: {},
  },
  reducers: {
    setSelectedTickets(
      state,
      { payload }: { payload: { ticket: Ticket; operation: "+" | "-" } }
    ) {
      console.log("Iniciando", payload);
      // @ts-ignore
      fbq("track", "AddToCart");

      const selectedTickets: SelectedTickets = { ...state.selectedTickets };

      const selectedTicketsValue = Object.values(selectedTickets);

      for (const selectedTicket of selectedTicketsValue) {
        const eventId = selectedTicket.event.id;
        const addingEventId = payload.ticket.event.id;

        if (eventId !== addingEventId) {
          showToast(
            "Não pode adicionar ingressos de eventos diferentes.",
            "error"
          );
          return;
        }
      }

      if (!selectedTickets.hasOwnProperty(payload.ticket.id)) {
        selectedTickets[payload.ticket.id] = { ...payload.ticket, quantity: 0 };
      }

      const selectedTicket = { ...selectedTickets[payload.ticket.id] };
      const actualQuantity = selectedTicket.quantity ?? 0;

      if (actualQuantity !== 0 && payload.operation === "-") {
        selectedTicket.quantity = actualQuantity - 1;
      }

      if (actualQuantity < 99 && payload.operation === "+") {
        selectedTicket.quantity = actualQuantity + 1;
      }

      selectedTickets[payload.ticket.id] = selectedTicket;

      return {
        ...state,
        selectedTickets,
      };
    },
  },
});

export const { setSelectedTickets } = ticketSlice.actions;

export const selectSelectedTickets = (state: TicketState) => {
  return state.tickets.selectedTickets;
};

export default ticketSlice.reducer;
