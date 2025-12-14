"use client";

import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";

import styles from "./StoriesList.module.scss";
import { useGetStories } from "@/hooks/stories/useGetStories";
import { useDeleteStories } from "@/hooks/stories/useDeleteStories";
import { ConfirmModal } from "@/components/confirm-modal/ConfirmModal";

export default function StoriesList() {
  const { push } = useRouter();

  const { data: storiesGroups, isLoading, isError } = useGetStories();

  const { mutate: deleteStories } = useDeleteStories();

  return (
    <div className={styles.container}>
      <ul className={styles.breadcrum_list}>
        <li className={styles.breadcrum_link}>
          <a href="/">Главная</a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li className={styles.breadcrum_link}>
          <a href="/manage">Панель управления</a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>Группы сторис</li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Группы сторис</h1>
        <button
          className={styles.button}
          onClick={() => push(MANAGE_URL.storiesCreate())}
        >
          Добавить группу сторис
        </button>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ul className={styles.list}>
            {storiesGroups?.map((group) => (
              <li className={styles.item} key={group.id}>
                <div className={styles.info_wrapper}>
                  <div className={styles.info_title}>
                    <span>
                      <b>Название:</b>
                    </span>
                    {group.name || "Без названия"}
                  </div>
                  {group.description && (
                    <div className={styles.info_description}>
                      <b>Описание:</b> {group.description}
                    </div>
                  )}
                  <div className={styles.info_stories_count}>
                    <b>Изображений:</b> {group.stories.length}
                  </div>
                </div>
                <div className={styles.details_wrapper}>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() => push(MANAGE_URL.storiesEdit(group.id))}
                    >
                      Редактировать
                    </button>
                    <ConfirmModal handleClick={() => deleteStories(group.id)}>
                      <button className={styles.button}>Удалить</button>
                    </ConfirmModal>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
