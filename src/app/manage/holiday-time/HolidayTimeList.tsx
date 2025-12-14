"use client";

import { MANAGE_URL } from "@/config/url.config";
import { useGetHolidayTime } from "@/hooks/holiday-time/useGetHolidayTime";
import { useDeleteHolidayTime } from "@/hooks/holiday-time/useDeleteHolidayTime";
import { useRouter } from "next/navigation";

import styles from "./HolidayTimeList.module.scss";
import { ConfirmModal } from "@/components/confirm-modal/ConfirmModal";

export default function HolidayTimeList() {
  const { push } = useRouter();
  const { data: holidayTimes, isLoading, isError } = useGetHolidayTime();
  const { mutate: deleteHolidayTime } = useDeleteHolidayTime();

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
        <li>
          <span>Выходные</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Выходные</h1>
        <button
          className={styles.button}
          onClick={() => push(MANAGE_URL.holidayTimeCreate())}
        >
          Новые выходные
        </button>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ul className={styles.list}>
            {holidayTimes?.map((holidayTime) => {
              return (
                <li className={styles.item} key={holidayTime.id}>
                  <div className={styles.item_wrapper}>
                    <div>
                      <b>Показываем:</b> c {holidayTime.from} до{" "}
                      {holidayTime.to}
                    </div>
                    <div>
                      <b>Сообщение:</b> {holidayTime.message}
                    </div>
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() =>
                        push(MANAGE_URL.holidayTimeEdit(holidayTime.id))
                      }
                    >
                      Редактировать
                    </button>
                    <ConfirmModal
                      handleClick={() => deleteHolidayTime(holidayTime.id)}
                    >
                      <button className={styles.button}>Удалить</button>
                    </ConfirmModal>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
