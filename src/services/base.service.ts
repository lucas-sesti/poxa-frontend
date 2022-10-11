import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosStatic,
} from "axios";
import toast from "react-hot-toast";
import { environment } from "../environment/environment";
import { showToast } from "../utils/toaster/toaster.utils";
import { oauth } from "../lib/OAuth";

declare module "axios" {
  export interface AxiosRequestConfig {
    public?: boolean;
  }
}

export abstract class BaseService<T> {
  public endpoint: string;
  static axios: AxiosStatic;

  constructor(endpoint: string) {
    this.endpoint = endpoint;

    this.createAxios(environment.baseUrl).then();
  }

  async createAxios(baseUrl: string): Promise<void> {
    if (!BaseService.axios) {
      BaseService.axios = axios;
      BaseService.axios.defaults.baseURL = baseUrl;

      BaseService.axios.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          const customMessage = (error.response?.data as any)?.message;

          if (customMessage) {
            showToast(customMessage, "error");

            return;
          }

          showToast(error.message, "error");
        }
      );

      BaseService.axios.interceptors.request.use(async (req) => {
        if (req.public) {
          return req;
        }

        const isAuthenticated = await oauth.isAuthenticated();

        if (isAuthenticated) {
          const token = await oauth.fetchOrRefreshAccessToken();

          req.headers.authorization =
            req.headers.authorization ?? `Bearer ${token}`;
        }

        return req;
      });
    }
  }

  async request(config: AxiosRequestConfig = {}) {
    return BaseService.axios(config).then((response) => response?.data);
  }

  async create(data: any, config: AxiosRequestConfig = {}) {
    return this.request({
      method: "POST",
      data,
      url: `/${this.endpoint}/`,
      ...config,
    });
  }

  async update(data: any, config: AxiosRequestConfig = {}) {
    const id = data.id;
    delete data.id;

    return this.request({
      method: "PATCH",
      data,
      url: `/${this.endpoint}/${id}`,
      ...config,
    });
  }

  async save(data: any, config: AxiosRequestConfig = {}) {
    return data.id ? this.update(data, config) : this.create(data, config);
  }

  async get(config: AxiosRequestConfig = {}, path = ""): Promise<T[]> {
    return this.request({
      method: "GET",
      url: `/${this.endpoint}/${path}`,
      ...config,
    });
  }

  async getOne(id: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request({
      method: "GET",
      url: `/${this.endpoint}/${id}`,
      ...config,
    });
  }

  async deleteOne(id: string, config: AxiosRequestConfig = {}) {
    return this.request({
      method: "DELETE",
      url: `/${this.endpoint}/${id}`,
      ...config,
    });
  }
}
