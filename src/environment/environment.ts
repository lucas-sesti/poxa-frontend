import { developmentEnvironment } from "./development.environment";
import { productionEnvironment } from "./production.environment";

const isDevelopment = process.env.NODE_ENV === "development";

export const environment: Environment = isDevelopment
  ? developmentEnvironment
  : productionEnvironment;

export interface Environment {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
}
