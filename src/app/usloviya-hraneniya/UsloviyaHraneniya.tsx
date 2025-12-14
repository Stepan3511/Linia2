import styles from "./UsloviyaHraneniya.module.scss";

export default function UsloviyaHraneniya() {
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
          <span>Условия хранения и употребления</span>
        </li>
      </ul>
      <div className={styles.section}>
        <h1 className={styles.title}>Условия хранения и употребления</h1>
        <div className={styles.paragraph}>
          Вся представленная на данном сайте готовая пищевая продукция,
          производится в соответствии с нормами СанПиН 2.3.2.1324-03
          «Гигиенические требования к срокам годности и условиям хранения
          пищевых продуктов»
        </div>

        <div className={styles.paragraph}>
          Рекомендации по употреблению: продукция готова к употреблению и не
          требует дополнительной обработки. Срок годности готовой продукции при
          температуре от +2 до +4 — 12 (двенадцать) часов с момента
          изготовления, при относительной влажности не более 85%
        </div>
        <div className={styles.paragraph}>
          Дата и время производства готовой продукции указаны в чеке.
        </div>
        <div className={styles.paragraph}>
          Готовая продукция может не значительно отличатся от представленной на
          фото в меню.
        </div>
        <div className={styles.paragraph}>
          При выдаче готовых блюд вес, указанный в меню, может отличаться в
          диапазоне от 10% до 15%
        </div>
      </div>
    </div>
  );
}
