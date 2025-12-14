"use client";

import { useParams } from "next/navigation";
import { useGetByIdCateringCategory } from "@/hooks/category-catering/useGetByIdCateringCategory";
import { useUpdateCateringCategory } from "@/hooks/category-catering/useUpdateCateringCategory";
import CategoryCateringItemForm from "../../CategoryCateringItemForm";

import styles from "../../CategoryCateringList.module.scss";

export default function CategoryCateringEdit() {
  const { id } = useParams();

  const categoryId = typeof id === "string" ? id : "";

  const { data: categoryItem, isLoading } =
    useGetByIdCateringCategory(categoryId);

  const { mutate: editCategory } = useUpdateCateringCategory(categoryId);
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
          <span>Редактировать категорию</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать категорию</h1>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : (
          <CategoryCateringItemForm
            categoryItem={categoryItem}
            handleSubmit={editCategory}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
