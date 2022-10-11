import styles from "./EventPayment.module.scss";
import { Payment } from "../../../../models/payment";
import {
  currencyFormatter,
  currencyFormatterWithoutPrefix,
} from "../../../../utils/currency";
import React from "react";
import { addCpfMask } from "../../../../utils/masks/cpf.mask";

const CurrencyFormat = require("react-currency-format");

interface Props {
  payments: Payment[];
}

export default function EventPayments({ payments }: Props) {
  const getPaymentStatus = (value) => {
    value = value.toUpperCase();

    switch (value) {
      case "PENDING":
        return "Pendente";
      case "APPROVED":
        return "Pago";
      case "REJECTED":
        return "Rejeitado";
      case "CANCELLED":
        return "Cancelado";
      default:
        return value;
    }
  };

  const getPaymentMethod = (value: string) => {
    switch (value) {
      case "bank_transfer":
        return "Pix";
      case "credit_card":
        return "Cartão de crédito";
      default:
        return value;
    }
  };
  return (
    <div className={styles["c-event-payments"]}>
      {payments && payments.length > 0 && (
        <>
          <h2 className={styles["c-event-payments__title"]}>Pagamentos</h2>
          <p>
            GMV:
            <CurrencyFormat
              className={styles["c-event-footer__amount-total"]}
              value={payments
                .filter((payment) => payment.paymentStatus === "approved")
                .reduce((acc, payment) => {
                  return acc + payment.total;
                }, 0)}
              displayType={"text"}
              format={currencyFormatter}
              thousandSeparator="."
              decimalSeparator=","
              prefix={"R$ "}
            />
          </p>

          <table className={styles["c-event-payments__table"]}>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Externo</th>
                <th>Total</th>
                <th>Status</th>
                <th>Método de pagamento</th>
                <th>Email do comprador</th>
                <th>Nome do comprador</th>
                <th>CPF do comprador</th>
              </tr>
            </thead>
            <tbody>
              {payments.slice(0, 55).map((payment) => {
                return (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.externalId}</td>
                    <td>
                      <CurrencyFormat
                        className={styles["c-event-ticket__amount-price"]}
                        value={payment.total}
                        format={currencyFormatter}
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType={"text"}
                        prefix={""}
                      />
                    </td>
                    <td>{getPaymentStatus(payment.paymentStatus ?? "")}</td>
                    <td>{getPaymentMethod(payment.paymentMethod ?? "")}</td>
                    <td>{payment.buyer?.email}</td>
                    <td>{payment.buyer?.full_name}</td>
                    <td>{addCpfMask(payment.buyer?.cpf)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
