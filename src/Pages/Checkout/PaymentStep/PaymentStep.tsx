import Input from "Components/Input/Input";
import { CheckoutForm } from "models/components/form";
import React, { useRef, useState } from "react";
import styles from "./PaymentStep.module.scss";
import { Logger } from "sass";

interface Props {
  form: CheckoutForm;
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>;
  paymentMethodId: string;
  setPaymentMethodId: React.Dispatch<React.SetStateAction<string>>;
  selectedIssuer: string;
  setSelectedIssuer: React.Dispatch<React.SetStateAction<string>>;
  total: number;
}

export default function PaymentStep({
  form,
  setForm,
  setPaymentMethodId,
  setSelectedIssuer,
  total,
}: Props) {
  const [disabledFields, setDisabledFields] = useState<boolean>(false);

  const setInstallments = (status: any, response: any) => {
    console.log("Set installments", response);
    if (status === 200 && response?.length > 0) {
      setForm({ ...form, installments: response[0].payer_costs });

      setSelectedIssuer(response[0].issuer.id);
    }
  };

  const getInstallments = (paymentMethodId: string, amount: string) => {
    window.Mercadopago.getInstallments(
      {
        payment_method_id: paymentMethodId,
        amount: parseFloat(amount),
      },
      setInstallments
    );
  };

  const setPaymentMethod = (
    status: any,
    response: any,
    callback: (paymentMethodId: string) => void
  ) => {
    if (status == 200) {
      const paymentMethod = response[0];
      const paymentMethodId = paymentMethod.id;

      callback(paymentMethodId);

      setDisabledFields(false);

      getInstallments(paymentMethodId, (total / 100).toString());
    } else {
      console.error(`Payment method info error: ${response}`);
    }
  };

  const onChangeCardNumber = (cardNumber: string) => {
    // setDisabledFields(true);

    setForm({
      ...form,
      cardNumber,
    });
  };

  return (
    <div className={styles["c-payment-step"]}>
      <h1 className={styles["c-payment-step__title"]}>
        Informações sobre o cartão
      </h1>

      <Input
        label="Nome no cartão"
        value={form.cardHolderName ?? ""}
        onChange={(e) => {
          setForm({ ...form, cardHolderName: e.target.value });
        }}
        mercadoPagoData="cardHolderName"
      />

      <Input
        label="Número do cartão"
        value={form.cardNumber ?? ""}
        mercadoPagoData="cardNumber"
        onChange={(e) => {
          onChangeCardNumber(e.target.value);
        }}
        onBlur={(e) => {
          if (form.cardNumber && form.cardNumber.length >= 6) {
            setForm({ ...form, paymentMethodId: "oirola" });
            console.log("Getting bin");

            const bin = form.cardNumber.substring(0, 6);

            window.Mercadopago.getPaymentMethod(
              { bin },
              (status: number, response: any) => {
                setPaymentMethod(
                  status,
                  response,
                  (paymentMethodId: string) => {
                    setPaymentMethodId(paymentMethodId);
                  }
                );
              }
            );
          }
        }}
      />

      <Input
        label="Data de validade"
        placeholder="MM/YY"
        mask="expirationDate"
        value={form.cardExpirationDate ?? ""}
        onChange={(e) => {
          setForm({ ...form, cardExpirationDate: e.target.value });
        }}
        mercadoPagoData="cardExpirationMonth"
        disabled={disabledFields}
      />

      <Input
        label="Código de segurança"
        placeholder="CVV"
        value={form.cardCVV ?? ""}
        onChange={(e) => {
          setForm({ ...form, cardCVV: e.target.value });
        }}
        mercadoPagoData="securityCode"
        disabled={disabledFields}
      />

      <select
        onChange={(e) => {
          setForm({ ...form, selectedInstallment: e.target.value });
        }}
        disabled={disabledFields}
      >
        <option value="">Selecione a quantidade de parcelas</option>
        {form.installments &&
          form.installments.length > 0 &&
          form.installments.map((installment) => {
            return (
              <option
                key={installment.installments}
                value={installment.installments}
              >
                {installment.recommended_message}
              </option>
            );
          })}
      </select>
    </div>
  );
}
