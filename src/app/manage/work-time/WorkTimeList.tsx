"use client";

import { MANAGE_URL } from "@/config/url.config";
import { useGetWorkTime } from "@/hooks/work-time/useGetWorkTime";
import { useDeleteWorkTime } from "@/hooks/work-time/useDeleteWorkTime";
import { useRouter } from "next/navigation";

import styles from "./WorkTimeList.module.scss";
import { ConfirmModal } from "@/components/confirm-modal/ConfirmModal";

export default function WorkTimeList() {
  const { push } = useRouter();
  const { data: workTimes, isLoading, isError } = useGetWorkTime();
  const { mutate: deleteWorkTime } = useDeleteWorkTime();

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
          <span>Расписание</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Расписание</h1>
        {/* <button
          className={styles.button}
          onClick={() => push(MANAGE_URL.workTimeCreate())}
        >
          Новое расписание
        </button> */}
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ul className={styles.list}>
            {workTimes?.map((workTime) => {
              return (
                <li className={styles.item} key={workTime.id}>
                  <div className={styles.item_wrapper}>
                    <div>
                      <b>Работаем:</b> c {workTime.from} до {workTime.to}
                    </div>
                    <div>
                      <b>Сообщение:</b> {workTime.message}
                    </div>
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() => push(MANAGE_URL.workTimeEdit(workTime.id))}
                    >
                      Редактировать
                    </button>
                    <ConfirmModal
                      handleClick={() => deleteWorkTime(workTime.id)}
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
