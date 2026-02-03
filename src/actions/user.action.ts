"use server"

import { userService } from "@/components/service/user.service";



export const getUsers = async () =>{
  return  await userService.getSession();
}