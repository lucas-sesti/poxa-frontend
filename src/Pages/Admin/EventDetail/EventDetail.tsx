import styles from "./EventDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveEvent, setActiveEvent } from "store/event/event.slice";
import React, { useEffect, useState } from "react";
import { eventService } from "services/event/event.service";
import Input from "Components/Input/Input";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Ticket, TicketType } from "models/ticket";
import Button from "Components/Button/Button";
import EventPayments from "./EventPayment/EventPayment";
import { Payment } from "models/payment/";
import { paymentService } from "services/payment/payment.service";
import { showToast } from "utils/toaster/toaster.utils";
import toast, { Toaster } from "react-hot-toast";
import { translateTicketType } from "utils/ticket/ticket.utils";
import PxEditor from "../../../Components/Editor/Editor";
import FileUploader from "../../../Components/FileUploader/FileUploader";
import { mediaService } from "../../../services/media/media.service";
import { Qrcode } from "../../../models/qrcode";
import { qrcodeService } from "../../../services/qrcode/qrcode.service";
import EventQrcodes from "./EventQrcodes/EventQrcodes";
import EventSimpleQrcodes from "./EventSimpleQrcodes/EventSimpleQrcodes";

dayjs.extend(customParseFormat);

export default function AdminEventDetail() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const event = useSelector(selectActiveEvent);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [qrcodes, setQrcodes] = useState<Qrcode[]>([]);
  const [simpleQrcodes, setSimpleQrcodes] = useState<Qrcode[]>([]);

  const [form, setForm] = useState<any>({ tickets: [] });

  const [isCreating, setIsCreating] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const updateTicket = (
    key: string,
    value: string | boolean,
    index: number
  ) => {
    const tickets = [...form.tickets];
    const newTicket = { ...tickets[index] };

    newTicket[key] = key === "type" ? Number(value) : value;

    tickets[index] = newTicket;

    setForm({ ...form, tickets });
  };

  const addTicket = () => {
    const newTicket = {
      title: "",
      price: 0,
      type: TicketType.BOX,
      qrcodes: [],
      status: true,
      subtitle: "",
    };

    setForm({ ...form, tickets: [...form.tickets, newTicket] });
  };

  const onSave = async () => {
    if (event && event.id && event.endDate) {
      const now = dayjs();
      const eventDate = dayjs.unix(event.endDate);

      const isExpired = eventDate.isBefore(now);

      if (isExpired) {
        showToast("Não pode atualizar um evento que já aconteceu", "error");
        return;
      }
    }

    form.startDate = dayjs(
      `${form.date} ${form.startDate}`,
      "DD/MM/YYYY HH:mm"
    ).unix();

    form.endDate = dayjs(`${form.date} ${form.endDate}`, "DD/MM/YYYY HH:mm")
      .add(1, "day")
      .unix();

    if (form.tickets && form.tickets.length > 0) {
      form.tickets.forEach((ticket: Ticket) => {
        if (isNaN(ticket.price)) {
          const price = ticket.price as unknown as string;

          ticket.price = Number(price.replace(/\D/g, ""));
        }
      });
    }

    const savingToast = showToast("Salvando evento...", "loading");

    const savedEvent = isCreating
      ? await eventService.create(form)
      : await eventService.update({ id: event.id, ...form });

    if (savedEvent) {
      toast.dismiss(savingToast);
      showToast("Oba! Evento salvo com sucesso!", "success");
      navigate(`/admin/evento/${savedEvent.id}`);
      setIsCreating(false);
    }
  };

  const setFormDate = (key: string, value: string) => {
    const _form = { ...form };
    _form[key] = value;
    setForm(_form);
  };

  useEffect(() => {
    if (eventId) {
      const _isCreating = eventId === "criar";
      setIsCreating(_isCreating);

      if (!_isCreating) {
        if (!event) {
          eventService.getOne(eventId).then((event) => {
            event.tickets?.sort((a, b) => b.title.localeCompare(a.title));

            dispatch(setActiveEvent(event));
          });
        }

        if (!payments || payments?.length === 0) {
          paymentService.getPaymentsByEvent(eventId).then((payments) => {
            setPayments(payments);
          });
        }

        if (!qrcodes || qrcodes?.length === 0) {
          qrcodeService.getQrcodesFromEvent(eventId).then((qrcodes) => {
            setQrcodes(qrcodes);
          });

          qrcodeService.getAllQrcodes(eventId).then((qrcodes) => {
            setSimpleQrcodes(qrcodes);
          });
        }
      } else {
        setActiveEvent({});
      }
    }
  }, []);

  useEffect(() => {
    if (event) {
      setForm({
        ...form,
        ...event,
        date: dayjs.unix(event.startDate).format("DD/MM/YYYY"),
        startDate: dayjs.unix(event.startDate).format("HH:mm"),
        endDate: dayjs.unix(event.endDate).format("HH:mm"),
      });
    }
  }, [event]);

  return (
    <div className={styles["c-admin-event-detail"]}>
      {form && (
        <>
          <form className={styles["c-admin-event-detail__form"]}>
            <div className={styles["c-admin-event-detail__header"]}>
              <h1 className={styles["c-admin-event-detail__header-title"]}>
                {isCreating ? "Criando " : "Editando "} {form.title || "evento"}
              </h1>

              <div className={styles["c-admin-event-detail__header-action"]}>
                <Button type="button" text="Salvar" onClick={onSave} />
              </div>
            </div>

            {event && <p>ID: {event.id}</p>}

            <FileUploader
              isUploading={isUploadingMedia}
              image={form.image || ""}
              onFileSelect={async (file) => {
                setIsUploadingMedia(true);

                try {
                  const media = await mediaService.uploadMedia(file);

                  if (media) {
                    setIsUploadingMedia(false);
                    setForm({ ...form, image: media.url });
                  }
                } catch (e) {
                  setIsUploadingMedia(false);
                }
              }}
            />

            <Input
              label="Título"
              value={form.title || ""}
              required={true}
              onChange={(event) => {
                setForm({ ...form, title: event.target.value });
              }}
            />

            {/*{form.description}*/}
            <PxEditor
              text={form.description || ""}
              onChangeValue={(value) => {
                setForm({ ...form, description: value });
              }}
            />

            <Input
              label="Endereço"
              value={form.address || ""}
              required={true}
              onChange={(event) => {
                setForm({ ...form, address: event.target.value });
              }}
            />

            <Input
              mask="date"
              label="Data"
              placeholder="DD/MM/YYYY"
              value={form.date || ""}
              required={true}
              onChange={(e) => {
                setFormDate("date", e.target.value);
              }}
            />

            <Input
              mask="hour"
              label="Horário de início"
              placeholder="00:00"
              value={form.startDate || ""}
              required={true}
              onChange={(e) => {
                setFormDate("startDate", e.target.value);
              }}
            />

            <Input
              mask="hour"
              label="Horário de finalização"
              placeholder="00:00"
              value={form.endDate || ""}
              required={true}
              onChange={(e) => {
                setFormDate("endDate", e.target.value);
              }}
            />

            <div className={styles["c-admin-event-detail__form-tickets"]}>
              <h2>Ingressos</h2>

              {form.tickets && form.tickets.length > 0 && (
                <div>
                  {form.tickets.map((ticket: Ticket, index: number) => {
                    return (
                      <div key={`${ticket.id}_${index}`}>
                        <h3>{index + 1}º</h3>

                        <div>
                          <input
                            checked={ticket.status}
                            type="checkbox"
                            onChange={() => {
                              updateTicket("status", !ticket.status, index);
                            }}
                          />

                          {ticket.status ? "Visível" : "Oculto"}
                        </div>

                        <div>
                          <select
                            value={ticket.type}
                            onChange={(e) => {
                              updateTicket("type", e.target.value, index);
                            }}
                          >
                            {Object.entries(TicketType)
                              .slice(3)
                              .map(([key, value]) => {
                                return (
                                  <option key={key} value={value}>
                                    {translateTicketType(value)}
                                  </option>
                                );
                              })}
                          </select>
                        </div>

                        <Input
                          label="Título"
                          value={ticket.title}
                          required={true}
                          onChange={(e) => {
                            updateTicket("title", e.target.value, index);
                          }}
                        />

                        <Input
                          label="Subtítulo"
                          value={ticket.subtitle}
                          required={true}
                          onChange={(e) => {
                            updateTicket("subtitle", e.target.value, index);
                          }}
                        />

                        <Input
                          mask="currency"
                          label="Preço"
                          value={ticket.price.toString()}
                          required={true}
                          onChange={(e) => {
                            updateTicket("price", e.target.value, index);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              <div className={styles["c-admin-event-detail__form-tickets-add"]}>
                <Button
                  type="button"
                  text="Adicionar"
                  onClick={() => {
                    addTicket();
                  }}
                />
              </div>
            </div>
          </form>
        </>
      )}

      <EventPayments payments={payments} />

      {event && event.id && (
        <div>
          <EventQrcodes qrcodes={qrcodes} eventId={event.id} />

          <EventSimpleQrcodes
            qrcodes={simpleQrcodes}
            eventId={event.id}
          ></EventSimpleQrcodes>
        </div>
      )}
    </div>
  );
}
