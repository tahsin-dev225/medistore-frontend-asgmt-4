import { LoginForm } from "@/components/modules/authentication/login-form";
import Image from "next/image";

const loginPage = () => {
  return (
    <div className="flex  min-h-svh w-full  mx-auto items-center justify-center p-6 md:p-10">
      <div className="w-full">
        <LoginForm className=" max-w-sm mx-auto" />
      </div>
      <div className="w-full hidden md:block">
        <Image
          src={"/img/login-trans.png"}
          height={450}
          width={500}
          alt="login"
        />
      </div>
    </div>
  );
};

export default loginPage;
