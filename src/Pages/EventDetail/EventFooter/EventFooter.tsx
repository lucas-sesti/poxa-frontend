import styles from "./EventFooter.module.scss";
import { currencyFormatter } from "../../../utils/currency";
import Button from "../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const CurrencyFormat = require("react-currency-format");

interface Props {
  total: number;
}

export default function EventFooter({ total }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles["c-event-footer"]}>
      <div className={styles["c-event-footer__amount"]}>
        <p className={styles["c-event-footer__amount-title"]}>Total</p>

        {total === 0 ? (
          <p className={styles["c-event-footer__amount-total"]}>R$ 0,00</p>
        ) : (
          <CurrencyFormat
            className={styles["c-event-footer__amount-total"]}
            value={total}
            displayType={"text"}
            format={currencyFormatter}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"R$ "}
          />
        )}
      </div>

      <div className={styles["c-event-footer__action"]}>
        <Button
          text="Comprar"
          onClick={() => {
            navigate("/checkout");
          }}
        />
      </div>
    </div>
  );
}
