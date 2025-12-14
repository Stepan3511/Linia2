import React from "react";
import { IProductCatering } from "@/types/product-catering.types";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

import styles from "./AddCartList.module.scss";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type AddCartListProps = {
  products: IProductCatering[];
};

const AddCartList: React.FC<AddCartListProps> = ({ products }) => {
  const { cart, addToCart, incrementItem, decrementItem } = useCartStore();

  const getProductQuantity = (id: string) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  const handleIncrement = (product: IProductCatering) => {
    const currentQuantity = getProductQuantity(product.id);
    const minOrder = product.minOrder || 1;

    if (currentQuantity === 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price || 0,
        quantity: minOrder,
        minOrder: product.minOrder,
      });
    } else {
      // Увеличиваем количество на 1
      incrementItem(product.id);
    }
  };

  const handleDecrement = (product: IProductCatering) => {
    if (getProductQuantity(product.id) > 0) {
      decrementItem(product.id);
    }
  };

  return (
    <div className={styles.add_card_container}>
      <Carousel className="w-full">
        <CarouselContent className="flex gap-4">
          {products.length > 0 ? (
            products.map((product) => {
              const quantity = getProductQuantity(product.id);
              const minOrder = product.minOrder || 1;
              const remaining = Math.max(minOrder - quantity, 0);

              return (
                <CarouselItem key={product.id}>
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
                            disabled={quantity <= 0}
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
                </CarouselItem>
              );
            })
          ) : (
            <p className={styles.no_products}>Нет товаров</p>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default AddCartList;
