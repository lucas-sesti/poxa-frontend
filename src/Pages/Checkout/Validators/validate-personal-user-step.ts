import { CheckoutForm } from "models/components/form";

export function validatePersonalUserStep(form: CheckoutForm) {
  const fields: string[] = ["full_name", "email", "phone", "cpf"];

  const mapFields = {
    full_name: "Nome",
    email: "Email",
    phone: "Telefone",
    cpf: "CPF",
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
