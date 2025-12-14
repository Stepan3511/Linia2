import { ICategory } from "./category.types";

export interface IProductCatering {
  id: string;
  name: string;
  description?: string;
  weight?: number;
  price?: number;
  minOrder?: number;
  image?: string | undefined;
  categoryId?: string;
  cateringCart?: boolean;
  deliveryCart?: boolean;
}

export interface IProductCateringInput extends Omit<IProductCatering, "id"> {}

export interface ProductCateringItemFormProps {
  action: string;
  productCateringItem: IProductCatering | undefined;
  categories: ICategory[];
  handleSubmit: (values: IProductCateringInput) => void;
}
