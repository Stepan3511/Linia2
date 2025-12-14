"use client";

import React from "react";
import { ICategory } from "@/types/category.types";
import { IProductCatering } from "@/types/product-catering.types";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

import styles from "./CateringList.module.scss";
import AuthModal from "../auth/auth-modal/AuthModal";
import { useAuthModalStore } from "@/store/authModalStore";
import { useGetUser } from "@/hooks/auth/useGetUser";
import SkeletonLoaderCatering from "../skeleton/skeleton-loader-catering.tsx/SkeletonLoaderCatering";

interface CateringListProps {
  categories: ICategory[];
  products: IProductCatering[];
}

export default function CateringList({
  categories,
  products,
}: CateringListProps) {
  const { cart, addToCart, incrementItem, decrementItem } = useCartStore();
  const { isOpen, openModal, closeModal } = useAuthModalStore();
  const { user, isLoading } = useGetUser();

  if (isLoading) {
    return <SkeletonLoaderCatering />;
  }

  const getProductQuantity = (id: string) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  const sortedCategories = [...categories].sort((a, b) => {
    const posA = a.position ?? 0;
    const posB = b.position ?? 0;
    return posA - posB;
  });

  const handleIncrement = (product: IProductCatering) => {
    if (!user && !isLoading) {
      openModal();
      return;
    }

    if (getProductQuantity(product.id) === 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price || 0,
        quantity: 1,
        minOrder: product.minOrder,
      });
    } else {
      incrementItem(product.id);
    }
  };

  const handleDecrement = (product: IProductCatering) => {
    if (!user && !isLoading) {
      openModal();
      return;
    }

    const quantity = getProductQuantity(product.id);
    if (quantity > 0) {
      decrementItem(product.id);
    }
  };

  return (
    <div className={styles.container}>
      {sortedCategories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.categoryId === category.id
        );

        return (
          <div key={category.id} id={category.id} className={styles.group}>
            <h2 className={styles.group_title}>{category.name}</h2>
            <div className={styles.products}>
              {categoryProducts.map((product) => {
                const quantity = getProductQuantity(product.id);
                const minOrder = product.minOrder || 1;
                const remaining = Math.max(minOrder - quantity, 0);

                return (
                  <div key={product.id} className={styles.product_card}>
                    <div className={styles.product_card_wrapper}>
                      <img
                        src={product.image || "/uploads/catering/default.png"}
                        alt={product.name || "Продукт"}
                        className={styles.product_image}
                      />
                      <div>
                        <span className={styles.product_name}>
                          {product.name}
                        </span>
                        <span className={styles.product_description}>
                          {product.description}
                        </span>
                      </div>
                    </div>
                    <div className={styles.product_bottom_wrapper}>
                      <div className={styles.product_bottom}>
                        <div className={styles.product_weight_price}>
                          {(product.weight ?? 0) > 0 && (
                            <span className={styles.product_weight}>
                              {product.weight} гр.
                            </span>
                          )}
                          <span>
                            <b>{product.price} ₽</b>
                          </span>
                        </div>

                        <div className={styles.quantity_controls}>
                          <button
                            className={styles.quantity_button}
                            onClick={() => handleDecrement(product)}
                          >
                            <Minus className={styles.quantity_button_icon} />
                          </button>
                          <span className={styles.quantity}>{quantity}</span>
                          <button
                            className={styles.quantity_button}
                            onClick={() => handleIncrement(product)}
                          >
                            <Plus className={styles.quantity_button_icon} />
                          </button>
                        </div>
                      </div>
                      {minOrder > 1 && quantity < minOrder && (
                        <p className={styles.min_order_warning}>
                          {quantity === 0
                            ? `Минимальный заказ: ${minOrder}`
                            : `Добавьте ещё ${remaining} шт.`}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              {categoryProducts.length === 0 && (
                <p className={styles.no_products}>Нет товаров</p>
              )}
            </div>
          </div>
        );
      })}
      {isOpen && <AuthModal onClose={closeModal} />}
    </div>
  );
}
