export interface ICategory {
  id: string;
  name: string;
  position?: number;
}

export interface ICategoryInput extends Pick<ICategory, "name"> {}

export interface CategoryItemFormProps {
  action: string;
  categoryItem: ICategory | undefined;
  handleSubmit: (values: ICategoryInput) => void;
}
