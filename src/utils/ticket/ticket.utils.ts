import { TicketType } from "models/ticket";

export function translateTicketType(value: string | TicketType): string {
  switch (value) {
    case 0:
      return "Pista";
    case 1:
      return "Pista Premium";
    case 2:
      return "Camarote";
    case 3:
      return "Dois pistas"
    default:
      return "Desconhecido";
  }
}
