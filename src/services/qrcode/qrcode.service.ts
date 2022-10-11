import { BaseService } from "services/base.service";
import { Qrcode } from "models/qrcode";

class QrcodeService extends BaseService<Qrcode> {
  public endpoint = "qrcode";

  constructor() {
    super("qrcode");
  }

  public getQrcodesFromEvent(id: string): Promise<Qrcode[]> {
    return this.request({
      method: "GET",
      url: `/${this.endpoint}/event/${id}`,
    });
  }

  public getAllQrcodes(id: string): Promise<Qrcode[]> {
    return this.request({
      method: "GET",
      url: `${this.endpoint}/event/${id}/all`,
    });
  }

  public getQrcodesByCpf(cpf: string): Promise<Qrcode[]> {
    return this.request({
      method: "GET",
      url: `/${this.endpoint}/user/${cpf}`,
    });
  }

  public getQrcodesCreatedByMe(): Promise<Qrcode[]> {
    return this.request({
      method: "GET",
      url: `/${this.endpoint}/user/createdByMe`,
    });
  }

  public setQrcodeVisibleOnlyForMe(qrcodeId: string): Promise<Qrcode> {
    return this.request({
      method: "POST",
      url: `/${this.endpoint}/visibleOnlyForMe/${qrcodeId}`,
    });
  }
}

export const qrcodeService = new QrcodeService();
