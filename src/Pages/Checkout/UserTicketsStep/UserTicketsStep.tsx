import Input from "Components/Input/Input";
import { CheckoutForm } from "../../../models/components/form";
import React from "react";
import styles from "./UserTicketsStep.module.scss";

interface Props {
  form: CheckoutForm;
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>;
}

export default function UserTicketsStep({ form, setForm }: Props) {
  const updateUser = (key: string, value: string, index: number) => {
    const users = [...form.users];

    const newUser = { ...users[index] };

    newUser[key] = value;

    users[index] = newUser;

    setForm({ ...form, users });
  };

  return (
    <div className={styles["c-user-tickets-step"]}>
      <h1 className={styles["c-user-tickets-step__title"]}>
        Informações sobre os ingressos
      </h1>

      {form && (
        <div className={styles["c-user-tickets-step__users"]}>
          {form.users && form.users.length > 0 && (
            <>
              {form.users.map((user, index: number) => (
                <div
                  className={styles["c-user-tickets-step__users-item"]}
                  key={index}
                >
                  <p
                    className={styles["c-user-tickets-step__users-item-title"]}
                  >
                    {index + 1}º Ingresso: {user.ticket?.title}
                  </p>

                  <Input
                    label="Nome completo"
                    value={user.full_name}
                    onChange={(e) => {
                      updateUser("full_name", e.target.value, index);
                    }}
                  />

                  <Input
                    mask="cpf"
                    placeholder="000.000.000-00"
                    label="CPF"
                    value={user.cpf}
                    onChange={(e) => {
                      updateUser("cpf", e.target.value, index);
                    }}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
