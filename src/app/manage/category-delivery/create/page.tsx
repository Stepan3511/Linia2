"use client";

import React from "react";
import { useCreateDeliveryCategory } from "@/hooks/category-delivery/useCreateDeliveryCategory";
import CategoryDeliveryItemForm from "../CategoryDeliveryItemForm";

import styles from "./../CategoryDeliveryList.module.scss";

export default function AddCategoryDelivery() {
  const { mutate: addCategory } = useCreateDeliveryCategory();

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
          <a href="/manage/category-delivery">
            <span>Доставка - категории</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>
          <span>Новая категория</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Новая категория</h1>
        <CategoryDeliveryItemForm
          categoryItem={undefined}
          handleSubmit={addCategory}
          action="Создать"
        />
      </div>
    </div>
  );
}
