import type { Metadata } from "next";

import { Footer } from "@/components/footer/Footer";
import PrivacyPolicy from "./PrivacyPolicy";
import HeaderLogo from "@/components/header-logo/HeaderLogo";

export const metadata: Metadata = {
  title: "«Линия вкуса» | Политика конфиденциальности",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <HeaderLogo />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}
