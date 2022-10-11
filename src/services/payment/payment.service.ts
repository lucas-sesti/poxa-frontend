import { Payment, PaymentParams } from "models/payment";
import { BaseService } from "services/base.service";

class PaymentService extends BaseService<Payment> {
  constructor() {
    super("payment");
  }

  public async getPaymentsByEvent(eventId: string): Promise<Payment[]> {
    return this.get({}, `event/${eventId}`);
  }

  public async createPayment(data: PaymentParams): Promise<Payment> {
    return this.create(data);
  }

  public async updatePayment(id: string, externalId: string) {
    return this.update({ id, externalId });
  }

  public async updatePaymentExternalId(id: string, externalId: string) {
    return this.request({
      method: "PATCH",
      url: `${this.endpoint}/${id}/externalId/${externalId}`,
    });
  }
}

export const paymentService = new PaymentService();
