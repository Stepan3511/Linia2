"use client";

import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.scss";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import DeliveryForm from "@/components/checkout-form/delivery-form/DeliveryForm";
import PickupForm from "@/components/checkout-form/pickup-form/PickupForm";
import { PUBLIC_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import { usePromoStore } from "@/store/promoStore";

export default function Checkout() {
  const { cart, clearCart } = useCartStore();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [isDelivery, setIsDelivery] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const promoCode = usePromoStore((state) => state.promoCode);
  const setPromoCode = usePromoStore((state) => state.setPromoCode);

  const handleToggle = (delivery: boolean) => {
    setIsDelivery(delivery);
  };

  const validateForm = (isValid: boolean, data: any) => {
    setIsFormValid(isValid);
    setFormData(data);
    setPaymentMethod(data.paymentMethod || "cash");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOrder, isLoadingCreate } = useCreateOrder();
  const handleOrder = async () => {
    if (isSubmitting || isLoadingCreate) return;

    setIsSubmitting(true);

    try {
      // 1. Собираем данные для создания заказа
      const orderItems = cart.map((item) => ({
        productId: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      }));

      const orderTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      console.log({
        items: orderItems,
        totalAmount: orderTotal,
      });

      // 2. Отправляем заказ на бэкенд
      await new Promise((resolve, reject) => {
        createOrder(
          {
            items: orderItems,
            totalAmount: orderTotal,
            promoCodeId: promoCode?.id || undefined,
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            deliveryOption: formData.deliveryOption,
            isDelivery,
            paymentMethod,
          },
          {
            onSuccess: resolve,
            onError: reject,
          }
        );
      });

      // 3. Чистим корзину и редиректим
      setIsOrderPlaced(true);
      clearCart();
      setPromoCode(null);
      push(PUBLIC_URL.thanks());
    } catch (error) {
      console.error(error);
      push("/order-error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { push } = useRouter();

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
          <span>Оформлении заказа</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        {totalAmount < 1200 && !isOrderPlaced ? (
          <div className={styles.alert}>
            <p>
              Минимальная сумма заказа — 1200 ₽, у вас в корзине на{" "}
              <b>{totalAmount} ₽</b>.
            </p>
            <Link href="/" className={styles.link}>
              Продолжить покупки
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.forms}>
              <div className={styles.button_group}>
                <button
                  className={`${styles.toggle_button} ${
                    isDelivery ? styles.active : ""
                  }`}
                  onClick={() => handleToggle(true)}
                >
                  Доставка
                </button>
                <button
                  className={`${styles.toggle_button} ${
                    !isDelivery ? styles.active : ""
                  }`}
                  onClick={() => handleToggle(false)}
                >
                  Самовывоз
                </button>
              </div>
              {isDelivery ? (
                <DeliveryForm
                  onValidate={(isValid, data) => validateForm(isValid, data)}
                />
              ) : (
                <PickupForm
                  onValidate={(isValid, data) => validateForm(isValid, data)}
                />
              )}
            </div>
            <div className={styles.cart_summary}>
              <div>
                <p className={styles.cart_summary_bold}>
                  Количество товаров: {totalQuantity}
                </p>
                <div className={styles.cart_items}>
                  {cart.map((item) => (
                    <div key={item.id} className={styles.cart_item}>
                      <p>{item.name}</p>
                      <p>
                        {item.quantity} шт. × {item.price} ₽ ={" "}
                        {item.quantity * item.price} ₽
                      </p>
                    </div>
                  ))}
                </div>
                {promoCode?.products && promoCode.products.length > 0 && (
                  <div className={styles.cart_gift}>
                    <p className={styles.cart_summary_bold}>🎁 Подарок:</p>
                    <ul>
                      {promoCode.products.map((gift) => (
                        <li key={gift.id} className={styles.cart_gift_item}>
                          {gift.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className={styles.cart_summary_bold}>
                  Сумма: {totalAmount} ₽
                </p>
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <div>
                <input
                  type="checkbox"
                  id="agreement"
                  name="agreement"
                  required
                  className={styles.agreement_checkbox}
                  onChange={(e) => setIsFormValid(e.target.checked)}
                />
                <label htmlFor="agreement" className={styles.agreement_label}>
                {" "} Я согласен на <a style={{color: "blue"}} href="/sopd">обработку моих персональных данных</a> в соответствии с <a style={{color: "blue"}} href="/privacy-policy">политикой конфиденциальности</a>
                </label>
                </div>
                <button
                className={styles.order_button}
                disabled={!isFormValid}
                onClick={handleOrder}
              >
                Заказать
              </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
