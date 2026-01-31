import { SignupForm } from "@/components/modules/authentication/signup-form";
import Image from "next/image";

const registerPage = () => {
  return (
    <div className="flex  min-h-svh w-full  mx-auto items-center justify-center p-6 md:p-10">
      <div className="w-full">
        <SignupForm className=" max-w-sm mx-auto" />
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

export default registerPage;
