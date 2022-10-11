import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { SelectedTickets } from "../../models/ticket";
import { Event } from "models/event";

export interface EventState {
  events: {
    events: Event[];
    nextEvents: Event[];
    activeEvent: Event;
  };
}

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    activeEvent: null,
  },
  reducers: {
    setActiveEvent(state, { payload }) {
      return {
        ...state,
        activeEvent: payload,
      };
    },
    // @ts-ignore
    addEvent(state, { payload }) {
      return {
        ...state,
        events: [...state.events, ...payload],
      };
    },
    setEvents(state, { payload }) {
      return {
        ...state,
        events: payload,
      };
    },
  },
});

export const { setActiveEvent, addEvent, setEvents } = eventSlice.actions;

export const selectActiveEvent = (state: EventState) => {
  return state.events.activeEvent;
};

export const selectEvents = (state: EventState) => {
  return state.events.events;
};

export default eventSlice.reducer;
