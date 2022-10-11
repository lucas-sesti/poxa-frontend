export interface MercadopagoPaymentParams {
  token?: string;
  description: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  installments: number;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
    address?: {
      zip_code: string;
      street_name: string;
      street_number: string;
      neighborhood: string;
      city: string;
      federal_unit: string;
    };
  };
  metadata?: Record<string, string>;
}

export interface MercadopagoPaymentPixParams {
  transaction_amount: number;
  description: string;
  payment_method_id: string;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
  metadata: Record<string, any>;
}

export interface PaymentParams {
  total: number;
  buyer: string;
  event: string;
}
