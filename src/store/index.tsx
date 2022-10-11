import { Action, configureStore, Reducer } from "@reduxjs/toolkit";
import ticketSlice from "./ticket/ticket.slice";
import eventSlice from "./event/event.slice";
import userSlice from "./user/user.slice";

export interface Store {
  tickets: Reducer<any, Action>;
}

export default configureStore({
  reducer: {
    tickets: ticketSlice,
    events: eventSlice,
    user: userSlice,
  },
});
