import { Route } from "@/types";


export const AdminRoute: Route[] =[
    {
      title: "Admin Dashboard",
      items: [
        {
          title: "User Management",
          url: "/admin-dashboard/user-management",
        },
        {
          title: "Manage Medicine",
          url: "/admin-dashboard/manage-medicine",
        },
        {
          title: "Manage Order",
          url: "/admin-dashboard/manage-order",
        },
        {
          title: "Manage Category",
          url: "/admin-dashboard/manage-category",
        },
      ],
    },
  ]