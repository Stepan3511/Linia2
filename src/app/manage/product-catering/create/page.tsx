"use client";

import React from "react";
import { useCreateCateringProduct } from "@/hooks/product-catering/useCreateCateringProduct";
import { useGetCateringCategories } from "@/hooks/category-catering/useGetCateringCategories";
import ProductCateringItemForm from "../ProductCateringItemForm";

import styles from "./../ProductCateringList.module.scss";

export default function AddProductCatering() {
  const { mutate: addCateringProduct } = useCreateCateringProduct();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError,
  } = useGetCateringCategories();

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
          <a href="/manage/product-catering">
            <span>Кейтеринг - товары</span>
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
          <ProductCateringItemForm
            productCateringItem={undefined}
            categories={categories}
            handleSubmit={addCateringProduct}
            action="Создать"
          />
        )}
      </div>
    </div>
  );
}
