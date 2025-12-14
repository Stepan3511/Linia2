"use client";

import React from "react";
import { useCreateStories } from "@/hooks/stories/useCreateStories";
import StoriesForm from "../StoriesForm";

import styles from "../StoriesList.module.scss";

export default function AddStories() {
  const { mutate: addStories } = useCreateStories();

  return (
    <div className={styles.container}>
      <ul className={styles.breadcrum_list}>
        <li className={styles.breadcrum_link}>
          <a href="/">Главная</a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li className={styles.breadcrum_link}>
          <a href="/manage">Панель управления</a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li className={styles.breadcrum_link}>
          <a href="/manage/stories">Группы сторис</a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>Новая группа сторис</li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Создать группу сторис</h1>
        <StoriesForm handleSubmit={addStories} action="Создать" />
      </div>
    </div>
  );
}
