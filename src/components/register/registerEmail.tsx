import Link from "next/link";
import GoogleAuthButton from "../googleAuthButton";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function RegisterEmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(regex.test(e.target.value));
  };

  const handleCreateAccount = () => {
    if (email === "") {
      toast.error("Please enter an email address");
      return;
    }
    if (!isValidEmail) {
      toast.error("Please enter a valid email address");
      return;
    }

    // redirect to the next step using next js
    router.push(`/register?step=2&email=${email}`);
  };

  return (
    <>
      <h1 className="font-poppins font-semibold md:text-[1.568rem] md:leading-[2.38rem] text-lg mt-8 text-aqua-blue">
        One step to create your account
      </h1>
      <p className="px-1 py-1 text-sm font-normal md:px-0 md:py-2 md:text-base text-dimgray-200 font-poppins ">
        Let's begin a learning adventure
      </p>
      <div className=" mt-2 md:mt-8 w-[80%] md:w-[55%] mx-auto">
        <div className="flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="email"
            className="text-base font-normal font-poppins text-darkslategray-400"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="student@courai.com"
            name="email"
            className={`border-2 ${
              isValidEmail
                ? "focus:border-green-500 focus-visible:border-green-500 "
                : "focus:border-red-500 focus-visible:border-red-500 focus-within:border-red-500 "
            } focus:bg-white focus:outline-none rounded-lg py-3 px-4 w-full font-poppins font-normal text-dimgray-600 text-xs`}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handleCreateAccount}
            className="w-full py-[0.6rem] rounded-full mx-auto text-white font-poppins font-normal text-base bg-aqua-blue border-white border-2  "
          >
            Create an account
          </button>
        </div>
      </div>

      <div className="w-[85%] md:w-[60%] mx-auto my-5 flex justify-center items-center gap-3 md:gap-1 ">
        <hr className="border-t-[1px] md:border-t-2 border-aqua-blue w-[25%] md:w-7" />
        <p className="hidden md:block text-xs font-normal text-center font-poppins text-dimgray-400 ">
          or with e-mail and password
        </p>
        <p className="md:hidden capitalize text-sm font-normal text-center font-poppins text-dimgray-400 ">
          or with e-mail and password
        </p>
        <hr className="border-t-[1px] md:border-t-2 border-aqua-blue w-[25%] md:w-7 " />
      </div>

      <div className="w-[85%] md:w-[55%] mx-auto mt-5 ">
        <GoogleAuthButton />
      </div>

      <div className="flex items-center justify-center py-4 mb-3">
        <div className="flex flex-col items-center gap-1 text-base font-normal leading-4 text-center text-dimgray-200 font-poppins">
          <span>Already have an account?</span>
          <Link
            href={"/login"}
            className="text-base font-normal underline decoration-aqua-blue decoration-1 text-aqua-blue "
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
}
