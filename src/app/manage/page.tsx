import type { Metadata } from "next";

import Manage from "./Manage";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Панель управления",
  ...NO_INDEX_PAGE,
};

export default function ManagePage() {
  return (
    <div>
      <Manage />
    </div>
  );
}
