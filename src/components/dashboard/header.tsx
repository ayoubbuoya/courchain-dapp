"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useWalletStore } from "@/stores/wallet";
import { CONTRACTID } from "@/lib/config";
import ProfileDropMenu from "../header/ProfileDropMenu";
import { useSession } from "next-auth/react";

export default function Header({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}) {
  const { data: session } = useSession();
  const firstName = session?.user.name?.split(" ")[0];
  const lastName = session?.user.name?.split(" ")[1];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <header className="container flex items-center justify-between w-full px-4 py-1 mx-auto md:col-span-11 md:px-5 md:mt-9 md:py-0 sm:px-8 ">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
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
      <div className="flex justify-end w-full ">
        <div className="flex items-center justify-between gap-6 sm:gap-10">
          <div className="rounded-full custom-small-linear-border">
            <div className="p-2 md:p-3 ">
              <Image
                src="/fi_bell.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 rounded-full md:w-6 "
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-5 ">
            <Link href={"/dashboard"} className="">
              <img
                className="rounded-full w-11 md:w-12"
                src={
                  session?.user.image?.startsWith("http")
                    ? session.user.image
                    : `${session?.user.image}`
                }
                alt="profile"
              />
            </Link>
            <div className="flex flex-col items-start justify-between gap-1">
              <div className="flex items-center gap-1 ">
                <span className="text-base font-medium capitalize text-dimgray-900 font-poppins">
                  {firstName + " " + (lastName ? lastName[0] : "") || "User"}
                </span>

                <img
                  className="w-4 h-4 cursor-pointer md:w-6 md:h-6"
                  src="/iconparkoutlinedown.svg"
                  onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                />
              </div>
              <span className="text-sm font-normal capitalize font-poppins text-dimgray-50">
                {session?.user.role === "user" && session?.isMentor
                  ? "Mentor"
                  : session?.user.role === "user" && !session?.isMentor
                  ? "Student"
                  : session?.user.role || "Annymous"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProfileDropMenu
        isDropdownVisible={isDropdownVisible}
        setIsDropdownVisible={setIsDropdownVisible}
        className="top-9 right-2 z-50 md:top-14 md:right-10 fixed bg-white"
      />
    </header>
  );
}
