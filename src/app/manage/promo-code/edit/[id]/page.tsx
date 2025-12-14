"use client";

import { useParams } from "next/navigation";
import { useGetByIdPromoCode } from "@/hooks/promo-code/useGetByIdPromoCode";
import { useUpdatePromoCode } from "@/hooks/promo-code/useUpdatePromoCode";
import PromoCodeItemForm from "../../PromoCodeItemForm";

import styles from "../../PromoCodeList.module.scss";

export default function PromoCodeEdit() {
  const { id } = useParams();

  const promoCodeId = typeof id === "string" ? id : "";

  const { data: promoCodeItem, isLoading } = useGetByIdPromoCode(promoCodeId);

  const { mutate: editPromoCode } = useUpdatePromoCode(promoCodeId);
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
          <span>Редактировать промокоды</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Редактировать промокоды</h1>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : (
          <PromoCodeItemForm
            promoCodeItem={promoCodeItem}
            handleSubmit={editPromoCode}
            action="Сохранить"
          />
        )}
      </div>
    </div>
  );
}
