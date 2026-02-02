import { Route } from "@/types";


export const SellerRoute: Route[] =[
    {
      title: "Seller Dashboard",
      items: [
        {
          title: "Dashboard",
          url: "/seller-dashboard",
        },
        {
          title: "Add Medicine",
          url: "/seller-dashboard/add-medicine",
        },
        {
          title: "Manage seller order",
          url: "/seller-dashboard/manage-order",
        },
        {
          title: "Manage seller medicine",
          url: "/seller-dashboard/manage-medicine",
        },
      ],
    },
  ]