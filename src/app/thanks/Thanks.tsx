"use client";

import styles from "./Thanks.module.scss";
import Link from "next/link";

export default function Thanks() {
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
          <span>Спасибо за заказ</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <div className={styles.alert}>
          <h1 className={styles.title}>Спасибо за ваш заказ!</h1>
          <p className={styles.message}>Ваш заказ успешно оформлен.</p>

          <p className={styles.contact}>
            Если у вас возникли вопросы, свяжитесь с нами по телефону <br />
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
