"use client";

import { useRouter } from "next/navigation";
import { MANAGE_URL, PUBLIC_URL } from "@/config/url.config";

import styles from "./Manage.module.scss";
import { removeFromStorage } from "@/services/admin/auth-token.service";

export default function Manage() {
  const { push } = useRouter();

  const logout = () => {
    removeFromStorage();
    push(PUBLIC_URL.admin());
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper_logout}>
        <ul className={styles.breadcrum_list}>
          <li className={styles.breadcrum_link}>
            <a href="/">
              <span>Главная</span>
            </a>
          </li>
          <span className={styles.breadcrum_arrow}>&gt;</span>

          <li>
            <span>Панель управления</span>
          </li>
        </ul>

        <button className={styles.button_logout} onClick={() => logout()}>
          Выйти
        </button>
      </div>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать раздел: </h1>
        <div className={styles.wrapper_menu}>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.categoryDelivery())}
          >
            Доставка - категории
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.productDelivery())}
          >
            Доставка - товары
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.categoryCatering())}
          >
            Кейтеринг - категории
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.productCatering())}
          >
            Кейтеринг - товары
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.stories())}
          >
            Сторисы
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.workTime())}
          >
            Расписание
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.holidayTime())}
          >
            Выходные
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.promoCode())}
          >
            Промокоды
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.clients())}
          >
            Клиенты
          </button>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.banner())}
          >
            Баннеры
          </button>
        </div>
      </div>
    </div>
  );
}
