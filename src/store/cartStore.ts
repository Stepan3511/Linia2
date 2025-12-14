import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  minOrder?: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const state = get();
        const existingItem = state.cart.find(
          (cartItem) => cartItem.id === item.id
        );
        const minOrder = item.minOrder || 1;

        if (existingItem) {
          set({
            cart: state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          });
        } else {
          toast.success(
            `${item.name} добавлен в корзину в количестве ${minOrder} шт.`
          );
          set({ cart: [...state.cart, { ...item, quantity: minOrder }] });
        }
      },
      incrementItem: (id) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        })),
      decrementItem: (id) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === id
          );

          if (existingItem) {
            const newQuantity = existingItem.quantity - 1;
            const minOrder = existingItem.minOrder || 1;

            if (newQuantity < minOrder) {
              toast.error(
                `${existingItem.name} удален из корзины, т.к. минимальный заказ не выполнен`
              );
              return {
                cart: state.cart.filter((cartItem) => cartItem.id !== id),
              };
            }

            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === id
                  ? { ...cartItem, quantity: newQuantity }
                  : cartItem
              ),
            };
          }
          return state;
        }),
      removeFromCart: (id) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === id
          );
          if (existingItem) {
            toast.error(`${existingItem.name} удален из корзины`);
          }
          return {
            cart: state.cart.filter((item) => item.id !== id),
          };
        }),
      clearCart: () =>
        set(() => {
          toast.success("Корзина очищена");
          return { cart: [] };
        }),
    }),
    {
      name: "cart-storage", // имя ключа в localStorage
    }
  )
);
