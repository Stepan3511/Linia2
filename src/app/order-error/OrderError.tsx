"use client";

import styles from "./OrderError.module.scss";
import Link from "next/link";

export default function OrderError() {
  return (
    <div className={styles.container}>
      <ul className={styles.breadcrum_list}>
        <li className={styles.breadcrum_link}>
          <a href="/">
            <span>Главная</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>

        <li>
          <span>Ошибка заказа</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <div className={styles.alert}>
          <h1 className={styles.title}>Ошибка при оформлении заказа</h1>
          <p className={styles.message}>
            К сожалению, не удалось оформить ваш заказ. Пожалуйста, свяжитесь с
            нами по номеру телефона:
          </p>

          <p className={styles.contact}>
            <a href="tel:+79248053355">+7 (924) 805-33-55</a>
          </p>
          <div className={styles.buttons}>
            <Link href="/" className={styles.link}>
              Вернуться на главную страницу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
