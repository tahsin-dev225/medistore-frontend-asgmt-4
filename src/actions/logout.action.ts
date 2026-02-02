"use server"

import { authClient } from "@/lib/auth-client";


export const logOutUser = async () =>{
  return  await authClient.signOut();
}