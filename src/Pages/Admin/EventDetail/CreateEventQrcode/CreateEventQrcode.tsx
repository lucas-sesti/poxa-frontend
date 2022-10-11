import styles from "./CreateEventQrcode.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import Input from "Components/Input/Input";
import React, { useEffect, useState } from "react";
import { userService } from "services/user/user.service";
import { QrcodeParams } from "models/qrcode";
import { User } from "models/user";
import { Ticket } from "models/ticket";
import { ticketService } from "services/ticket/ticket.service";
import Button from "Components/Button/Button";
import { showToast } from "utils/toaster/toaster.utils";
import { selectUser } from "store/user/user.slice";
import { useSelector } from "react-redux";
import { qrcodeService } from "../../../../services/qrcode/qrcode.service";
import { cleanCpfMask } from "../../../../utils/cpf/cpf.utils";

export default function CreateEventQrcode() {
  const { eventId } = useParams();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [form, setForm] = useState<QrcodeParams>({ status: 1 });

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onInit = async () => {
    const tickets = await ticketService.findByEventId(eventId);
    setTickets(tickets);

    setIsLoading(false);
  };

  const onSave = async () => {
    console.log(form);
    for (const [key, value] of Object.entries(form)) {
      if (key !== "status") {
        if (!value) {
          showToast("Preencha todos os campos", "error");
          return;
        }
      }
    }

    try {
      await qrcodeService.create({
        ...form,
        userCpf: cleanCpfMask(form.userCpf),
      });
      showToast("QrCode criado com sucesso", "success");
      navigate("/admin/evento/" + eventId);
    } catch (e) {}
  };

  useEffect(() => {
    onInit().then();
  }, []);

  useEffect(() => {
    if (user) {
      setForm({ ...form, createdBy: user.id });
    }
  }, [user]);

  return (
    <div className={styles["c-create-event-qrcode"]}>
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : (
        <div>
          <div className={styles["c-create-event-qrcode__header"]}>
            <h1 className={styles["c-create-event-qrcode__header-title"]}>
              Criar ingresso
            </h1>

            <div className={styles["c-create-event-qrcode__header-action"]}>
              <Button text="Criar" onClick={onSave} />
            </div>
          </div>

          <form>
            <div>
              <Input
                label="Nome do usuário que irá usar o ingresso"
                value={form.userName}
                onChange={(e) => {
                  setForm({ ...form, userName: e.target.value });
                }}
              />
            </div>

            <div className="u-mt-2">
              <Input
                label="CPF do usuário que irá usar o ingresso"
                value={form.userCpf}
                mask="cpf"
                onChange={(e) => {
                  setForm({ ...form, userCpf: e.target.value });
                }}
              />
            </div>

            <div>
              <p>Tipo do ingresso</p>
              <select
                value={form.ticket}
                onChange={(e) => {
                  setForm({ ...form, ticket: e.target.value });
                }}
              >
                {tickets.map((ticket) => {
                  return (
                    <option key={ticket.id} value={ticket.id}>
                      {ticket.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <p className="u-mt-2">Disponível para uso</p>

              <input
                checked={!!form.status}
                type="checkbox"
                onChange={(e) => {
                  setForm({ ...form, status: Number(e.target.checked) });
                }}
              />

              {form.status ? "Válido" : "Inválido"}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
