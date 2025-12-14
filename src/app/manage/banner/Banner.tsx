"use client";
import { MANAGE_URL } from "@/config/url.config";
import { useGetBanner } from "@/hooks/banner/useGetBanner";
import { useRouter } from "next/navigation";
import BannerImagePreview from "./BannerImagePreview";

import styles from "./Banner.module.scss";

export default function Banner() {
  const { push } = useRouter();
  const { data: banner, isLoading, isError } = useGetBanner();

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
          <span>Баннер</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Баннер</h1>
        <button
          className={styles.button}
          onClick={() => push(MANAGE_URL.bannerEdit())}
        >
          Редактировать
        </button>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <div className={styles.banner_content}>
            {banner ? (
              <>
                <div className={styles.banner_info}>
                  <p><strong>Статус:</strong> {banner.isActive ? "Активен" : "Неактивен"}</p>
                  {banner.linkUrl && (
                    <p>
                      <strong>Ссылка:</strong>{" "}
                      <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer">
                        {banner.linkUrl}
                      </a>
                    </p>
                  )}
                </div>
                <div className={styles.banner_preview}>
                  <BannerImagePreview imageUrl={banner.imageUrl} />
                </div>
              </>
            ) : (
              <div className={styles.banner_info}>
                <p>Баннер еще не настроен.</p>
                <p>Нажмите кнопку "Редактировать" для настройки баннера.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}