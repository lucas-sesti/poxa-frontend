import styles from "./PixCheckout.module.scss";
import StepFooter from "../StepFooter/StepFooter";
import React, { useState } from "react";
import UserTicketsStep from "../UserTicketsStep/UserTicketsStep";
import UserPaymentStep from "../UserPaymentStep/UserPaymentStep";
import DetailsStep from "../DetailsStep/DetailsStep";
import { PaymentMethodProps } from "../PaymentCheckout/PaymentCheckout";
import {
  createMercadoPagoPayment,
  createMercadopagoPix,
} from "../Actions/create-mercadopago-payment";
import { showToast } from "../../../utils/toaster/toaster.utils";
import { slackService } from "../../../services/slack/slack.service";
import { createUser } from "../Actions/create-user";
import { useDispatch } from "react-redux";
import {
  createPayment,
  updatePaymentExternalId,
} from "../Actions/create-payment";
import { paymentService } from "../../../services/payment/payment.service";
import toast from "react-hot-toast";
import { checkIfWasPaid } from "../Hooks/check-if-was-paid.hook";
import { useNavigate } from "react-router-dom";
import { createQrcode } from "../Hooks/create-qrcode.hook";
import PayPixStep from "../PayPixStep/PayPixStep";
import { MercadopagoPaymentResponse } from "../../../models/payment";

export default function PixCheckout({
  form,
  setForm,
  steps,
  setActiveStep,
  activeStep,
  user,
  total,
  isLoading,
  setIsLoading,
  selectedTickets,
}: PaymentMethodProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mercadopagoPixResponse, setMercadopagoPixResponse] =
    useState<MercadopagoPaymentResponse>();

  const renderStepChildren = () => {
    switch (activeStep) {
      case 0:
        return <UserTicketsStep form={form} setForm={setForm} />;
      case 1:
        return <UserPaymentStep user={user} form={form} setForm={setForm} />;
      case 2:
        return <DetailsStep form={form} total={total} paymentMethod="pix" />;
      case 3:
        return (
          <PayPixStep
            qrcode64={
              mercadopagoPixResponse?.response?.point_of_interaction
                ?.transaction_data?.qr_code_base64
            }
            qrcodeCode={
              mercadopagoPixResponse?.response?.point_of_interaction
                ?.transaction_data?.qr_code
            }
          />
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

    const toastLoading = showToast("Gerando pix...", "loading");

    try {
      const userData = user ? user : await createUser(form, dispatch);

      if (userData) {
        const payment = await createPayment(total, userData.id, eventId);

        if (payment) {
          const mercadopagoPix = await createMercadopagoPix(
            form,
            total,
            payment.id
          ).catch(async () => {
            await paymentService.deleteOne(payment.id);
          });

          if (mercadopagoPix && mercadopagoPix.response) {
            setMercadopagoPixResponse(mercadopagoPix);

            await updatePaymentExternalId(
              payment.id,
              mercadopagoPix.response.id.toString()
            );

            setActiveStep(activeStep + 1);

            toast.dismiss(toastLoading);

            checkIfWasPaid(
              mercadopagoPix.response.id.toString(),
              setIsLoading,
              navigate,
              () => {
                onAfterPaid(userData.id);
              },
              "pix",
              total
            );

            return;
          }
        }
      }
    } catch (err) {
      setIsLoading(false);

      toast.dismiss(toastLoading);
    }
  };

  return (
    <div className={styles["c-pix-checkout"]}>
      {renderStepChildren()}

      <StepFooter
        form={form}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        maxSteps={3}
        finish={onFinish}
        isLoading={isLoading}
        paymentMethod="pix"
      />
    </div>
  );
}
