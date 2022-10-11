import styles from "./EventQrcodes.module.scss";
import React from "react";
import { Qrcode } from "models/qrcode";
import { addPhoneMask } from "utils/masks/phone.mask";
import { FiDownload } from "react-icons/fi";
import { colorBrandPrimaryMedium } from "styles/settings/styles";
import { translateTicketType } from "utils/ticket/ticket.utils";
import Button from "Components/Button/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  qrcodes: Qrcode[];
  eventId: string;
}

export default function EventQrcodes({ qrcodes, eventId }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles["c-event-qrcodes"]}>
      {qrcodes && qrcodes.length > 0 && (
        <>
          <div className={styles["c-event-qrcodes__header"]}>
            <h2 className={styles["c-event-qrcodes__header-title"]}>
              Ingressos
            </h2>

            <div className={styles["c-event-qrcodes__header-action"]}>
              <Button
                text="Criar ingresso"
                onClick={() => {
                  navigate(`/admin/evento/${eventId}/qrcode`);
                }}
              />
            </div>
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
                <th>Baixar</th>
              </tr>
            </thead>
            <tbody>
              {qrcodes.map((qrcode) => {
                const downloadTitle = `Ingresso - ${qrcode.userName} - ${qrcode.ticket.event.title} (Criado por: ${qrcode.createdBy.full_name}`;
                const downloadUrl = `data:image/png;base64,${qrcode.finalMedia?.media}`;

                return (
                  <tr key={qrcode.id}>
                    <td>{qrcode.id}</td>
                    <td>{qrcode.status ? "Disponível" : "Utilizado"}</td>
                    <td>{translateTicketType(qrcode.ticket.type)}</td>
                    <td>{qrcode.userName}</td>
                    <td>{qrcode.createdBy?.full_name}</td>
                    <td>{addPhoneMask(qrcode.createdBy?.phone)}</td>
                    <td>
                      <a
                        className={styles["c-ticket__actions-download"]}
                        download={downloadTitle}
                        href={downloadUrl}
                        target="_blank"
                      >
                        <FiDownload color={colorBrandPrimaryMedium} />
                      </a>
                    </td>
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
