import Link from "next/link";
import Image from "next/image";
import styles from "./HeaderLogo.module.scss";

export default function HeaderLogo() {
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
        </div>
      </div>
    </header>
  );
}
