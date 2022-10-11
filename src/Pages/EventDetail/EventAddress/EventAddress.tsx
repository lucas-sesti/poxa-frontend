import styles from "./EventAddress.module.scss";

interface Props {
  address: string;
}

export default function EventAddress({ address }: Props) {
  return (
    <div className={styles["c-event-address"]}>
      <h2 className={styles["c-event-address__title"]}>Localização</h2>
      <p className={styles["c-event-address__address"]}>{address}</p>

      <div className={styles["c-event-address__maps"]}>
        <iframe
          className={styles["c-event-address__maps-frame"]}
          src={`https://maps.google.com/maps?q=${encodeURI(
            address
          )}&z=5&output=embed`}
          width="600"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
