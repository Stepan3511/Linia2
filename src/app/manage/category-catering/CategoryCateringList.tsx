"use client";

import { MANAGE_URL } from "@/config/url.config";
import { useGetCateringCategories } from "@/hooks/category-catering/useGetCateringCategories";
import { useDeleteCateringCategory } from "@/hooks/category-catering/useDeleteCateringCategory";
import { useRouter } from "next/navigation";

import styles from "./CategoryCateringList.module.scss";
import { ConfirmModal } from "@/components/confirm-modal/ConfirmModal";

export default function CategoryCateringList() {
  const { push } = useRouter();
  const { data: categories, isLoading, isError } = useGetCateringCategories();
  const { mutate: deleteCategory } = useDeleteCateringCategory();

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
        <li>
          <span>Кейтеринг - категории</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Кейтеринг - категории</h1>
        <button
          className={styles.button}
          onClick={() => push(MANAGE_URL.categoryCateringCreate())}
        >
          Новая категория
        </button>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ul className={styles.list}>
            {categories?.map((category) => {
              return (
                <li className={styles.item} key={category.id}>
                  <div className={styles.item_wrapper}>
                    <div>
                      Название: <b>{category.name}</b>
                    </div>
                    <div>
                      Порядок меню: <b>{category.position}</b>
                    </div>
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() =>
                        push(MANAGE_URL.categoryCateringEdit(category.id))
                      }
                    >
                      Редактировать
                    </button>
                    <ConfirmModal
                      handleClick={() => deleteCategory(category.id)}
                    >
                      <button className={styles.button}>Удалить</button>
                    </ConfirmModal>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
