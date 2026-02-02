import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Route } from "@/types";
import { AdminRoute } from "../routes/adminRoutes";
import { CustomerRoute } from "../routes/customerRoutes";
import { SellerRoute } from "../routes/sellerRoutes";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user.role) {
    case "ADMIN":
      routes = AdminRoute;
      break;
    case "CUSTOMER":
      routes = CustomerRoute;
      break;
    case "SELLER":
      routes = SellerRoute;
      break;

    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <Link href="/" className="flex py-3.5 px-2.5 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
            +
          </span>
          <span className="text-xl font-bold text-gray-900">
            Med<span className="text-emerald-500">store</span>
          </span>
        </Link>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
