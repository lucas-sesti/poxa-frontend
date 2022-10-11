import { Event } from "../event";

export interface Payment {
  id: string;
  externalId: string;
  paymentStatus: string;
  paymentMethod: string;
  buyer: any;
  event: Event;
  total: number;
}

export type PaymentMethod = "pix" | "creditCard";
