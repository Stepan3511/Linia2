"use client";

import React from "react";
import { useCreateCateringCategory } from "@/hooks/category-catering/useCreateCateringCategory";
import CategoryCateringItemForm from "../CategoryCateringItemForm";

import styles from "./../CategoryCateringList.module.scss";

export default function AddCategoryCatering() {
  const { mutate: addCategory } = useCreateCateringCategory();

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
          <a href="/manage/category-catering">
            <span>Кейтеринг - категории</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>
          <span>Новая категория</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Новая категория</h1>
        <CategoryCateringItemForm
          categoryItem={undefined}
          handleSubmit={addCategory}
          action="Создать"
        />
      </div>
    </div>
  );
}
