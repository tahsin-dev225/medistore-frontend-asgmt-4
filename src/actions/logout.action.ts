"use server"

import { authClient } from "@/lib/auth-client";


export const logOutUser = async () =>{
  console.log('logout clicked');
  return  await authClient.signOut();
}