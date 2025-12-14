"use client";

import React from "react";
import { useCreateWorkTime } from "@/hooks/work-time/useCreateWorkTime";
import WorkTimeItemForm from "../WorkTimeItemForm";

import styles from "./../WorkTimeList.module.scss";

export default function AddWorkTime() {
  const { mutate: addWorkTime } = useCreateWorkTime();

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
          <span>Новое расписание</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Новое расписание</h1>
        <WorkTimeItemForm
          workTimeItem={undefined}
          handleSubmit={addWorkTime}
          action="Создать"
        />
      </div>
    </div>
  );
}
