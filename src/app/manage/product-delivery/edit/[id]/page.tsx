"use client";

import { useParams } from "next/navigation";
import { useGetByIdDeliveryProduct } from "@/hooks/product-delivery/useGetByIdDeliveryProduct";
import { useUpdateDeliveryProduct } from "@/hooks/product-delivery/useUpdateDeliveryProduct";
import { useGetDeliveryCategories } from "@/hooks/category-delivery/useGetDeliveryCategories";

import ProductDeliveryItemForm from "../../ProductDeliveryItemForm";

import styles from "../../ProductDeliveryList.module.scss";

export default function ProductDeliveryEdit() {
  const { id } = useParams();
  const productDeliveryId = typeof id === "string" ? id : "";

  const { data: productDeliveryItem, isLoading: isLoadingProduct } =
    useGetByIdDeliveryProduct(productDeliveryId);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError,
  } = useGetDeliveryCategories();

  const { mutate: editProductDelivery } =
    useUpdateDeliveryProduct(productDeliveryId);

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
          <ProductDeliveryItemForm
            productDeliveryItem={productDeliveryItem}
            categories={categories}
            handleSubmit={editProductDelivery}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
