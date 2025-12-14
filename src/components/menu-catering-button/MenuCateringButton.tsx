"use client";

import React from "react";
import styles from "./MenuCateringButton.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuCateringButton() {
  const pathname = usePathname();

  return (
    <div className={styles.menu_buttons}>
      <Link
        href="/"
        className={`${styles.menu_button} ${
          pathname === "/" ? styles.active : ""
        }`}
      >
        Основное меню
      </Link>
      <Link
        href="/catering"
        className={`${styles.menu_button} ${
          pathname === "/catering" ? styles.active : ""
        }`}
      >
        Заказать фуршет
      </Link>
    </div>
  );
}
