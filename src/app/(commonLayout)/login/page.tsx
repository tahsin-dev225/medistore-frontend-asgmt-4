import { LoginForm } from "@/components/modules/authentication/login-form";
import Image from "next/image";

<div className="flex min-h-svh w-full gap-[50%] mx-auto items-center justify-center p-6 md:p-10">
  <div className="w-full">
    <LoginForm className=" max-w-sm mx-auto" />
  </div>
  <div className="w-full">
    <Image src={"/img/login-trans.png"} height={450} width={500} alt="login" />
  </div>
</div>;
