import { environment } from "environment/environment";
import axios from "axios";

export class SlackService {
  private controller = "slack";

  async sendMessage(data) {
    return (
      await axios.post(`${environment.baseUrl}/${this.controller}/`, data, {
        public: true,
      })
    ).data;
  }
}

export const slackService = new SlackService();
