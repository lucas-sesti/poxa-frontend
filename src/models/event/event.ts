import { Ticket } from "../ticket";

export interface Event {
  id: string;
  image: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  address: string;
  tickets: Ticket[];
}
