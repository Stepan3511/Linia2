import React from "react";
import { useCartStore } from "@/store/cartStore";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, Minus, ShoppingCart } from "lucide-react";

import styles from "./CartDrawer.module.scss";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import AddCartList from "../add-cart-list/AddCartList";
import { useGetDeliveryProducts } from "@/hooks/product-delivery/useGetDeliveryProducts";
import { useGetCateringProducts } from "@/hooks/product-catering/useGetCateringProducts";
import { IProductDelivery } from "@/types/product-delivery.types";
import { IProductCatering } from "@/types/product-catering.types";
import { PUBLIC_URL } from "@/config/url.config";
import PromoCodeInput from "@/components/promo-code/PromoCodeInput";
import { usePromoStore } from "@/store/promoStore";

const CartDrawer: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const setPromoCode = usePromoStore((state) => state.setPromoCode);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { push } = useRouter();
  const pathname = usePathname();

  const deliveryQuery = useGetDeliveryProducts();
  const cateringQuery = useGetCateringProducts();

  const deliveryProducts: IProductDelivery[] = deliveryQuery.data ?? [];
  const cateringProducts: IProductCatering[] = cateringQuery.data ?? [];

  let filteredProducts: (IProductDelivery | IProductCatering)[] = [];

  if (pathname === "/") {
    filteredProducts = [
      ...deliveryProducts.filter((product) => product.deliveryCart),
      ...cateringProducts.filter((product) => product.deliveryCart),
    ];
  } else if (pathname === "/catering") {
    filteredProducts = [
      ...deliveryProducts.filter((product) => product.cateringCart),
      ...cateringProducts.filter((product) => product.cateringCart),
    ];
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={styles.cart}>
          <ShoppingCart className={styles.icon} />
          <span className={styles.total}>{totalAmount} ₽</span>
          {cart.length > 0 && (
            <span className={styles.badge}>{cart.length}</span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] flex flex-col justify-between"
      >
        <div
          className={cn(
            styles.items_wrapper,
            "custom-scroll-cart scrollbar-hide"
          )}
        >
          <SheetTitle className={styles.cart_title}>Корзина</SheetTitle>
          <div className={styles.items_сontainer}>
            {cart.length > 0 ? (
              <PromoCodeInput
                totalAmount={totalAmount}
                onApply={(promo) => setPromoCode(promo)}
              />
            ) : (
              ""
            )}
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div>
                    <h3 className={styles.item_info}>{item.name}</h3>
                    <p className={styles.item_price}>{item.price} ₽ / шт.</p>
                  </div>
                  <div className={styles.quantity_wrapper}>
                    <div className={styles.quantity_control}>
                      <button
                        onClick={() => decrementItem(item.id)}
                        className={styles.control_button}
                      >
                        <Minus size={16} />
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        onClick={() => incrementItem(item.id)}
                        className={styles.control_button}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className={styles.item_price}>
                      {item.price * item.quantity} ₽
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.cart_empty}>Ваша корзина пуста.</p>
            )}
          </div>
        </div>
        <div>
          {cart.length > 0 && (
            <div className={styles.total_wrapper}>
              <div>
                <span className={styles.add_cart_title}>Рекомендуем</span>
                <AddCartList products={filteredProducts} />
              </div>

              <ul className={styles.delivery_list}>
                <span className={styles.delivery_list_title}>
                  Бесплатная доставка:
                </span>
                <li>
                  <span className={styles.zone}>
                    - Центральный район от 1200 ₽
                  </span>
                </li>
                <li>
                  <span className={styles.zone}>
                    - Антипиха/Песчанка/За Ингода от 4000 ₽
                  </span>
                </li>
                <li>
                  <span className={styles.zone}>
                    - Каштак/Смоленка от 5000 ₽
                  </span>
                </li>
                <li>
                  <span className={styles.zone}>
                    - Черновской/Железнодорожный район от 5000 ₽
                  </span>
                </li>
              </ul>
              <div className={styles.action_buttons}>
                <button
                  onClick={() => {
                    clearCart();
                    setPromoCode(null);
                  }}
                  className={styles.clear_cart_button}
                >
                  Очистить корзину
                </button>
              </div>
              <div className={styles.total_content}>
                <span className={styles.total_summary}>Итого:</span>
                <span className={styles.total_price}>{totalAmount} ₽</span>
              </div>
              {totalAmount < 1200 && (
                <p className={styles.min_order_message}>
                  Минимальная сумма заказа 1200 руб.
                </p>
              )}
              <button
                className={`${styles.checkout_button} ${
                  totalAmount >= 1200
                    ? styles.checkout_button_enabled
                    : styles.checkout_button_disabled
                }`}
                disabled={totalAmount < 1200}
                onClick={() => push(PUBLIC_URL.checkout())}
              >
                Оформить заказ
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
