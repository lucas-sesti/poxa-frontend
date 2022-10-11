import { Event } from "models/event";
import { Qrcode } from "../qrcode";

export interface Ticket {
  id: string;
  status: boolean;
  title: string;
  subtitle: string;
  price: number;
  type: TicketType;
  qrcodes: Qrcode[];
  event: Event;
}

export enum TicketType {
  BOX,
  PREMIUM_BOX,
  TRACK,
}

export interface SelectedTickets {
  [key: string]: SelectedTicket;
}

export interface SelectedTicket extends Ticket {
  quantity: number;
}
