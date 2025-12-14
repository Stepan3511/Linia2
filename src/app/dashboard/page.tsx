"use client";

import { useGetUser } from "@/hooks/auth/useGetUser";
import { useOrderHistory } from "@/hooks/order/useOrderHistory";
import HeaderLk from "@/components/header-lk/HeaderLk";
import styles from "./Dashboard.module.scss";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function Dashboard() {
  const { user, isLoading: isUserLoading, error } = useGetUser();
  const { orders, isLoading: isOrdersLoading } = useOrderHistory();

  return (
    <div className={styles.wrapper}>
      <HeaderLk />
      <div className={styles.container}>
        {isUserLoading || isOrdersLoading ? (
          <p className={styles.error}>Загрузка...</p>
        ) : error ? (
          <p className={styles.error}>Ошибка: {error.message}</p>
        ) : (
          <div className={styles.content}>
            <h1 className={styles.title}>Личный кабинет</h1>
            <div className={styles.email}>Добро пожаловать {user?.email}</div>

            <h2 className={styles.ordersTitle}>История заказов</h2>
            {orders && orders.length > 0 ? (
              <ul className={styles.ordersList}>
                {orders?.map((order) => (
                  <li key={order.id} className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                      <span>
                        Заказ на <b>{order.totalAmount} ₽</b>
                      </span>
                      <span className={styles.date}>
                        {format(
                          new Date(order.createdAt),
                          "d MMMM yyyy, HH:mm",
                          {
                            locale: ru,
                          }
                        )}
                      </span>
                    </div>

                    <ul className={styles.products}>
                      {order.items.map((item) => (
                        <li key={item.id} className={styles.product}>
                          {item.name} — {item.quantity} шт × {item.price} ₽ ={" "}
                          <b>{item.quantity * item.price} ₽</b>
                        </li>
                      ))}
                    </ul>

                    {order.promoCode?.products?.length ? (
                      <div className={styles.giftBlock}>
                        <span className={styles.giftLabel}>🎁 Подарок:</span>
                        <ul className={styles.giftList}>
                          {order.promoCode.products!.map((gift) => (
                            <li key={gift.id} className={styles.giftItem}>
                              <img
                                src={gift.image || "/uploads/default.png"}
                                alt={gift.name}
                                className={styles.giftImage}
                              />
                              <span>{gift.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p> Заказов нет! </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
