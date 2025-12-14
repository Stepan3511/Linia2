"use client";

import React, { useState } from "react";
import { ICategory } from "@/types/category.types";
import { IProductDelivery } from "@/types/product-delivery.types";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

import styles from "./DeliveryList.module.scss";
import AuthModal from "../auth/auth-modal/AuthModal";
import { useAuthModalStore } from "@/store/authModalStore";
import { useGetUser } from "@/hooks/auth/useGetUser";
import SkeletonLoaderDelivery from "../skeleton/skeleton-loader-delivery/SkeletonLoaderDelivery";

interface DeliveryListProps {
  categories: ICategory[];
  products: IProductDelivery[];
}

export default function DeliveryList({
  categories,
  products,
}: DeliveryListProps) {
  const { cart, addToCart, incrementItem, decrementItem } = useCartStore();

  const getProductQuantity = (id: string) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  const sortedCategories = [...categories].sort((a, b) => {
    const posA = a.position ?? 0;
    const posB = b.position ?? 0;
    return posA - posB;
  });

  const { isOpen, openModal, closeModal } = useAuthModalStore();
  const { user, isLoading } = useGetUser();

  if (isLoading) {
    return <SkeletonLoaderDelivery />;
  }

  const handleAddToCart = (product: IProductDelivery) => {
    if (!user && !isLoading) {
      openModal();
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      quantity: 1,
    });
  };

  return (
    <div className={styles.container}>
      {sortedCategories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.categoryId === category.id
        );

        return (
          <div key={category.id} id={category.id} className={styles.group}>
            <h3 className={styles.group_title}>{category.name}</h3>
            <div className={styles.products}>
              {categoryProducts.map((product) => {
                const quantity = getProductQuantity(product.id);

                return (
                  <div key={product.id} className={styles.product_card}>
                    <div>
                      <div className={styles.product_img_rounded}>
                        <div className={styles.product_img_wrapper}>
                          <img
                            src={
                              product.image || "/uploads/catering/default.png"
                            }
                            alt={product.name || "Продукт"}
                            className={styles.product_image}
                          />
                        </div>
                      </div>
                      <div>
                        <span className={styles.product_name}>
                          {product.name}
                        </span>
                        <span className={styles.product_description}>
                          {product.description}
                        </span>
                        {(product.pieces ?? 0) > 0 ||
                        (product.weight ?? 0) > 0 ? (
                          <div className={styles.product_weight_pieces}>
                            {(product.pieces ?? 0) > 0 && (
                              <span className={styles.product_pieces}>
                                {product.pieces} шт
                                {(product.weight ?? 0) > 0 && <span>,</span>}
                              </span>
                            )}

                            {(product.weight ?? 0) > 0 && (
                              <span className={styles.product_weight}>
                                {product.weight} гр.
                              </span>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className={styles.product_bottom}>
                      <span>
                        <b>{product.price} ₽</b>
                      </span>

                      {quantity > 0 ? (
                        <div className={styles.quantity_controls}>
                          <button
                            className={styles.quantity_button}
                            onClick={() => decrementItem(product.id)}
                          >
                            <Minus className={styles.quantity_button_icon} />
                          </button>
                          <span className={styles.quantity}>{quantity}</span>
                          <button
                            className={styles.quantity_button}
                            onClick={() => incrementItem(product.id)}
                          >
                            <Plus className={styles.quantity_button_icon} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className={styles.product_button}
                          onClick={() => handleAddToCart(product)}
                        >
                          <Plus className={styles.product_button_icon} />
                          Добавить
                        </button>
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
