"use client";

import { MANAGE_URL } from "@/config/url.config";
import { useGetPromoCode } from "@/hooks/promo-code/useGetPromoCode";
import { useDeletePromoCode } from "@/hooks/promo-code/useDeletePromoCode";
import { useRouter } from "next/navigation";

import styles from "./PromoCodeList.module.scss";
import { ConfirmModalPromo } from "@/components/confirm-modal/ConfirmModalPromo";
import { useAddToArchive } from "@/hooks/promo-code/useAddToArchive";
import { useGetAllArchivedPromoCode } from "@/hooks/promo-code/useGetAllArchivedPromoCode";
import { useState } from "react";
import { useRestorePromoCode } from "@/hooks/promo-code/useRestorePromoCode";

export default function PromoCodeList() {
  const { push } = useRouter();
  const { data: promoCodes, isLoading, isError } = useGetPromoCode();
  const { mutate: deletePromoCode } = useDeletePromoCode();
  const { mutate: archivePromoCode } = useAddToArchive();
  const { data: archivedPromoCodes } = useGetAllArchivedPromoCode();
  const { mutate: restorePromoCode } = useRestorePromoCode();

  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

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
          <span>Промокоды</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Промокоды</h1>
        <button
          className={styles.button}
          onClick={() => push(MANAGE_URL.promoCodeCreate())}
        >
          Новый промокод
        </button>
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ul className={styles.list}>
            {promoCodes?.map((promoCode) => {
              return (
                <li className={styles.item} key={promoCode.id}>
                  <div className={styles.item_wrapper}>
                    <div>
                      <div>
                        <b>Название:</b> {promoCode.name}
                      </div>
                      <div>
                        <b>Минимальная сумма:</b> {promoCode.minPrice}
                      </div>
                    </div>

                    {promoCode.products?.length > 0 && (
                      <div className={styles.products}>
                        <ul className={styles.product_list}>
                          {promoCode.products.map((product) => (
                            <li
                              key={product.id}
                              className={styles.product_item}
                            >
                              <div className={styles.product_info}>
                                <img
                                  src={product.image || "/uploads/default.png"}
                                  alt={product.name}
                                  className={styles.product_image}
                                />
                                <span className={styles.product_text}>
                                  {product.name}
                                </span>
                                {product.price && (
                                  <span>{product.price} ₽</span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() =>
                        push(MANAGE_URL.promoCodeEdit(promoCode.id))
                      }
                    >
                      Редактировать
                    </button>
                    <ConfirmModalPromo
                      handleClick={() => deletePromoCode(promoCode.id)}
                    >
                      <button className={styles.button}>Удалить</button>
                    </ConfirmModalPromo>

                    <button
                      className={`${styles.button} ${styles.archive}`}
                      onClick={() => archivePromoCode(promoCode.id)}
                    >
                      Архивировать
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className={styles.archive_accordion}>
          <button
            className={styles.archive_toggle}
            onClick={() => setIsArchiveOpen(!isArchiveOpen)}
          >
            {isArchiveOpen ? "Скрыть архив промокодов" : "Архив промокодов"}
          </button>

          {isArchiveOpen && (
            <ul className={styles.list}>
              {archivedPromoCodes?.length ? (
                archivedPromoCodes.map((promo) => (
                  <li className={styles.item} key={promo.id}>
                    <div className={styles.item_wrapper}>
                      <div>
                        <div>
                          <b>Название:</b> {promo.name}
                        </div>
                        <div>
                          <b>Минимальная сумма:</b> {promo.minPrice}
                        </div>
                      </div>

                      {promo.products?.length > 0 && (
                        <div className={styles.products}>
                          <ul className={styles.product_list}>
                            {promo.products.map((product) => (
                              <li
                                key={product.id}
                                className={styles.product_item}
                              >
                                <div className={styles.product_info}>
                                  <img
                                    src={
                                      product.image || "/uploads/default.png"
                                    }
                                    alt={product.name}
                                    className={styles.product_image}
                                  />

                                  <span>{product.name}</span>
                                  {product.price && (
                                    <span>{product.price} ₽</span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                          <button
                            className={`${styles.button} ${styles.archive}`}
                            onClick={() => restorePromoCode(promo.id)}
                          >
                            Вернуть
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <p className={styles.empty}>Архив пуст</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
