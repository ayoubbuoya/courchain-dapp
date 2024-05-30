"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Course } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function RecentCreatedCourses({
  sortedCourses,
}: {
  sortedCourses: Course[] | null;
}) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between  my-6  md:my-8">
        <h5 className="capitalize text-purple font-medium font-poppins text-2xl">
          Continue editing
        </h5>
        <button className="rounded-full custom-small-linear-border">
          <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-full">
            <Image
              src="/iconparkoutlinedown.svg"
              width={24}
              height={24}
              alt="down arrow"
              className="w-6 md:w-7"
            />
            <span className="text-base font-normal text-aqua-blue font-roboto">
              Most recent courses
            </span>
          </div>
        </button>
      </div>
      <div className="grid grid-cols-1 px-5 md:grid-cols-2 gap-x-8 gap-y-5 md:px-0 ">
        {sortedCourses &&
          sortedCourses.map((course: Course) => (
            <div key={course.id} className="custom-linear-border rounded-2xl">
              <div className="pb-2">
                <div className="flex justify-center py-4">
                  <span className="font-poppins font-normal  text-base text-[#160647] ">
                    {course.updated_at &&
                      new Date(course.updated_at).toISOString().split("T")[0]}
                  </span>
                </div>

                <div
                  onClick={() => {
                    router.push(`/dashboard/mentor/course/${course.id}`);
                  }}
                  className="cursor-pointer border-t-aqua-blue border-solid border-t-[1.5px] md:border-t-2 pb-2 px-6 md:px-10"
                >
                  <div className="px-4 md:px-1">
                    <div className="flex items-center justify-center gap-3 overflow-hidden mb-1">
                      <div>
                        <Image
                          src="/idea lamp over an open book.svg"
                          width={24}
                          height={24}
                          alt="folder"
                          className="w-20 h-20 md:w-24 md:h-24 "
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <h3 className="truncate text-base font-medium text-center text-aqua-blue font-poppins whitespace-nowrap">
                          {course.title}
                        </h3>

                        <span className="text-sm ml-3 md:ml-0 font-semibold text-left font-poppins text-schemes-secondary">
                          {course.modules_ids && course.modules_ids.length}{" "}
                          Modules
                        </span>
                        <div className="flex items-center gap-2 ">
                          <Image
                            src="/Time Circle.svg"
                            width={24}
                            height={24}
                            alt="time circle"
                            className="w-4"
                          />

                          <span className="text-[#64748B] font-medium font-inter text-sm tracking-[0.1%]">
                            {course.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
