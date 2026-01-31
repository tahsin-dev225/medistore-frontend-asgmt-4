import { NextRequest, NextResponse } from "next/server"
import { userService } from "./components/service/user.service";
import { Roles } from "./components/constrants/roles";



export const proxy =async (request : NextRequest) =>{
  const pathName = request.nextUrl.pathname;

  let isAUthenticated = false;
  let isAdmin = false;
  let isSeller = false;

  const {data } = await userService.getSession();
  console.log('session',data);

  if(data){
    isAUthenticated = true;
    isAdmin = data.user.role === Roles.admin;
    isSeller = data.user.role === Roles.seller;
  }

  if(!isAUthenticated){
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if(isAdmin &&  pathName.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/admin-dashboard", request.url))
  }

  if(isSeller &&  pathName.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/seller-dashboard", request.url))
  }

  if(!isAdmin &&  pathName.startsWith("/admin-dashboard")){
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }


  console.log(request.url);
  return NextResponse.next()
}

export const config = {
  matcher : [
    "/dashboard","/dashboard/:path*", 
    "/seller-dashboard", "/seller-dashboard/:path*",
    "/admin-dashboard", "/admin-dashboard/:path*",
  ]
}