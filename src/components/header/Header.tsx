import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import CartDrawer from "../cart/cart-drawer/CartDrawer";
import MenuCateringButton from "../menu-catering-button/MenuCateringButton";
import HeaderLoginForm from "../auth/header-login-form/HeaderLoginForm";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header_wrapper}>
          <Link href="/">
            <div className={styles.image_wrapper}>
              <Image
                src="/images/logo-black.svg"
                alt="Logo"
                width={129}
                height={70}
              />
            </div>
          </Link>
          <div>
            <div className={styles.content}>
              <div className={styles.worktime_wrapper}>
                <span>Прием заказов: с 9:00 до 21:00</span>
                <div className={styles.adress_wrapper}>
                  <span>г. Чита, ул. Бабушкина, 104.</span>
                  <span>
                    Тел:{" "}
                    <Link
                      href="tel:+79248053355"
                      className={styles.contact_link}
                    >
                      +7 (924) 805-33-55
                    </Link>
                  </span>
                </div>
                <HeaderLoginForm />
              </div>
            </div>
            <div className={styles.cart_wrapper}>
              <div className={styles.cart_text}>
                Доставка бесплатно от 1200 ₽
              </div>
              <div className={styles.cart_wrapper_menu}>
                <MenuCateringButton />
                <div className={styles.cart_drawer}>
                  <CartDrawer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
