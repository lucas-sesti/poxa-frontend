import { Qrcode, QrcodeParams, QrcodeStatus } from "models/qrcode";
import { qrcodeService } from "services/qrcode/qrcode.service";
import { showToast } from "utils/toaster/toaster.utils";
import { NavigateFunction } from "react-router-dom";
import { UserParams } from "models/user";
import { cleanCpfMask } from "../../../utils/cpf/cpf.utils";

export async function createQrcode(
  users: UserParams[],
  createdBy: string,
  navigate: NavigateFunction
) {
  const qrcodes = [];

  for (const user of users) {
    const qrcode = await qrcodeService.create({
      status: QrcodeStatus.ENABLED,
      userName: user.full_name,
      userCpf: cleanCpfMask(user.cpf),
      ticket: user.ticket.id,
      createdBy,
    });

    if (qrcode) {
      qrcodes.push(qrcode);
    } else {
      showToast(
        `Oops.. Não foi possível gerar o ingresso para: ${user.full_name}`,
        "error"
      );
    }
  }

  if (qrcodes.length > 0) {
    showToast("Oba! Ingressos gerados com sucesso!", "success");

    showToast("Redirecionando para a página de ingressos...", "loading", 3000);

    const timeout = setTimeout(() => {
      navigate("/ingressos");
      clearTimeout(timeout);
    }, 2800);
  }
}
