"use client";

import { useParams } from "next/navigation";
import { useGetByIdDeliveryCategory } from "@/hooks/category-delivery/useGetByIdDeliveryCategory";
import { useUpdateDeliveryCategory } from "@/hooks/category-delivery/useUpdateDeliveryCategory";
import CategoryDeliveryItemForm from "../../CategoryDeliveryItemForm";

import styles from "../../CategoryDeliveryList.module.scss";

export default function CategoryDeliveryEdit() {
  const { id } = useParams();

  const categoryId = typeof id === "string" ? id : "";

  const { data: categoryItem, isLoading } =
    useGetByIdDeliveryCategory(categoryId);

  const { mutate: editCategory } = useUpdateDeliveryCategory(categoryId);
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
          <span>Редактировать категорию</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать категорию</h1>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : (
          <CategoryDeliveryItemForm
            categoryItem={categoryItem}
            handleSubmit={editCategory}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
