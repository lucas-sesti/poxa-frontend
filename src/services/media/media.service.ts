import { BaseService } from "services/base.service";
import { Media } from "models/media";

class MediaService extends BaseService<Media> {
  constructor() {
    super("media");
  }

  public uploadMedia(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    return this.request({
      method: "POST",
      url: "media",
      data: formData,
    });
  }
}

export const mediaService = new MediaService();
