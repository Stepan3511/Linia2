"use client";

import { useParams } from "next/navigation";
import { useGetByIdCateringProduct } from "@/hooks/product-catering/useGetByIdCateringProduct";
import { useUpdateCateringProduct } from "@/hooks/product-catering/useUpdateCateringProduct";
import { useGetCateringCategories } from "@/hooks/category-catering/useGetCateringCategories";

import ProductCateringItemForm from "../../ProductCateringItemForm";

import styles from "../../ProductCateringList.module.scss";

export default function ProductCateringEdit() {
  const { id } = useParams();
  const productCateringId = typeof id === "string" ? id : "";

  const { data: productCateringItem, isLoading: isLoadingProduct } =
    useGetByIdCateringProduct(productCateringId);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError,
  } = useGetCateringCategories();

  const { mutate: editProductCatering } =
    useUpdateCateringProduct(productCateringId);

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
          <span>Редактировать товар</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать товар</h1>
        {isLoadingCategories || isLoadingProduct ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ProductCateringItemForm
            productCateringItem={productCateringItem}
            categories={categories}
            handleSubmit={editProductCatering}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
