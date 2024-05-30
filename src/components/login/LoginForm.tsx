"use client";

import { FormEvent } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = toast.loading("Signing in...");
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    console.log(response);

    if (response?.ok && !response?.error) {
      toast.update(id, {
        render: "Login Success!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } else {
      toast.update(id, {
        render: "Login Failed!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  return (
    <form className="space-y-4 text-left" onSubmit={handleSubmit}>
      <div className="flex flex-col items-start justify-start gap-2">
        <label
          htmlFor="email"
          className="font-poppins font-normal text-base text-slate-600"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="studentormentor@courai.com"
          name="email"
          className="border-[1px] rounded-lg py-3 px-4 w-full font-poppins font-normal text-slate-600 text-base "
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <label
          htmlFor="password"
          className="font-poppins font-normal text-base text-slate-600"
        >
         Password
        </label>
        <input
          type="password"
          placeholder="***********"
          name="password"
          className="border-[1px] rounded-lg py-3 px-4 w-full font-poppins font-normal text-slate-600 text-base "
        />
      </div>

      <div className="flex text-center flex-col items-start justify-start gap-5 pt-5">
        <button
          type="submit"
          className="w-[80%] py-[0.6rem] rounded-full mx-auto text-white font-poppins font-normal text-base bg-aqua-blue border-white border-2  "
        >
          Sign In
        </button>
      </div>

   
    </form>
  );
}
