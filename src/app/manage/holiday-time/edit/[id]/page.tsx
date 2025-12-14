"use client";

import { useParams } from "next/navigation";
import { useGetByIdHolidayTime } from "@/hooks/holiday-time/useGetByIdHolidayTime";
import { useUpdateHolidayTime } from "@/hooks/holiday-time/useUpdateHolidayTimey";
import HolidayTimeItemForm from "../../HolidayTimeItemForm";

import styles from "../../HolidayTimeList.module.scss";

export default function HolidayTimeEdit() {
  const { id } = useParams();

  const holidayTimeId = typeof id === "string" ? id : "";

  const { data: holidayTimeItem, isLoading } =
    useGetByIdHolidayTime(holidayTimeId);

  const { mutate: editHolidayTime } = useUpdateHolidayTime(holidayTimeId);
  return (
    <div className={styles.container}>
      <ul className={styles.breadcrum_list}>
        <li className={styles.breadcrum_link}>
          <a href="/">
            <span>Главная</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li className={styles.breadcrum_link}>
          <a href="/manage">
            <span>Панель управления</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li className={styles.breadcrum_link}>
          <a href="/manage/holiday-time">
            <span>Выходные</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>
          <span>Редактировать выходные</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать выходные</h1>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : (
          <HolidayTimeItemForm
            holidayTimeItem={holidayTimeItem}
            handleSubmit={editHolidayTime}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
