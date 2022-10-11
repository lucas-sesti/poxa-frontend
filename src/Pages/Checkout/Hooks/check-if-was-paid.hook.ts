import { showToast } from "utils/toaster/toaster.utils";
import { mercadopagoService } from "services/mercadopago/mercadopago.service";
import React from "react";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { PaymentMethod } from "../../../models/payment";

export function checkIfWasPaid(
  mercadopagoPaymentId: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
  afterPaid: () => void,
  paymentMethod: PaymentMethod,
  total: number
) {
  let attempts = 0;
  let toastLoading;

  if (paymentMethod !== "pix") {
    toastLoading = showToast("Verificando pagamento...", "loading");
  }

  const interval = setInterval(async () => {
    const payment = await mercadopagoService.getOne(
      `payments/${mercadopagoPaymentId}`
    );

    if (payment) {
      if (payment.status === "approved") {
        clearInterval(interval);
        // @ts-ignore
        fbq("track", "Purchase", {
          value: total / 100,
          currency: "BRL",
        });
        showToast("Oba! Pagamento realizado com sucesso!", "success");
        setIsLoading(false);

        if (toastLoading) {
          toast.dismiss(toastLoading);
        }

        afterPaid();
        return;
      }

      if (payment.status === "rejected") {
        clearInterval(interval);
        showToast("Oops... Pagamento não foi aprovado!", "error");
        setIsLoading(false);
        toast.dismiss(toastLoading);
        showToast("Redirecionando para a página inicial...", "loading", 3000);
        navigate("/");

        return;
      }

      if (
        (payment.status === "pending" || payment.status === "in_process") &&
        attempts > 50
      ) {
        clearInterval(interval);

        const message =
          paymentMethod === "pix"
            ? "Não foi possível identificar seu pagamento. Entre em contato com o suporte"
            : "Oops... Pagamento não foi aprovado!";

        showToast(message, "error");
        setIsLoading(false);

        if (toastLoading) {
          toast.dismiss(toastLoading);
        }

        showToast("Redirecionando para a página inicial...", "loading", 3000);
        navigate("/");
        return;
      }

      attempts++;
    }
  }, 5000);
}
