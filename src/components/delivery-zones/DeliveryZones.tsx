import React from "react";
import styles from "./DeliveryZones.module.scss";

export default function DeliveryZones() {
  return (
    <section className={styles.delivery_zones}>
      <div className={styles.container}>
        {/* Заголовок секции */}
        <span className={styles.title}>Бесплатная доставка</span>

        {/* Список зон доставки */}
        <ul className={styles.delivery_list}>
          <li>
            <span className={styles.zone}>
              Центральный район - Бесплатная доставка от{" "}
              <span className={styles.zone_span}>1200 ₽</span>
            </span>
          </li>
          <li>
            <span className={styles.zone}>
              <span>
                Антипиха и Песчанка За Ингода - Бесплатная доставка от{" "}
              </span>
              <span className={styles.zone_span}>4000 ₽</span>
            </span>
          </li>
          <li>
            <span className={styles.zone}>
              Каштак и Смоленка - Бесплатная доставка от{" "}
              <span className={styles.zone_span}>5000 ₽</span>
            </span>
          </li>
          <li>
            <span className={styles.zone}>
              Черновской и железнодорожный район - Бесплатная доставка от{" "}
              <span className={styles.zone_span}>5000 ₽</span>
            </span>
          </li>
          <li>
            <span className={styles.zone}>
              Бесплатную доставку по Забайкальскому краю или другие отдаленные
              районы можно{" "}
              <span className={styles.zone_span}>уточнить у оператора.</span>
            </span>
          </li>
        </ul>

        {/* Заголовок карты */}
        <span className={styles.title}>Зоны доставки на карте</span>

        {/* Карта с техникой скрытия шапки */}
        <div className={styles.map_container}>
          <div className={styles.map_wrapper}>
            <iframe
              className={styles.map_frame}
              src="https://www.google.com/maps/d/embed?mid=1-AEz8lCYO7kFbuWrXqiwO9qrXfSQ5UE&ehbc=2E312F"
              width="100%"
              height="480"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Зоны доставки на карте"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
