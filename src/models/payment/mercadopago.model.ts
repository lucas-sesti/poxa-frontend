export interface Collector {
  account_id?: any;
  long_name?: any;
  account_holder_name: string;
  transfer_account_id?: any;
}

export interface BankInfo {
  payer: Payer;
  collector: Collector;
  is_same_bank_account_owner?: any;
  origin_bank_id?: any;
  origin_wallet_id?: any;
}

export interface TransactionData {
  qr_code: string;
  bank_transfer_id?: any;
  transaction_id?: any;
  financial_institution?: any;
  ticket_url: string;
  bank_info: BankInfo;
  qr_code_base64: string;
}

export interface ApplicationData {
  name?: any;
  version?: any;
}

export interface PointOfInteraction {
  type: string;
  business_info: BusinessInfo;
  location?: Location;
  application_data?: ApplicationData;
  transaction_data?: TransactionData;
}

export interface Response {
  id: number;
  date_created: Date;
  date_approved?: any;
  date_last_updated: Date;
  date_of_expiration?: any;
  money_release_date?: any;
  money_release_status?: any;
  operation_type: string;
  issuer_id: string;
  payment_method_id: string;
  payment_type_id: string;
  status: string;
  status_detail: string;
  currency_id: string;
  description: string;
  live_mode: boolean;
  sponsor_id?: any;
  authorization_code: string;
  money_release_schema?: any;
  taxes_amount: number;
  counter_currency?: any;
  brand_id?: any;
  shipping_amount: number;
  build_version: string;
  pos_id?: any;
  store_id?: any;
  integrator_id?: any;
  platform_id?: any;
  corporation_id?: any;
  collector_id: number;
  payer: Payer;
  marketplace_owner?: any;
  metadata: any;
  additional_info: AdditionalInfo;
  order: Order;
  external_reference?: any;
  transaction_amount: number;
  transaction_amount_refunded: number;
  coupon_amount: number;
  differential_pricing_id?: any;
  deduction_schema?: any;
  installments: number;
  transaction_details: TransactionDetails;
  fee_details: any[];
  charges_details: any[];
  captured: boolean;
  binary_mode: boolean;
  call_for_authorize_id?: any;
  statement_descriptor: string;
  card: Card;
  notification_url?: any;
  refunds: any[];
  processing_mode: string;
  merchant_account_id?: any;
  merchant_number?: any;
  acquirer_reconciliation: any[];
  point_of_interaction: PointOfInteraction;
}

export interface Body {
  id: number;
  date_created: Date;
  date_approved?: any;
  date_last_updated: Date;
  date_of_expiration?: any;
  money_release_date?: any;
  money_release_status?: any;
  operation_type: string;
  issuer_id: string;
  payment_method_id: string;
  payment_type_id: string;
  status: string;
  status_detail: string;
  currency_id: string;
  description: string;
  live_mode: boolean;
  sponsor_id?: any;
  authorization_code: string;
  money_release_schema?: any;
  taxes_amount: number;
  counter_currency?: any;
  brand_id?: any;
  shipping_amount: number;
  build_version: string;
  pos_id?: any;
  store_id?: any;
  integrator_id?: any;
  platform_id?: any;
  corporation_id?: any;
  collector_id: number;
  payer: Payer;
  marketplace_owner?: any;
  metadata: Metadata;
  additional_info: AdditionalInfo;
  order: Order;
  external_reference?: any;
  transaction_amount: number;
  transaction_amount_refunded: number;
  coupon_amount: number;
  differential_pricing_id?: any;
  deduction_schema?: any;
  installments: number;
  transaction_details: TransactionDetails;
  fee_details: any[];
  charges_details: any[];
  captured: boolean;
  binary_mode: boolean;
  call_for_authorize_id?: any;
  statement_descriptor: string;
  card: Card;
  notification_url?: any;
  refunds: any[];
  processing_mode: string;
  merchant_account_id?: any;
  merchant_number?: any;
  acquirer_reconciliation: any[];
  point_of_interaction: PointOfInteraction;
}

export interface AdditionalInfo {
  authentication_code?: any;
  available_balance?: any;
  nsu_processadora?: any;
}

export interface Identification {
  number: string;
  type: string;
}

export interface Cardholder {
  identification: Identification;
  name: string;
}

export interface Card {
  bin: string;
  cardholder: Cardholder;
  date_created: Date;
  date_last_updated: Date;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  id?: any;
  last_four_digits: string;
}

export interface Metadata {}

export interface Order {}

export interface Identification2 {
  number?: any;
  type?: any;
}

export interface Phone {
  area_code?: any;
  extension?: any;
  number?: any;
}

export interface Payer {
  email?: any;
  entity_type?: any;
  first_name?: any;
  id: string;
  identification: Identification2;
  last_name?: any;
  operator_id?: any;
  phone: Phone;
  type?: any;
}

export interface BusinessInfo {
  sub_unit: string;
  unit: string;
}

export interface TransactionDetails {
  acquirer_reference?: any;
  external_resource_url?: any;
  financial_institution?: any;
  installment_amount: number;
  net_received_amount: number;
  overpaid_amount: number;
  payable_deferral_period?: any;
  payment_method_reference_id: string;
  total_paid_amount: number;
}

export interface MercadopagoPayment {
  acquirer_reconciliation: any[];
  additional_info: AdditionalInfo;
  authorization_code?: any;
  binary_mode: boolean;
  brand_id?: any;
  build_version: string;
  call_for_authorize_id?: any;
  captured: boolean;
  card: Card;
  charges_details: any[];
  collector_id: number;
  corporation_id?: any;
  counter_currency?: any;
  coupon_amount: number;
  currency_id: string;
  date_approved?: any;
  date_created: Date;
  date_last_updated: Date;
  date_of_expiration?: any;
  deduction_schema?: any;
  description: string;
  differential_pricing_id?: any;
  external_reference?: any;
  fee_details: any[];
  id: number;
  installments: number;
  integrator_id?: any;
  issuer_id: string;
  live_mode: boolean;
  marketplace_owner?: any;
  merchant_account_id?: any;
  merchant_number?: any;
  metadata: Metadata;
  money_release_date?: any;
  money_release_schema?: any;
  money_release_status?: any;
  notification_url?: any;
  operation_type: string;
  order: Order;
  payer: Payer;
  payment_method_id: string;
  payment_type_id: string;
  platform_id?: any;
  point_of_interaction: PointOfInteraction;
  pos_id?: any;
  processing_mode: string;
  refunds: any[];
  shipping_amount: number;
  sponsor_id?: any;
  statement_descriptor: string;
  status: string;
  status_detail: string;
  store_id?: any;
  taxes_amount: number;
  transaction_amount: number;
  transaction_amount_refunded: number;
  transaction_details: TransactionDetails;
}

export interface MercadopagoPaymentResponse {
  body: Body;
  response: Response;
  status: number;
  idempotency: string;
}
