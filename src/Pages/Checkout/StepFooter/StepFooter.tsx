import Button from "Components/Button/Button";
import React from "react";
import styles from "./StepFooter.module.scss";
import { CheckoutForm } from "models/components/form";
import { showToast } from "utils/toaster/toaster.utils";
import { validateUserTicketStep } from "../Validators/validate-user-ticket-step";
import { validateCreditCardStep } from "../Validators/validate-credit-card-step";
import { validatePersonalUserStep } from "../Validators/validate-personal-user-step";
import { PaymentMethod } from "models/payment";

interface Props {
  form: CheckoutForm;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
  maxSteps: number;
  finish: () => void;
  isLoading: boolean;
  paymentMethod: PaymentMethod;
}

export default function StepFooter({
  form,
  setActiveStep,
  activeStep,
  maxSteps,
  finish,
  isLoading,
  paymentMethod,
}: Props) {
  const showMissingFieldsError = (missingFields: string[]) => {
    const missingFieldsString = missingFields.join(", ");

    showToast(`Preencha os campos: ${missingFieldsString}`, "error");
  };

  return (
    <div className={styles["c-step-footer"]}>
      <div>
        {activeStep > 0 && (
          <p
            className={styles["c-step-footer__back"]}
            onClick={() => {
              if (activeStep > 0) {
                setActiveStep(activeStep - 1);
              }
            }}
          >
            Voltar
          </p>
        )}
      </div>

      <div className={styles["c-step-footer__next"]}>
        <Button
          text={activeStep === maxSteps - 1 ? "Comprar" : "Próximo"}
          onClick={() => {
            if (isLoading) {
              return;
            }

            let missingFields: string[] = [];

            if (paymentMethod === "creditCard") {
              switch (activeStep) {
                case 0:
                  missingFields = validateUserTicketStep(form);
                  break;
                case 1:
                  missingFields = validateCreditCardStep(form);
                  break;
                case 2:
                  missingFields = validatePersonalUserStep(form);
                  break;
              }
            } else if (paymentMethod === "pix") {
              switch (activeStep) {
                case 0:
                  missingFields = validateUserTicketStep(form);
                  break;
                case 1:
                  missingFields = validatePersonalUserStep(form);
                  break;
              }
            }

            if (missingFields.length > 0) {
              showMissingFieldsError(missingFields);
              return;
            }

            const nextStep = activeStep + 1;

            if (nextStep === maxSteps) {
              finish();
              return;
            }

            setActiveStep(nextStep);
          }}
        />
      </div>
    </div>
  );
}
