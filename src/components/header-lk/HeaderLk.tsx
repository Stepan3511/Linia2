import Link from "next/link";
import Image from "next/image";
import styles from "./HeaderLk.module.scss";
import HeaderLoginFormLk from "../auth/header-login-form-lk/HeaderLoginFormLk";
import { PUBLIC_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";

export default function HeaderLogo() {
  const { push } = useRouter();
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
          <div className={styles.menu_wrapper}>
            <button
              className={styles.button}
              onClick={() => push(PUBLIC_URL.home())}
            >
              Основное меню
            </button>
            <button
              className={styles.button}
              onClick={() => push(PUBLIC_URL.catering())}
            >
              Заказать фуршет
            </button>
            <HeaderLoginFormLk />
          </div>
        </div>
      </div>
    </header>
  );
}
