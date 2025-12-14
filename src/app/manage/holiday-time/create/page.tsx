"use client";

import React from "react";
import { useCreateHolidayTime } from "@/hooks/holiday-time/useCreateHolidayTime";
import HolidayTimeItemForm from "../HolidayTimeItemForm";

import styles from "./../HolidayTimeList.module.scss";

export default function AddHolidayTime() {
  const { mutate: addHolidayTime } = useCreateHolidayTime();

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
          <span>Новые выходные</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Новые выходные</h1>
        <HolidayTimeItemForm
          holidayTimeItem={undefined}
          handleSubmit={addHolidayTime}
          action="Создать"
        />
      </div>
    </div>
  );
}
