import { BaseService } from "services/base.service";
import {
  MercadopagoPayment,
  MercadopagoPaymentParams,
  MercadopagoPaymentPixParams,
  MercadopagoPaymentResponse,
} from "models/payment";

class MercadopagoService extends BaseService<MercadopagoPayment> {
  constructor() {
    super("mercadopago");
  }

  public async createPayment(data: MercadopagoPaymentParams) {
    return this.create(data);
  }

  public async createPixPayment(
    data: MercadopagoPaymentPixParams
  ): Promise<MercadopagoPaymentResponse> {
    return this.request({
      method: "POST",
      url: `${this.endpoint}/pix`,
      data,
      public: true,
    });
  }
}

export const mercadopagoService = new MercadopagoService();
