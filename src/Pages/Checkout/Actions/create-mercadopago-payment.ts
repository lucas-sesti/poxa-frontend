import { CheckoutForm } from "models/components/form";
import {
  MercadopagoPaymentParams,
  MercadopagoPaymentPixParams,
} from "models/payment";
import { cleanCpfMask } from "utils/cpf/cpf.utils";
import { mercadopagoService } from "services/mercadopago/mercadopago.service";

export async function createMercadoPagoPayment(
  form: CheckoutForm,
  paymentMethodId: string,
  total: number,
  selectedIssuer: string,
  externalId: string
) {
  const data: MercadopagoPaymentParams = {
    description: "Compra de ingressos",
    token: form.cardToken!,
    installments: Number(form.selectedInstallment!),
    payment_method_id: paymentMethodId!,
    transaction_amount: total / 100,
    payer: {
      email: form.email!,
      identification: {
        type: "CPF",
        number: cleanCpfMask(form.cpf!),
      },
    },
    issuer_id: selectedIssuer!,
    metadata: {
      externalId,
    },
  };

  return mercadopagoService.createPayment(data);
}

export async function createMercadopagoPix(
  form: CheckoutForm,
  total: number,
  externalId: string
) {
  console.log(form);
  const data: MercadopagoPaymentPixParams = {
    transaction_amount: total / 100,
    description: "Compra do ingresso",
    payment_method_id: "pix",
    payer: {
      email: form.email,
      identification: {
        type: "CPF",
        number: cleanCpfMask(form.cpf!),
      },
    },
    metadata: {
      externalId,
    },
  };

  return mercadopagoService.createPixPayment(data);
}
