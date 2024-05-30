"use client";

import { Session } from "next-auth";
import GoogleAuthButton from "../googleAuthButton";
import Link from "next/link";

export default function RegisterMain({ session }: { session: Session | null }) {
  return (
    <main className="min-h-screen text-center">
      <div
        className={`custom-linear-border shadow-custom-green rounded-xl w-[95%] sm:w-[80%] md:w-[60%] lg:w-[55%] xl:w-[43%] 2xl:w-[42%] mx-auto mt-16 md:mt-[10%] 2xl:mt-[6%]`}
      >
        <div className="md:py-12">
          <h1 className="font-poppins font-semibold md:text-[1.568rem] md:leading-[2.38rem] text-lg mt-8 text-aqua-blue">
            One step to create your account
          </h1>
          <p className="px-1 py-1 text-sm font-normal md:px-0 md:py-2 md:text-base text-dimgray-200 font-poppins ">
            Let's begin a learning adventure
          </p>

          <div className="w-[85%] md:w-[55%] mx-auto my-5 ">
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
        </div>
      </div>
    </main>
  );
}
