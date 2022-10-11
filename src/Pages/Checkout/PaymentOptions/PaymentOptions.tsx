import styles from "./PaymentOptions.module.scss";
import creditCard from "assets/cartao-de-credito.png";
import pix from "assets/pix.png";
import { PaymentMethod } from "models/payment";
import classNames from "classnames";
import React from "react";

interface Props {
  paymentMethod: PaymentMethod | undefined;
  onSetPaymentMethod: (paymentMethod: PaymentMethod) => void;
}

export default function CheckoutPaymentOptions({
  paymentMethod,
  onSetPaymentMethod,
}: Props) {
  const onSelectPaymentMethod = (type: PaymentMethod) => {
    onSetPaymentMethod(type);
  };

  return (
    <div className={styles["c-payment-options"]}>
      <p className={styles["c-payment-options__caption"]}>
        Selecione uma forma de pagamento:
      </p>
      <div className={styles["c-payment-options__items"]}>
        <div
          onClick={() => onSelectPaymentMethod("creditCard")}
          className={classNames(styles["c-payment-options__item"], {
            [styles["c-payment-options__item--selected"]]:
              paymentMethod === "creditCard",
          })}
        >
          <img
            className={classNames(
              styles["c-payment-options__item-image"],
              styles["c-payment-options__item-image--credit-card"]
            )}
            src={creditCard}
            alt="Cartão de crédito"
          />
          <p className={styles["c-payment-options__item-title"]}>
            Cartão de crédito
          </p>
        </div>
        <div
          onClick={() => onSelectPaymentMethod("pix")}
          className={classNames(styles["c-payment-options__item"], {
            [styles["c-payment-options__item--selected"]]:
              paymentMethod === "pix",
          })}
        >
          <img
            className={classNames(
              styles["c-payment-options__item-image"],
              styles["c-payment-options__item-image--pix"]
            )}
            src={pix}
            alt="Pix"
          />
          <p className={styles["c-payment-options__item-title"]}>Pix</p>
        </div>
      </div>
    </div>
  );
}
