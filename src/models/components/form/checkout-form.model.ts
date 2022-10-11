import { UserParams } from "models/user";
import { SelectedTicket } from "../../ticket";

export interface UserCheckoutForm {
  cpf?: string;
  full_name?: string;
  ticket?: SelectedTicket;
}

export interface CheckoutForm extends UserParams {
  users: UserCheckoutForm[];
  cardNumber?: string;
  cardExpirationDate?: string;
  cardHolderName?: string;
  cardCVV?: string;
  password?: string;
  paymentMethodId?: string;
  issuers?: Issuer[];
  selectedIssuer?: string;
  installments?: Installment[];
  selectedInstallment?: string;
  cardToken?: string;
}

//TODO: Trocar de arquivo o modelo de issuers e installments
export interface Installment {
  discount_rate: number;
  installment_amount: number;
  installment_rate: number;
  installment_rate_collector: string[];
  installments: number;
  labels: any[];
  max_allowed_amount: number;
  min_allowed_amount: number;
  payment_method_option_id: string;
  recommended_message: string;
  reimbursement_rate: any;
  total_amount: number;
}

export interface Issuer {
  id: string;
  merchant_account_id: any;
  name: string;
  processing_mode: string;
  secure_thumbnail: string;
  status: string;
  thumbnail: string;
}
