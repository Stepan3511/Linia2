import type { Metadata } from "next";

import { Footer } from "@/components/footer/Footer";
import Sopd from "./Sopd";
import HeaderLogo from "@/components/header-logo/HeaderLogo";

export const metadata: Metadata = {
  title: "«Линия вкуса» | Согласие на обработку персональных данных",
};

export default function SopdPage() {
  return (
    <div>
      <HeaderLogo />
      <Sopd />
      <Footer />
    </div>
  );
}
