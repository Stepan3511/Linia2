import type { Metadata } from "next";
import Thanks from "./Thanks";
import HeaderLogo from "@/components/header-logo/HeaderLogo";

export const metadata: Metadata = {
  title: "«Линия вкуса» | Спасибо за заказ",
};

export default function ThanksPage() {
  return (
    <div>
      <HeaderLogo />
      <Thanks />
    </div>
  );
}
