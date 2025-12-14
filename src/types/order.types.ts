import { IPromoCode } from "./promo-code.types";

export interface ICreateOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ICreateOrderInput {
  promoCodeId?: string;
  items: ICreateOrderItem[];
  totalAmount: number;
}

export interface IOrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: string;
  accountId: string;
  promoCodeId?: string;
  totalAmount: number;
  status: "PENDING" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  items: IOrderItem[];
  promoCode?: IPromoCode | null;
}
