import styles from "./UserPaymentStep.module.scss";
import Input from "Components/Input/Input";
import React, { useEffect, useState } from "react";
import { CheckoutForm } from "models/components/form";
import { User } from "models/user";
import { oauth } from "../../../lib/OAuth";

interface Props {
  form: CheckoutForm;
  user: User;
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>;
}

export default function UserPaymentStep({ form, setForm, user }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const onInit = async () => {
    setIsAuthenticated(await oauth.isAuthenticated());

    if (user) {
      setForm({
        ...form,
        full_name: user.full_name,
        cpf: user.cpf,
        phone: user.phone,
        email: user.email,
      });
    }
  };

  useEffect(() => {
    onInit().then();
  }, []);

  const setUserForm = (key: string, value: string) => {
    const newForm: any = { ...form };

    newForm[key] = value;

    setForm(newForm);
  };

  return (
    <div className={styles["c-user-payment-step"]}>
      <h1 className={styles["c-user-payment-step__title"]}>
        Informações pessoais do pagamento
      </h1>

      <Input
        label="Nome completo"
        value={form.full_name || ""}
        onChange={(e) => {
          setUserForm("full_name", e.target.value);
        }}
      />

      <Input
        mask="cpf"
        placeholder="000.000.000-00"
        label="CPF"
        value={form.cpf ?? ""}
        onChange={(e) => {
          setUserForm("cpf", e.target.value);
        }}
      />

      <Input
        type="email"
        label="Email"
        value={form.email ?? ""}
        onChange={(e) => {
          setUserForm("email", e.target.value);
        }}
      />

      <Input
        mask="phone"
        label="Telefone"
        placeholder="(00) 00000-0000"
        value={form.phone ?? ""}
        onChange={(e) => {
          setUserForm("phone", e.target.value);
        }}
      />

      {!isAuthenticated && (
        <Input
          type="password"
          label="Senha"
          value={form.password ?? ""}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
      )}
    </div>
  );
}
