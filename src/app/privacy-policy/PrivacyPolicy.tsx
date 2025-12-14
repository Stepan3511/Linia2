import styles from "./PrivacyPolicy.module.scss";

export default function PrivacyPolicy() {
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
          <span>Политика конфиденциальности</span>
        </li>
      </ul>
      <div className={styles.section}>
        <h1 className={styles.title}>Политика конфиденциальности</h1>

        <div className={styles.paragraph}>
          Оставляя данные на сайте, Вы соглашаетесь с Политикой конфиденциальности и даете согласие на обработку персональных данных.
        </div>

        <div className={styles.section_title}>1. Общие положения</div>
        <div className={styles.paragraph}>
          Настоящая Политика в отношении обработки персональных данных разработана в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных» и иными нормативными правовыми актами Российской Федерации.
        </div>

        <div className={styles.section_title}>2. Цели обработки персональных данных</div>
        <ul className={styles.paragraph}>
          <li>Оформление заказов через сайт;</li>
          <li>Обратная связь и обработка запросов пользователей;</li>
          <li>Отправка уведомлений и новостей (с согласия пользователя);</li>
          <li>Аналитика поведения пользователей с помощью сервисов Яндекс.Метрика и top.mail.ru.</li>
        </ul>

        <div className={styles.section_title}>3. Категории и перечень обрабатываемых данных</div>
        <ul className={styles.paragraph}>
          <li>ФИО;</li>
          <li>Контактный номер телефона;</li>
          <li>Адрес доставки;</li>
          <li>Электронная почта;</li>
          <li>IP-адрес, cookie-файлы, данные об активности на сайте.</li>
        </ul>

        <div className={styles.section_title}>4. Категории субъектов персональных данных</div>
        <div className={styles.paragraph}>
          Посетители сайта, оформляющие заказы или оставляющие заявки.
        </div>

        <div className={styles.section_title}>5. Условия и способы обработки</div>
        <div className={styles.paragraph}>
          Обработка персональных данных осуществляется с согласия пользователя, в электронном виде, автоматизированным и неавтоматизированным способом. Хранение данных осуществляется до достижения целей обработки, после чего они подлежат удалению в срок не более 30 дней.
        </div>

        <div className={styles.section_title}>6. Раскрытие данных третьим лицам</div>
        <div className={styles.paragraph}>
          Персональные данные могут передаваться банкам, курьерским службам и другим подрядчикам, если это необходимо для выполнения заказа. Аналитические данные передаются Яндекс.Метрике и top.mail.ru.
        </div>

        <div className={styles.section_title}>7. Безопасность и ответственность</div>
        <div className={styles.paragraph}>
          Сайт обеспечивает защиту персональных данных с использованием соответствующих организационно-технических мер и не несет ответственности за действия третьих лиц, получивших доступ к данным не по вине сайта.
        </div>

        <div className={styles.section_title}>9. Изменения политики</div>
        <div className={styles.paragraph}>
          Оператор оставляет за собой право вносить изменения в настоящую политику. Пользователь должен самостоятельно отслеживать обновления.
        </div>
      </div>
    </div>
  );
}
