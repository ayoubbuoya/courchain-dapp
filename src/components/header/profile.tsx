"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileDropMenu from "./ProfileDropMenu";
import { Session } from "next-auth";
import Image from "next/image";

export default function Profile({ session }: { session: Session | null }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  if (!session) {
    return;
  }

  if (!session.user) {
    toast.error("No user found");
    return;
  }

  return (
    <div className="md:w-[25%] md:flex md:justify-end md:items-center font-poppins ">
      <div className="flex items-center ">
       {session.user.image ? (
         <Image
         className="mr-3 rounded-full max-w-8"
         src={session.user.image}
         // src="https://lh3.googleusercontent.com/a/ACg8ocLLDnrabZsCkJmQfISJK7xEOOu0lPICK3c7WNbYYpX4JPNgthmv=s96-c"
         alt="pr"
         width={40}
         height={40}
       />
       ) : (
        //  draw a palceholder
        <div className="mr-3 rounded-full bg-gray-300 w-10 h-10"></div>
       )}

        <span className="flex text-base font-medium text-center md:text-lg font-poppins text-aqua-blue ">
          Hey {session.user.name?.split(" ")[0] || "Anonymous"}
        </span>
        <img
          className="w-6 h-6 cursor-pointer md:w-7 md:h-7"
          src="/iconparkoutlinedown.svg"
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        />
      </div>
      {/* Main Menu */}
      <ProfileDropMenu
        isDropdownVisible={isDropdownVisible}
        setIsDropdownVisible={setIsDropdownVisible}
        className="top-10 right-12"
      />
    </div>
  );
}
