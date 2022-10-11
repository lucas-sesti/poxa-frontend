import styles from "./DetailsStep.module.scss";
import React, { useEffect } from "react";
import { CheckoutForm } from "models/components/form";
import { currencyFormatter } from "utils/currency";
import classNames from "classnames";
import { PaymentMethod } from "models/payment";

const CurrencyFormat = require("react-currency-format");

interface Props {
  form: CheckoutForm;
  total: number;
  paymentMethod: PaymentMethod;
}

export default function DetailsStep({ form, total, paymentMethod }: Props) {
  const creditCardFormKeys: Record<string, string> = {
    cardNumber: "Número do cartão",
    cardExpirationDate: "Data de expiração",
    cardHolderName: "Nome do titular",
    cardCVV: "Código de segurança",
    password: "Senha",
    users: "Qtd. de ingressos",
    cpf: "CPF",
    email: "E-mail",
    full_name: "Nome completo",
    phone: "Telefone",
  };

  const pixFormKeys: Record<string, string> = {
    password: "Senha",
    users: "Qtd. de ingressos",
    cpf: "CPF",
    email: "E-mail",
    full_name: "Nome completo",
    phone: "Telefone",
  };

  const userFormKeys: Record<string, string> = {
    cpf: "CPF",
    full_name: "Nome completo",
    ticket: "Ingresso",
  };

  const maskCardNumber = (cardNumber: string) => {
    const cardNumberLength = cardNumber.length;
    const cardNumberMask = cardNumber.slice(0, 4);
    const cardNumberMaskMiddle = "****";
    const cardNumberMaskEnd = cardNumber.slice(
      cardNumberLength - 4,
      cardNumberLength
    );
    return `${cardNumberMask}${cardNumberMaskMiddle}${cardNumberMaskEnd}`;
  };

  const formProperties = () => {
    let data: any = {
      users: form.users,
      cpf: form.cpf,
      email: form.email,
      full_name: form.full_name,
      phone: form.phone,
    };

    if (paymentMethod === "creditCard") {
      data["cardNumber"] = maskCardNumber(form.cardNumber!);
      data["cardExpirationDate"] = form.cardExpirationDate;
    }

    const formEntries: any = Object.entries(data);

    formEntries.sort(([a]: [any], [b]: [any]) => a.localeCompare(b));

    return formEntries;
  };

  const [formKeys, setFormKeys] = React.useState<Record<string, string>>();

  useEffect(() => {
    setFormKeys(
      paymentMethod === "creditCard" ? creditCardFormKeys : pixFormKeys
    );
  }, [paymentMethod]);

  return (
    <div className={styles["c-details-step"]}>
      <h1 className={styles["c-details-step__title"]}>Detalhes do pedido</h1>

      {formKeys && (
        <div className={styles["c-details-step__details"]}>
          {formProperties().map(([key, value]: [string, any]) => {
            return (
              <div className={styles["c-details-step__details-item"]} key={key}>
                <p className={styles["c-details-step__details-item-title"]}>
                  {formKeys[key]}
                </p>
                <p className={styles["c-details-step__details-item-value"]}>
                  {key === "users" ? value.length : value}
                </p>
              </div>
            );
          })}
          <div className={styles["c-details-step__details-item"]}>
            <p className={styles["c-details-step__details-item-title"]}>
              Total
            </p>
            <p className={styles["c-details-step__details-item-value"]}>
              <CurrencyFormat
                className={styles["c-details-step__details-item-value-price"]}
                value={total}
                format={currencyFormatter}
                thousandSeparator="."
                decimalSeparator=","
                displayType={"text"}
                prefix={""}
              />
            </p>
          </div>
        </div>
      )}

      <h2 className={styles["c-details-step__title"]}>
        Detalhes dos ingressos
      </h2>

      <div className={styles["c-details-step__details"]}>
        {form.users.map((user, index) => {
          const userToInteract = {
            cpf: user.cpf,
            full_name: user.full_name,
          };

          return (
            <div
              key={user.cpf || "" + index}
              className={styles["c-details-step__details-users"]}
            >
              <p className={styles["c-details-step__details-users-ticket"]}>
                {index + 1}º Ingresso: {user.ticket?.title}
              </p>

              {Object.entries(userToInteract).map(([key, value]) => {
                return (
                  <div
                    className={classNames(
                      styles["c-details-step__details-item"],
                      styles["c-details-step__details-item--users"]
                    )}
                    key={key}
                  >
                    <p className={styles["c-details-step__details-item-title"]}>
                      {userFormKeys[key]}
                    </p>
                    <p className={styles["c-details-step__details-item-value"]}>
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
