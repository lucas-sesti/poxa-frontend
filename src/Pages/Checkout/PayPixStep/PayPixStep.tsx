import styles from "./PayPixStep.module.scss";

interface Props {
  qrcode64: string;
  qrcodeCode: string;
}

export default function PayPixStep({ qrcode64, qrcodeCode }: Props) {
  return (
    <div className={styles["c-pay-pix"]}>
      <h2 className={styles["c-pay-pix__title"]}>
        *Não feche a página*, após o pagamento o site irá gerar automaticamente
        seu ingresso. Qualquer problema, clique no botão do WhatsApp para tirar
        dúvida.
      </h2>

      <img
        className={styles["c-pay-pix__image"]}
        src={`data:image/png;base64,${qrcode64}`}
        alt="Qrcode de pagamento PIX"
      />

      <p className={styles["c-pay-pix__code"]}>{qrcodeCode}</p>
    </div>
  );
}
