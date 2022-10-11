import { BaseService } from "services/base.service";
import { Qrcode } from "models/qrcode";
import { Ticket } from "../../models/ticket";

class TicketService extends BaseService<Ticket> {
  public endpoint = "ticket";

  constructor() {
    super("ticket");
  }

  public async findByEventId(eventId: string): Promise<Ticket[]> {
    return await this.get({ url: `${this.endpoint}/event/${eventId}` });
  }
}

export const ticketService = new TicketService();
