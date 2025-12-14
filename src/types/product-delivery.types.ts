import { ICategory } from "./category.types";

export interface IProductDelivery {
  id: string;
  name: string;
  description?: string;
  weight?: number;
  pieces?: number;
  price?: number;
  image?: string | undefined;
  categoryId?: string;
  cateringCart?: boolean;
  deliveryCart?: boolean;
}

export interface IProductDeliveryInput extends Omit<IProductDelivery, "id"> {}

export interface ProductDeliveryItemFormProps {
  action: string;
  productDeliveryItem: IProductDelivery | undefined;
  categories: ICategory[];
  handleSubmit: (values: IProductDeliveryInput) => void;
}
