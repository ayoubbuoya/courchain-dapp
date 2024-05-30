"use client";

import { User } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

export default function UsersOverview({ users }: { users: User[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const perSlide = 3;
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(perSlide);

  const handleNextSlide = () => {
    if (endSlice < users.length) {
      setStartSlice(startSlice + perSlide);
      setEndSlice(endSlice + perSlide);
    } else {
      setStartSlice(0);
      setEndSlice(perSlide);
    }
  };

  const handlePrevSlide = () => {
    if (startSlice > 0) {
      setStartSlice(startSlice - perSlide);
      setEndSlice(endSlice - perSlide);
    } else {
      setStartSlice(users.length - perSlide);
      setEndSlice(users.length);
    }
  };

  return (
    <div className="w-full min-h-52 custom-linear-border rounded-2xl mt-4 md:mt-6 md:max-w-[90%] mx-auto overflow-hidden ">
      <div className="px-4 py-8 grid grid-cols-8 gap-4 overflow-hidden duration-1000">
        <div className="h-full relative ">
          <h2 className="font-poppins font-semibold text-xl text-darkslategray-800 text-left">
            Users
          </h2>
          <p className="ml-2 text-dimgray-50 font-poppins font-medium text-base text-left">
            Overview
          </p>

          {startSlice > 0 && (
            <Image
              onClick={handlePrevSlide}
              width={24}
              height={24}
              src="/left-arrow--24--outline.svg"
              alt="lefty arrow icon"
              className="absolute w-[50%] right-10 top-[45%] cursor-pointer hover:scale-125 transform transition-transform duration-300 ease-in-out"
            />
          )}
        </div>

        {isLoading && (
          <div className="col-span-6 h-full w-full flex justify-center items-center">
            <div className="w-20 h-20 border-4 border-t-aqua-blue border-r-aqua-blue border-b-purple border-l-purple rounded-full animate-spin"></div>
          </div>
        )}

        {users.length === 0 && !isLoading && (
          <div className="col-span-6 h-full w-full flex justify-center items-center">
            <p className="text-center font-poppins font-semibold text-lg text-dimgray-50">
              No Users Found
            </p>
          </div>
        )}

        {users.slice(startSlice, endSlice).map((user) => (
          <div
            className="h-full w-full bg-white shadow-md custom-linear-border rounded-2xl cursor-pointer col-span-2 "
            key={user.account_id}
          >
            <div className="py-6 px-2 flex flex-col items-center justify-around gap-2">
              <Image
                src={user.picture || ""}
                alt="user profile picture"
                width={50}
                height={50}
                className="rounded-full w-16 h-16"
              />

              <h3 className="text-aqua-blue text-center font-capriola font-normal text-xl">
                {user.name}
              </h3>
              <div className="flex flex-col items-center justify-between gap-1">
                <p className="text-dimgray-800 text-base font-poppins font-normal">
                  {user.account_id}
                </p>
                <p className="text-dimgray-800 text-base font-poppins font-normal">
                  {user.email}
                </p>
                <p className="text-dimgray-800 text-base font-poppins font-normal">
                  <span className="font-semibold tracking-wide">Tel : </span>
                  {user.phone || "+216 23524714"}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="h-full relative">
          {endSlice < users.length && (
            <Image
              onClick={handleNextSlide}
              width={24}
              height={24}
              src="/left-arrow--24--outline.svg"
              alt="lefty arrow icon"
              className="absolute w-[50%] top-[45%] left-10 rotate-180 cursor-pointer hover:scale-125 transform transition-transform duration-300 ease-in-out"
            />
          )}
        </div>
      </div>
    </div>
  );
}
