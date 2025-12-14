"use client";

import React from "react";
import { useCreateDeliveryProduct } from "@/hooks/product-delivery/useCreateDeliveryProduct";
import { useGetDeliveryCategories } from "@/hooks/category-delivery/useGetDeliveryCategories";
import ProductDeliveryItemForm from "../ProductDeliveryItemForm";

import styles from "./../ProductDeliveryList.module.scss";

export default function AddProductDelivery() {
  const { mutate: addDeliveryProduct } = useCreateDeliveryProduct();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError,
  } = useGetDeliveryCategories();

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
          <a href="/manage/product-delivery">
            <span>Доставка - товары</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>
          <span>Новый товар</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Создать товар</h1>
        {isLoadingCategories ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ProductDeliveryItemForm
            productDeliveryItem={undefined}
            categories={categories}
            handleSubmit={addDeliveryProduct}
            action="Создать"
          />
        )}
      </div>
    </div>
  );
}
