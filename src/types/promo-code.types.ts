export interface IPromoCode {
  id: string;
  name: string;
  minPrice: number;
  products: {
    id: string;
    name: string;
    price?: number;
    image?: string;
  }[];
}

export interface IPromoCodeInput extends Omit<IPromoCode, "id" | "products"> {
  productIds: string[];
}

export interface PromoCodeItemFormProps {
  action: string;
  promoCodeItem?: IPromoCode;
  handleSubmit: (values: IPromoCodeInput) => void;
}
