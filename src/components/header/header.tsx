"use client";

import Link from "next/link";
import Navbar from "./navbar";
import CartLink from "./cartLink";
import Profile from "./profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useWalletStore } from "@/stores/wallet";
import ExploreButton from "./explorButton";

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white-900 flex items-center w-full px-4 p-2.5 md:text-base md:text-center justify-evenly text-aqua-blue border-b-[1px] border-b-aqua-blue  ">
      {/* Start First Sec */}
      <Link
        href={"/"}
        className="flex items-center gap-1 lg:w-[20%] xl:w-[13%] px-4"
      >
        <img className="max-w-5" src="/group-1171274801-1@2x.png" alt="" />

        <img className="max-w-20" src="/courchain.svg" alt="" />
      </Link>

      {/* Toogle menu  */}
      <div className="flex items-center justify-end w-full md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="text-sm text-gray-500 rounded-lg md:hidden p-1 focus:outline-none focus:ring-1 focus:ring-gray-200  "
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      <div className={`hidden md:flex items-center justify-around w-full`}>
        {/* Start Second Sec */}
        <div className="flex items-center justify-between gap-2 xl:gap-5">
          <ExploreButton />
          <CartLink />
        </div>
        <Navbar session={session} />
        {/* Start Last sec */}
        {session ? (
          <Profile session={session} />
        ) : (
          <div className="flex items-center justify-around gap-5">
            <Link
              href="/login"
              className="flex items-center justify-center px-4 py-[0.4rem] border-2  border-aqua-blue border-solid rounded-3xl"
            >
              <img className="w-6 text-aqua-blue" src="/vector.svg" />
            </Link>
            {/* start nous rejoindre */}
            <div className="flex flex-col items-center justify-start bg-aqua-blue px-5 py-2.5 rounded-3xl font-normal font-roboto text-base text-center text-white-900">
              <Link
                href="/register"
                className="flex items-center justify-start gap-[0.5rem] overflow-hidden rounded"
              >
                <img
                  className="object-cover w-6 overflow-hidden shrink-0"
                  alt="add icon"
                  src="/24px--plus@2x.png"
                />

                <div className="leading-[24px]">Register</div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Version */}

      {isMenuOpen && (
        <div className="fixed z-50 py-2 overflow-hidden rounded-lg right-0.5 text-aqua-blue top-[2.9rem] bg-white-900 md:hidden">
          <div className="">
            <Navbar session={session} />
            <div className="border-t-[1px] border-solid border-aqua-blue">
              {session ? (
                <div className="px-2  mt-4 mb-1">
                  <Profile session={session} />
                </div>
              ) : (
                <div className="flex flex-col gap-4 px-2 mt-4 mb-2">
                  <Link
                    href="/register"
                    className="bg-aqua-blue px-3 py-1.5  font-normal tracking-wider font-poppins text-base text-center text-white-900 overflow-hidden rounded-full"
                  >
                    Register
                  </Link>

                  <Link
                    href="/login"
                    className="bg-white px-3 py-1.5  font-normal tracking-wider font-poppins text-base text-center text-aqua-blue border-aqua-blue border-[1px] border-solid overflow-hidden rounded-full"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
