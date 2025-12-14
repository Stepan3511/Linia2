"use client";

import { useParams } from "next/navigation";
import { useGetByIdStories } from "@/hooks/stories/useGetByIdStories";
import { useUpdateStories } from "@/hooks/stories/useUpdateStories";
import StoriesForm from "../../StoriesForm";

import styles from "../../StoriesList.module.scss";

export default function EditStories() {
  const { id } = useParams();
  const storiesId = typeof id === "string" ? id : "";

  const {
    data: storiesGroup,
    isLoading,
    isError,
  } = useGetByIdStories(storiesId);

  const { mutate: updateStories } = useUpdateStories(storiesId);

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
        <li className={styles.breadcrum_link}>
          <a href="/manage/stories">Группы сторис</a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>Редактировать группу сторис</li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать группу сторис</h1>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <StoriesForm
            storiesGroup={storiesGroup}
            handleSubmit={updateStories}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
