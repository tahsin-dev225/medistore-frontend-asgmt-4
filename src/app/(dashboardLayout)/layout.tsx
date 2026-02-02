import { AppSidebar } from "@/components/layout/app-sidebar";
import { userService } from "@/components/service/user.service";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function DashboardLayout({
  admin,
  customer,
  seller,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  customer: React.ReactNode;
  seller: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  console.log(data);

  return (
    <SidebarProvider>
      <AppSidebar user={data?.user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {data?.user?.role === "ADMIN" && admin}
          {data?.user?.role === "CUSTOMER" && customer}
          {data?.user?.role === "SELLER" && seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
