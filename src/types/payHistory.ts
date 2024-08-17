import { Tables } from "./supabase";

type ExcludeFromNullable = 'payment_id';

export interface Product {
  amount: number;
  id: string;
  name: string;
  quantity: number;
  user_id: string;
  hasReview?: boolean;
  rating?: number | null | undefined;
}

export interface Order extends Omit<Tables<'orderd_list'>, 'products'> {
  products: Product[] | null;
}

export type NullablePropertiesExcept<T> = {
  [P in keyof T]: P 
};

export interface BaseOrderInPayHistory {
    payment_id: string;
    status: string;
    order_name: string;
    amount: number;
    price: number;
    user_id: string;
    payment_date:string;
    id: string;
    pay_provider: string;
    user_name: string;
    phone_number: string;
    products: 
        {
            id: string;
            name: string;
            amount: number;
            quantity: number;
        }[]
    created_at: string;
    user_email: string;
}

export type OrderInPayHistory = NullablePropertiesExcept<BaseOrderInPayHistory>;
export type OrderListInPayHistory = {
  [date: string]: OrderInPayHistory[];
}

export interface PayHistory  {
  status: string;
  id: string;
  transactionId: string;
  merchantId: string;
  storeId: string;
  method?: {
    type: string;
    card?: {
      publisher?: string;
      issuer?: string;
      brand?: string;
      type?: string;
      ownerType?: string;
      bin?: string;
      name?: string;
      number?: string;
    };
    approvalNumber?: string;
    installment?: {
      month: number;
      isInterestFree: boolean;
    };
    pointUsed?: boolean;
  };
  channel: {
    type: string;
    id?: string;
    key?: string;
    name?: string;
    pgProvider: string;
    pgMerchantId: string;
  };
  version: string;
  scheduleId?: string;
  billingKey?: string;
  // 웹훅은 사용 안하니 지정 안함
  requestedAt: string;
  updatedAt: string;
  statusChangedAt: string;
  orderName: string;
  amount: {
    total: number;
    taxFree: number;
    vat?: number;
    supply?: number;
    discount: number;
    paid: number;
    cancelled: number;
    cancelledTaxFree: number;
  };
  currency: string;
  customer: {
    id?: string;
    birthYear?: string;
    gender?: string;
    email?: string;
    phoneNumber?: string;
    address?: {
      type?: string;
      oneLine?: string;
    };
    zipcode?: string;
  };
  promotionId?: string;
  isCulturalExpense?: boolean;
  escrow?: {
    status?: string;
  };
  products?: {
    id: string;
    name: string;
    tag?: string;
    code?: string;
    amount: number;
    quantity: number;
  }[];
  productCount?: number;
  customData?: string;
  country?: string;
  paidAt?: string;
  pgTxId?: string;
  cashReceipt?: {
    status?: string;
    type?: string;
    pgReceiptId?: string;
    issueNumber: string;
    totalAmount: number;
    taxFreeAmount?: number;
    currency: string;
    url?: string;
    issuedAt: string;
    cancelledAt: string;
  };
  receiptUrl?: string;
  cancellations?: {
    status: string;
    id: string;
    pgCancellationId?: string;
    totalAmount: number;
    taxFreeAmount: number;
    vatAmount: number;
    easyPayDiscountAmount?: number;
    reason: string;
    cancelledAt?: string;
    requestedAt: string;
  }[];
  cancelledAt: string;
};