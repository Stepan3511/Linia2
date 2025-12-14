"use client";

import React from "react";
import { useCreatePromoCode } from "@/hooks/promo-code/useCreatePromoCode";
import PromoCodeItemForm from "../PromoCodeItemForm";

import styles from "./../PromoCodeList.module.scss";

export default function AddPromoCode() {
  const { mutate: addPromoCode } = useCreatePromoCode();

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
          <a href="/manage/promo-code">
            <span>Промокоды</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>
          <span>Новый промокод</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Новый промокод</h1>
        <PromoCodeItemForm
          promoCodeItem={undefined}
          handleSubmit={addPromoCode}
          action="Создать"
        />
      </div>
    </div>
  );
}
