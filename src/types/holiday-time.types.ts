export interface IHolidayTime {
  id: string;
  from: string;
  to: string;
  message: string;
}

export interface IHolidayTimeInput extends Omit<IHolidayTime, "id"> {}

export interface HolidayTimeItemFormProps {
  action: string;
  holidayTimeItem: IHolidayTime | undefined;
  handleSubmit: (values: IHolidayTimeInput) => void;
}
