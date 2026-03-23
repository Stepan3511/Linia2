import type { Metadata } from "next";
import OrderError from "./OrderError";
import HeaderLogo from "@/components/header-logo/HeaderLogo";

export const metadata: Metadata = {
  title: "«Линия вкуса» | Ошибка заказа",
};

export default function OrderErrorPage() {
  return (
    <div>
      <HeaderLogo />
      <OrderError />
    </div>
  );
}
