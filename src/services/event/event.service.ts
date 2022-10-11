import { Event } from "models/event";
import { BaseService } from "services/base.service";

class EventService extends BaseService<Event> {
  constructor() {
    super("event");
  }

  public getEvents(): Promise<Event[]> {
    return this.get({ public: true });
  }

  public searchEvents(term: string): Promise<Event[]> {
    return this.get(
      {
        public: true,
        params: {
          term,
        },
      },
      `search`
    );
  }
}

export const eventService = new EventService();
