import { UserParams } from "models/user";
import { CheckoutForm } from "models/components/form";

export function validateUserTicketStep(form: CheckoutForm) {
  const fields: string[] = ["full_name", "cpf"];

  const mapFields = {
    full_name: "Nome",
    cpf: "CPF",
  };

  const missingFields: string[] = [];

  for (let i = 0; i < form.users.length; i++) {
    const user: UserParams = form.users[i];

    for (const field of fields) {
      if (!user[field]) {
        if (!missingFields.includes(field)) {
          missingFields.push(field);
        }
      }
    }
  }

  return missingFields.map((field) => mapFields[field]);
}
