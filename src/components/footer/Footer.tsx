import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import ScrollToTop from "../scroll-to-top/ScrollToTop";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className="flex justify-between">
          <div className={styles.contact_section}>
            <span className={styles.contact_title}>Телефон доставки</span>
            <div className="pt-1 flex items-center mb-6">
              <Link href="tel:+79248053355" className={styles.contact_link}>
                +7 (924) 805-33-55
              </Link>
            </div>
            <span className={styles.contact_title}>
              Телефон организации кейтеринга
            </span>
            <div className="pt-1 flex items-center mb-6">
              <Link href="tel:+79141315718" className={styles.contact_link}>
                +7 (914) 131-57-18
              </Link>
            </div>
            <div>
              <span className={styles.contact_title}>
                Напишите свой отзыв лично руководителю
              </span>
              <div className="flex items-center pt-1">
                <div className={styles.social_links}>
                  <Link href="https://wa.me/+79141315718" target="_blank">
                    <Image
                      src="/images/wa.svg"
                      alt="Ватсап"
                      width={30}
                      height={30}
                      className={styles.social_icon}
                    />
                  </Link>
                  <Link href="https://t.me/+79141315718" target="_blank">
                    <Image
                      src="/images/tg.svg"
                      alt="Телеграм"
                      width={30}
                      height={30}
                      className={styles.social_icon}
                    />
                  </Link>
                </div>
                <Link
                  href="tel:+79141315718"
                  className={`${styles.contact_link} ml-[10px]`}
                >
                  +7 (914) 131-57-18
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer_bottom}>
          <div className={styles.bottom_section}>
            <div className={styles.bottom_links}>
              <div className={styles.footer_text}>
                «Линия вкуса» © {new Date().getFullYear()}
              </div>
              <Link href="/oferta/" className={styles.bottom_link}>
                Публичная оферта
              </Link>
              <Link href="/privacy-policy/" className={styles.bottom_link}>
                Политика конфиденциальности
              </Link>
              <Link href="/usloviya-hraneniya/" className={styles.bottom_link}>
                Условия хранения и употребления
              </Link>
            </div>
            <div className={styles.social_links_wrapper}>
              <div className={styles.social_links}>
                <Link href="https://wa.me/+79141315718" target="_blank">
                  <Image
                    src="/images/wa.svg"
                    alt="Ватсап"
                    width={30}
                    height={30}
                    className={styles.social_icon}
                  />
                </Link>
                <Link href="https://t.me/+79141315718" target="_blank">
                  <Image
                    src="/images/tg.svg"
                    alt="Телеграм"
                    width={30}
                    height={30}
                    className={styles.social_icon}
                  />
                </Link>
                <Link href="https://vk.com/liniya_vkusa" target="_blank">
                  <Image
                    src="/images/vk.svg"
                    alt="Вконтакте"
                    width={30}
                    height={30}
                    className={styles.social_icon}
                  />
                </Link>
              </div>
              <div>
                <span className={styles.contact_title}>
                  Скачайте приложение
                </span>
                <div className={styles.app_links_wrapper}>
                  <Link
                    href="https://play.google.com/store/apps/details?id=ru.geo.ppmobile.liniyavkusa"
                    target="_blank"
                  >
                    <Image
                      src="/images/google-play.svg"
                      alt="google play"
                      width={40}
                      height={40}
                      className={styles.app_links}
                    />
                  </Link>
                  <Link
                    href="https://apps.apple.com/ru/app/линия-вкуса-доставка-еды/id6462980757"
                    target="_blank"
                  >
                    <Image
                      src="/images/app-store.svg"
                      alt="app storeе"
                      width={40}
                      height={40}
                      className={styles.app_links}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className={`${styles.footer_text} ${styles.footer_notice}`}>
            Мы используем cookies для быстрой и удобной работы сайта. <br />
            <br />
            Продолжая пользоваться сайтом, вы принимаете условия обработки
            персональных данных
            <br />
            <br />
            Индивидуальный предприниматель: Слепченко Александр Юрьевич <br />
            ОГРНИП 313753634300050, ИНН 753614189925
          </p>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
};
