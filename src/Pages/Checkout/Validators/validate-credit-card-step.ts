import { CheckoutForm } from "models/components/form";

export function validateCreditCardStep(form: CheckoutForm) {
  const fields = [
    "cardHolderName",
    "cardNumber",
    "cardExpirationDate",
    "cardCVV",
    "selectedInstallment",
  ];

  const mapFields = {
    cardNumber: "Número do cartão",
    cardExpirationDate: "Data de expiração",
    cardHolderName: "Nome no cartão",
    cardCVV: "Código de segurança (CVV)",
    selectedInstallment: "Parcelas",
  };

  const missingFields = [];

  for (const field of fields) {
    if (!form[field]) {
      if (!missingFields.includes(field)) {
        missingFields.push(field);
      }
    }
  }

  return missingFields.map((field) => mapFields[field]);
}
