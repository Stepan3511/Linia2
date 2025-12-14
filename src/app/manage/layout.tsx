import { FC, PropsWithChildren } from "react";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import HeaderLogo from "@/components/header-logo/HeaderLogo";

export const metadata: Metadata = {
  title: "Панель управления",
  ...NO_INDEX_PAGE,
};

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div>
      <HeaderLogo />
      {children}
    </div>
  );
};

export default Layout;
