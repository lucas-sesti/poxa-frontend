import { useEffect, useState } from "react";
import { qrcodeService } from "services/qrcode/qrcode.service";
import { useSelector } from "react-redux";
import { selectUser } from "store/user/user.slice";
import { Qrcode } from "models/qrcode";
import DashboardTicket from "./Ticket/Ticket";
import styles from "./Dashboard.module.scss";
import { showToast } from "../../utils/toaster/toaster.utils";
import toast from "react-hot-toast";
import Header from "./Header/Header";

export default function Dashboard() {
  const user = useSelector(selectUser);
  const [qrcodesByCpf, setQrcodesByCpf] = useState<Qrcode[]>([]);
  const [qrcodesCreatedByMe, setQrcodesCreatedByMe] = useState<Qrcode[]>([]);

  const getQrcodes = async () => {
    if (qrcodesByCpf.length === 0) {
      setQrcodesByCpf(await qrcodeService.getQrcodesByCpf(user.cpf));
    }

    if (qrcodesCreatedByMe.length === 0) {
      setQrcodesCreatedByMe(await qrcodeService.getQrcodesCreatedByMe());
    }
  };

  const onVisibleOnlyForMe = async (qrcode: Qrcode) => {
    console.log("Deixando visivel apenas para mim");
    console.log(qrcodesCreatedByMe);
    const loadingToast = showToast(
      "Transformando em visível apenas para você...",
      "loading"
    );

    try {
      const updatedQrcode = await qrcodeService.setQrcodeVisibleOnlyForMe(
        qrcode.id
      );
      const newQrcodesByCpf = [...qrcodesByCpf];

      const indexQrcode = newQrcodesByCpf.findIndex(
        (_qrcode) => _qrcode.id === qrcode.id
      );

      console.log(indexQrcode, "indexQrcode");

      if (indexQrcode >= 0) {
        newQrcodesByCpf[indexQrcode] = updatedQrcode;
      }

      toast.dismiss(loadingToast);
      showToast("Oba! Ingresso visível apenas para você!", "success");

      setQrcodesByCpf(newQrcodesByCpf);
    } catch (e) {
      toast.dismiss(loadingToast);
    }
  };

  useEffect(() => {
    if (user) {
      getQrcodes().then();
    }
  }, [user]);

  return (
    <div className={styles["c-dashboard"]}>
      <Header />

      <h1 className={styles["c-dashboard__title"]}>Meus ingressos</h1>

      <div className={styles["c-dashboard__qrcodes"]}>
        {qrcodesByCpf.length === 0 && <p>Você não possuí nenhum ingresso</p>}
        {qrcodesByCpf.length > 0 &&
          qrcodesByCpf.map((qrcode) => {
            return (
              <div
                className={styles["c-dashboard__qrcodes-item"]}
                key={qrcode.id}
              >
                <DashboardTicket
                  qrcode={qrcode}
                  user={user}
                  onVisibleOnlyForMe={onVisibleOnlyForMe}
                />
              </div>
            );
          })}
      </div>

      {qrcodesCreatedByMe.length > 0 && (
        <>
          <h1 className={styles["c-dashboard__title"]}>Outros ingressos</h1>

          <div className={styles["c-dashboard__qrcodes"]}>
            {qrcodesCreatedByMe.length > 0 &&
              qrcodesCreatedByMe.map((qrcode) => {
                return (
                  <div
                    className={styles["c-dashboard__qrcodes-item"]}
                    key={qrcode.id}
                  >
                    <DashboardTicket qrcode={qrcode} user={user} />
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
