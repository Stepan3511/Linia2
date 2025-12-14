"use client";

import { MANAGE_URL } from "@/config/url.config";
import { useGetDeliveryCategories } from "@/hooks/category-delivery/useGetDeliveryCategories";
import { useDeleteDeliveryCategory } from "@/hooks/category-delivery/useDeleteDeliveryCategory";
import { useRouter } from "next/navigation";

import styles from "./CategoryDeliveryList.module.scss";
import { ConfirmModal } from "@/components/confirm-modal/ConfirmModal";

export default function CategoryDeliveryList() {
  const { push } = useRouter();
  const { data: categories, isLoading, isError } = useGetDeliveryCategories();
  const { mutate: deleteCategory } = useDeleteDeliveryCategory();

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
          <span>Доставка - категории</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Доставка - категории</h1>
        <button
          className={styles.button}
          onClick={() => push(MANAGE_URL.categoryDeliveryCreate())}
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
                        push(MANAGE_URL.categoryDeliveryEdit(category.id))
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
