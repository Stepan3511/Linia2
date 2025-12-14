import type { Metadata } from "next";

import { Footer } from "@/components/footer/Footer";
import UsloviyaHraneniya from "./UsloviyaHraneniya";
import HeaderLogo from "@/components/header-logo/HeaderLogo";

export const metadata: Metadata = {
  title: "«Линия вкуса» | Условия хранения и употребления",
};

export default function UsloviyaHraneniyaPage() {
  return (
    <div>
      <HeaderLogo />
      <UsloviyaHraneniya />
      <Footer />
    </div>
  );
}
