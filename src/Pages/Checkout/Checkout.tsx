import styles from "./Checkout.module.scss";
import CheckoutHeader from "./Header/Header";
import CheckoutPaymentOptions from "./PaymentOptions/PaymentOptions";
import { useEffect, useState } from "react";
import { PaymentMethod } from "models/payment";
import { CheckoutForm } from "models/components/form";
import PaymentCheckout from "./PaymentCheckout/PaymentCheckout";
import { useSelector } from "react-redux";
import { selectUser } from "store/user/user.slice";
import PixCheckout from "./PixCheckout/PixCheckout";
import { UserParams } from "models/user";
import { selectSelectedTickets } from "store/ticket/ticket.slice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const selectedTickets = useSelector(selectSelectedTickets) ?? {};

  const [form, setForm] = useState<CheckoutForm>({ users: [] });
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("creditCard");
  const [steps, setSteps] = useState<number[]>([0, 1, 2, 3]);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const values = Object.values(selectedTickets);

    if (values && values.length > 0) {
      const filteredTickets = values.filter((ticket) => ticket.quantity > 0);
      const ticketAmount = filteredTickets.reduce((acc, ticket) => {
        acc = acc + ticket.price * ticket.quantity;

        return acc;
      }, 0);

      setTotal(ticketAmount);

      const users: UserParams[] = [];

      for (let ticket of filteredTickets) {
        const quantity = ticket.quantity;

        for (let i = 0; i < quantity; i++) {
          users.push({
            cpf: "",
            full_name: "",
            ticket,
          });
        }
      }

      setForm({
        ...form,
        users,
      });

      console.log("Form set tickets", form);
      return;
    }

    navigate("/");
  }, [selectedTickets]);

  return (
    <div className={styles["c-checkout"]}>
      <CheckoutHeader />

      <CheckoutPaymentOptions
        paymentMethod={paymentMethod}
        onSetPaymentMethod={(paymentMethod) => {
          setPaymentMethod(paymentMethod);
          setActiveStep(0);
        }}
      />

      <div className={styles["c-checkout__stepper"]}>
        <div className={styles["c-checkout__stepper-line"]}></div>

        <div className={styles["c-checkout__stepper--steps"]}>
          {steps.map((step) => {
            return (
              <div
                key={step}
                className={
                  styles[
                    `c-checkout__stepper-theme--${
                      activeStep >= step ? "active" : "default"
                    }`
                  ]
                }
              >
                <div className={styles["c-checkout__stepper-step"]}>
                  <p className={styles["c-checkout__stepper-step-title"]}>
                    {step + 1}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form id="form-checkout">
        {paymentMethod === "creditCard" ? (
          <PaymentCheckout
            form={form}
            setForm={setForm}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            user={user}
            total={total}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedTickets={selectedTickets}
          />
        ) : (
          <PixCheckout
            form={form}
            setForm={setForm}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            user={user}
            total={total}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedTickets={selectedTickets}
          />
        )}
      </form>
    </div>
  );
}
