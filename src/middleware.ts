import { type NextRequest, NextResponse } from "next/server";

import { MANAGE_URL, PUBLIC_URL } from "./config/url.config";
import { EnumTokens } from "./services/admin/auth-token.service";
import { userService } from "./services/user.service";
import { UserAdminRole } from "./types/admin-user.types";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(
    EnumTokens.REFRESH_TOKEN_ADMIN
  )?.value;
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN_ADMIN)?.value;

  const isAuthAdminPage = request.url.includes(PUBLIC_URL.admin());
  const isAdminPage = request.url.includes(MANAGE_URL.root());

  if (isAuthAdminPage) {
    if (refreshToken && accessToken) {
      return NextResponse.redirect(new URL(MANAGE_URL.root(), request.url));
    }

    return NextResponse.next();
  }

  if (refreshToken === undefined) {
    return NextResponse.rewrite(
      new URL(isAdminPage ? "/404" : PUBLIC_URL.admin(), request.url)
    );
  }

  try {
    const profile = await userService.getProfileMiddleware(refreshToken);

    if (profile.role === UserAdminRole.ADMIN) {
      return NextResponse.next();
    }

    if (isAdminPage) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    request.cookies.delete(EnumTokens.REFRESH_TOKEN_ADMIN);
    return NextResponse.redirect(new URL(PUBLIC_URL.admin(), request.url));
  }
}

export const config = {
  matcher: ["/manage/:path*", "/admin"],
};
