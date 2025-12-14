"use client";

import { useGetClients } from "@/hooks/clients/useGetClients";
import styles from "./ClientsList.module.scss";
import { IClients } from "@/types/clients.types";

export default function ClientsList() {
  const { data: clients, isLoading, isError } = useGetClients();

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
          <span>Клиенты</span>
        </li>
      </ul>

      <div className={styles.wrapper}>
        <h1 className={styles.title}>Клиенты</h1>

        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ul className={styles.list}>
            {clients?.map((client: IClients) => (
              <li className={styles.item} key={client.id}>
                <div className={styles.item_wrapper}>
                  <div className={styles.item_wrapper_content_email}>
                    <strong>{client.email}</strong>
                  </div>
                  <div className={styles.item_wrapper_content}>
                    {client.promoCodesUsed?.length > 0 ? (
                      <ul className={styles.promo_list}>
                        {client.promoCodesUsed.map((promo) => (
                          <li key={promo.promoCodeId}>
                            🎁{promo.promoCodeName || "Без названия"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className={styles.no_promo}>Нет промокодов!</span>
                    )}
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
