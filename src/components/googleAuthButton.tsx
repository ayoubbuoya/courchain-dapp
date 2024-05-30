"use client";

import { signIn } from "next-auth/react";

export default function GoogleAuthButton() {
  const handleGoogleLogin = () => {
    signIn("google");
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-4 w-full py-2 md:py-3 rounded-full mx-auto text-aqua-blue font-poppins font-normal text-base text-center  bg-white border-aqua-blue border-[1px] md:border-2 "
    >
      <img className="max-w-5" src="/bigoogle.svg" alt="" />
      <span>Connect With Google </span>
    </button>
  );
}
