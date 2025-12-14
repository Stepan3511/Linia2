import styles from "./SkeletonLoader.module.scss";

export default function SkeletonLoaderDelivery() {
  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}></div>
      <div className={styles.products}>
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.image} />
            <div className={styles.textBlock}>
              <div className={styles.title} />
              <div className={styles.subtitle} />
              <div className={styles.weight} />
            </div>
            <div className={styles.footer}>
              <div className={styles.price} />
              <div className={styles.button} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
