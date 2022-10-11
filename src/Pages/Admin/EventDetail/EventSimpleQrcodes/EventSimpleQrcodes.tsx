import styles from "./EventSimpleQrcodes.module.scss";
import React from "react";
import { Qrcode } from "models/qrcode";
import { addPhoneMask } from "utils/masks/phone.mask";
import { translateTicketType } from "utils/ticket/ticket.utils";
import Button from "Components/Button/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  qrcodes: Qrcode[];
  eventId: string;
}

export default function EventSimpleQrcodes({ qrcodes, eventId }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles["c-event-qrcodes"]}>
      {qrcodes && qrcodes.length > 0 && (
        <>
          <div className={styles["c-event-qrcodes__header"]}>
            <h2 className={styles["c-event-qrcodes__header-title"]}>
              Ingressos (simples, sem opção de baixar)
            </h2>
          </div>

          <table className={styles["c-event-qrcodes__table"]}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Criado por</th>
                <th>Telefone do criador</th>
              </tr>
            </thead>
            <tbody>
              {qrcodes.map((qrcode) => {
                return (
                  <tr key={qrcode.id}>
                    <td>{qrcode.id}</td>
                    <td>{qrcode.status ? "Disponível" : "Utilizado"}</td>
                    <td>{translateTicketType(qrcode.ticket.type)}</td>
                    <td>{qrcode.userName}</td>
                    <td>{qrcode.createdBy?.full_name}</td>
                    <td>{addPhoneMask(qrcode.createdBy?.phone)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
