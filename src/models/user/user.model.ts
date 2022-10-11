import { Payment } from "../payment";
import { SelectedTicket, Ticket } from "../ticket";
import { Qrcode } from "../qrcode";

export interface User {
  id: string;
  cpf: string;
  email: string;
  full_name: string;
  phone: string;
  role: string;
  payments: Payment[];
  qrcodes: Qrcode[];
}

export interface UserParams {
  cpf?: string;
  email?: string;
  full_name?: string;
  phone?: string;
  ticket?: SelectedTicket;
  password?: string;
}
