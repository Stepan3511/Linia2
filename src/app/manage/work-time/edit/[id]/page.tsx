"use client";

import { useParams } from "next/navigation";
import { useGetByIdWorkTime } from "@/hooks/work-time/useGetByIdWorkTime";
import { useUpdateWorkTime } from "@/hooks/work-time/useUpdateWorkTime";
import WorkTimeItemForm from "../../WorkTimeItemForm";

import styles from "../../WorkTimeList.module.scss";

export default function WorkTimeEdit() {
  const { id } = useParams();

  const workTimeId = typeof id === "string" ? id : "";

  const { data: workTimeItem, isLoading } = useGetByIdWorkTime(workTimeId);

  const { mutate: editWorkTime } = useUpdateWorkTime(workTimeId);
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
          <a href="/manage/work-time">
            <span>Расписание</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>
          <span>Редактировать расписание</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать расписание</h1>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : (
          <WorkTimeItemForm
            workTimeItem={workTimeItem}
            handleSubmit={editWorkTime}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
