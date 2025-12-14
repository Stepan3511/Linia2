import styles from "./SkeletonLoaderCatering.module.scss";

export default function SkeletonLoaderCatering() {
  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}></div>
      <div className={styles.column}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.cardCatering}>
            <div className={styles.leftBlock}>
              <div className={styles.imageSmall} />
              <div className={styles.textBlock}>
                <div className={styles.title} />
                <div className={styles.subtitleOrange} />
              </div>
            </div>
            <div className={styles.rightBlock}>
              <div className={styles.priceWeight} />
              <div className={styles.controls}>
                <div className={styles.buttonCircle} />
                <div className={styles.quantityBar} />
                <div className={styles.buttonCircle} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
