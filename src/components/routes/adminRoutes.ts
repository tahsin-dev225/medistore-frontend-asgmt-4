import { Route } from "@/types";


export const AdminRoute: Route[] =[
    {
      title: "Admin Dashboard",
      items: [
        {
          title: "User Management",
          url: "/user-management",
        },
        {
          title: "Manage Medicine",
          url: "/manage-medicine",
        },
        {
          title: "Manage Order",
          url: "/manage-order",
        },
        {
          title: "Manage Category",
          url: "/manage-category",
        },
      ],
    },
  ]