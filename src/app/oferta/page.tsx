import type { Metadata } from "next";

import { Footer } from "@/components/footer/Footer";
import Oferta from "./Oferta";
import HeaderLogo from "@/components/header-logo/HeaderLogo";

export const metadata: Metadata = {
  title: "«Линия вкуса» | Публичная оферта",
};

export default function OfertaPage() {
  return (
    <div>
      <HeaderLogo />
      <Oferta />
      <Footer />
    </div>
  );
}
