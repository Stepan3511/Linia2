import type { Metadata } from "next";
import Checkout from "./Checkout";
import { Footer } from "@/components/footer/Footer";
import HeaderLogo from "@/components/header-logo/HeaderLogo";

export const metadata: Metadata = {
  title: "«Линия вкуса» | Оформление заказа",
};

export default function CheckoutPage() {
  return (
    <div>
      <HeaderLogo />
      <Checkout />
    </div>
  );
}
