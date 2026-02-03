import { Route } from "@/types";


export const CustomerRoute: Route[] =[
    {
      title: "Customer Dashboard",
      items: [
        {
          title: "My Order",
          url: "/dashboard/my-order",
        },
        {
          title: "My Profile",
          url: "/dashboard/my-profile",
        },
      ],
    },
  ]