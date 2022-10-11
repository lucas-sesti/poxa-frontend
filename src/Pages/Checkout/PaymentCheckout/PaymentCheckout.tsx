import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSelectedTickets } from "../../../store/ticket/ticket.slice";
import { selectUser } from "../../../store/user/user.slice";
import React, { useEffect, useState } from "react";
import { CheckoutForm } from "../../../models/components/form";
import { PaymentMethod } from "../../../models/payment";
import UserTicketsStep from "../UserTicketsStep/UserTicketsStep";
import PaymentStep from "../PaymentStep/PaymentStep";
import UserPaymentStep from "../UserPaymentStep/UserPaymentStep";
import DetailsStep from "../DetailsStep/DetailsStep";
import { createQrcode } from "../Hooks/create-qrcode.hook";
import { showToast } from "../../../utils/toaster/toaster.utils";
import { slackService } from "../../../services/slack/slack.service";
import { createUser } from "../Actions/create-user";
import {
  createPayment,
  updatePaymentExternalId,
} from "../Actions/create-payment";
import { createMercadoPagoPayment } from "../Actions/create-mercadopago-payment";
import { paymentService } from "../../../services/payment/payment.service";
import toast from "react-hot-toast";
import { checkIfWasPaid } from "../Hooks/check-if-was-paid.hook";
import { User, UserParams } from "../../../models/user";
import { cleanCpfMask } from "../../../utils/cpf/cpf.utils";
import StepFooter from "../StepFooter/StepFooter";
import styles from "./PaymentCheckout.module.scss";
import { SelectedTickets } from "../../../models/ticket";

export interface PaymentMethodProps {
  activeStep: number;
  form: CheckoutForm;
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: number[];
  user: User;
  total: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTickets: SelectedTickets;
}

export default function PaymentCheckout({
  form,
  steps,
  activeStep,
  setForm,
  setActiveStep,
  user,
  total,
  isLoading,
  setIsLoading,
  selectedTickets,
}: PaymentMethodProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethodId, setPaymentMethodId] = useState<string>("");
  const [selectedIssuer, setSelectedIssuer] = useState<string>("");

  const renderStepChildren = () => {
    switch (activeStep) {
      case 0:
        return <UserTicketsStep form={form} setForm={setForm} />;
      case 1:
        return (
          <PaymentStep
            form={form}
            setForm={setForm}
            paymentMethodId={paymentMethodId}
            setPaymentMethodId={setPaymentMethodId}
            selectedIssuer={selectedIssuer}
            setSelectedIssuer={setSelectedIssuer}
            total={total}
          />
        );
      case 2:
        return <UserPaymentStep user={user} form={form} setForm={setForm} />;
      case 3:
        return (
          <DetailsStep form={form} total={total} paymentMethod="creditCard" />
        );
      default:
        return <div>Etapa não encontrada</div>;
    }
  };

  const onAfterPaid = async (userId: string) => {
    await createQrcode(form.users, userId, navigate);
  };

  const onFinish = async () => {
    setIsLoading(true);

    const event = Object.values(selectedTickets)[0]?.event;
    const eventId = event.id;

    if (!eventId) {
      showToast(
        "Oops.. ocorreu um erro, tente atualizar a página e adicionar os ingressos novamente!",
        "error"
      );

      setIsLoading(false);
      return;
    }

    const message = {
      text: `-------- Iniciando compra ${form.full_name} --------\n
      Dados: ${JSON.stringify(form)}\n
      `,
    };

    await slackService.sendMessage(message);

    const toastLoading = showToast("Efetuando pagamento...", "loading");

    try {
      const userData = user ? user : await createUser(form, dispatch);

      if (userData) {
        const payment = await createPayment(total, userData.id, eventId);

        if (payment) {
          const mercadopagoPayment = await createMercadoPagoPayment(
            form,
            paymentMethodId,
            total,
            selectedIssuer,
            payment.id
          ).catch(async (err) => {
            await paymentService.deleteOne(payment.id);
          });

          if (mercadopagoPayment && mercadopagoPayment.body) {
            await updatePaymentExternalId(
              payment.id,
              mercadopagoPayment.response.id.toString()
            );

            toast.dismiss(toastLoading);

            checkIfWasPaid(
              mercadopagoPayment.body.id.toString(),
              setIsLoading,
              navigate,
              () => {
                onAfterPaid(userData.id);
              },
              "creditCard",
              total
            );
          }
        }
      }
    } catch (error) {
      setIsLoading(false);

      toast.dismiss(toastLoading);
    }
  };

  const onSetCardToken = (status: number, response: any) => {
    console.log("Set card token", status, response, response.id);

    if (status === 200) {
      setForm({ ...form, cardToken: response.id });
    } else {
      showToast(
        "Oops... Erro ao validar o método de pagamento, por favor recarregue a página e tente novamente",
        "error"
      );
    }
  };

  const splitExpirationDate = (date: string) => {
    const splitDate = date.split("/");

    return {
      month: splitDate[0],
      year: splitDate[1],
    };
  };

  useEffect(() => {
    if (activeStep === 3) {
      if (!!form.cardExpirationDate && !!form.cpf) {
        const splitDate = splitExpirationDate(form.cardExpirationDate);

        window.Mercadopago.createToken(
          {
            cardholderName: form.cardHolderName,
            cardExpirationMonth: splitDate.month,
            cardExpirationYear: splitDate.year,
            cardNumber: form.cardNumber,
            securityCode: form.cardCVV,
            docType: "CPF",
            docNumber: cleanCpfMask(form.cpf),
          },
          onSetCardToken
        );
      }
    }
  }, [activeStep]);

  return (
    <div>
      {renderStepChildren()}

      <StepFooter
        form={form}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        maxSteps={steps.length}
        finish={onFinish}
        isLoading={isLoading}
        paymentMethod="creditCard"
      />
      <input
        type="hidden"
        value={form.cardToken ?? ""}
        onChange={(e) => {}}
        name="cardToken"
      />
    </div>
  );
}
