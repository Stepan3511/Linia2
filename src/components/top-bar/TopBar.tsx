"use client";

import React from "react";
import { ICategory } from "@/types/category.types";
import CartDrawer from "../cart/cart-drawer/CartDrawer";
import { cn } from "@/lib/utils";

import styles from "./TopBar.module.scss";

interface TopBarProps {
  categories: ICategory[];
}

export default function TopBar({ categories }: TopBarProps) {
  const [cartVisible, setCartVisible] = React.useState(false);

  const sortedCategories = [...categories].sort((a, b) => {
    const posA = a.position ?? 0;
    const posB = b.position ?? 0;
    return posA - posB;
  });

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setCartVisible(true);
      } else {
        setCartVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.topbar_wrapper}>
      <div className={styles.container}>
        <nav className={styles.topbar}>
          <ul className={cn(styles.menu, "custom-scroll scrollbar-hide")}>
            {sortedCategories.map((category) => (
              <li key={category.id} className={styles.menu_item}>
                <a href={`#${category.id}`} className={styles.menu_link}>
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.cart_wrapper}>
            {cartVisible && <CartDrawer />}
          </div>
        </nav>
      </div>
    </div>
  );
}
