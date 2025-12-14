export interface IWorkTime {
  id: string;
  from: string;
  to: string;
  message: string;
}

export interface IWorkTimeInput extends Omit<IWorkTime, "id"> {}

export interface WorkTimeItemFormProps {
  action: string;
  workTimeItem: IWorkTime | undefined;
  handleSubmit: (values: IWorkTimeInput) => void;
}
