import { PaymentParams } from "models/payment";
import { paymentService } from "services/payment/payment.service";

export async function createPayment(
  total: number,
  buyer: string,
  event: string
) {
  const paymentData: PaymentParams = {
    total,
    buyer,
    event,
  };

  return paymentService.createPayment(paymentData);
}

export async function updatePaymentExternalId(id: string, externalId: string) {
  return paymentService.updatePaymentExternalId(id, externalId);
}
