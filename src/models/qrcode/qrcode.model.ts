import { User } from "models/user";
import { Ticket } from "models/ticket";

export enum QrcodeStatus {
  DISABLED,
  ENABLED,
}

export interface Qrcode {
  id: string;
  status: QrcodeStatus;
  media: string;
  value: string;
  userCpf: string;
  userName: string;
  createdBy: User;
  ticket: Ticket;
  finalMedia?: { media: string };
}
