import { Event } from "models/event";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export function getNextEvents(events: Event[], maxLength: number) {
  const newEvents = [...events];

  newEvents.sort((a, b) => {
    return a.startDate - b.startDate;
  });

  return newEvents.slice(0, maxLength);
}
