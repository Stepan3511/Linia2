"use client";

import { useRouter } from "next/navigation";
import { useGetBanner } from "@/hooks/banner/useGetBanner";
import { useUpdateBanner } from "@/hooks/banner/useUpdateBanner";
import BannerItemForm from "../BannerItemForm";
import { IBannerInput } from "@/types/banner.types";

import styles from "../Banner.module.scss";

export default function BannerEdit() {
  const { push } = useRouter();
  const { data: banner, isLoading } = useGetBanner();
  const { mutate: updateBanner } = useUpdateBanner();
  
  const handleSubmit = (data: IBannerInput) => {
    updateBanner(data);
  };

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
          <a href="/manage/banner">
            <span>Баннер</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>
          <span>Редактировать баннер</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать баннер</h1>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : (
          <BannerItemForm
            bannerItem={banner}
            handleSubmit={handleSubmit}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
