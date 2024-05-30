"use client";

import { useWalletStore } from "@/stores/wallet";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col px-5 text-base font-normal text-left list-none md:uppercase md:flex-row md:items-center md:w-1/2 font-poppins md:font-medium md:justify-evenly md:px-0 ">
      <li className="pb-2 md:pb-0">
        <Link className={pathname === "/" ? "text-purple" : ""} href="/">
          Home
        </Link>
      </li>

      <li className="pb-2 md:pb-0">
        <Link
          className={pathname === "/courses/preview" ? "text-purple" : ""}
          href="/courses/preview"
        >
          Courses
        </Link>
      </li>

      {/* <li className="pb-2 md:pb-0">
        <Link
          className={pathname === "/about" ? "text-purple" : ""}
          href="/about"
        >
          about
        </Link>
      </li> */}

      {/* {session?.isMentor && (
        <li className="pb-2 md:pb-0">
          <Link
            className={pathname === "/mentor" ? "text-purple" : ""}
            href="/mentor"
          >
            Devenir Mentor
          </Link>
        </li>
      )} */}
    </ul>
  );
}
