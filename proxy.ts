import { NextRequest, NextResponse } from "next/server";
import { userService } from "./src/components/service/user.service";
import { Roles } from "./src/components/constrants/roles";

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

  // Customer
  if (role === Roles.customer) {
    if (!pathName.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Admin
  if (role === Roles.admin) {
    if (!pathName.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  // Seller
  if (role === Roles.seller) {
    if (!pathName.startsWith("/seller-dashboard")) {
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard", 
    "/dashboard/:path*", 
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};

