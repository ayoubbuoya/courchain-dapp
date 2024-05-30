"use client";

import { CONTRACTID } from "@/lib/config";
import { FullCourse } from "@/lib/types";
import { useCoursesStore } from "@/stores/courses";
import { useLoadingStore } from "@/stores/loading";
import { useWalletStore } from "@/stores/wallet";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CoursesOverview({
  courses,
}: {
  courses: FullCourse[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const perSlide = 3;
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(perSlide);

  const handleNextSlide = () => {
    if (endSlice < courses.length) {
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
      setStartSlice(courses.length - perSlide);
      setEndSlice(courses.length);
    }
  };

  return (
    <div className="w-full min-h-52 custom-linear-border rounded-2xl mt-4 md:mt-6 md:max-w-[90%] mx-auto overflow-hidden ">
      <div className="px-4 py-8 grid grid-cols-8 gap-4 overflow-hidden duration-1000">
        <div className="h-full relative ">
          <h2 className="font-poppins font-semibold text-xl text-darkslategray-800 text-left">
            Courses
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

        {courses.length === 0 && !isLoading && (
          <div className="col-span-6 h-full w-full flex justify-center items-center">
            <p className="text-center font-poppins font-semibold text-lg text-dimgray-50">
              No Courses Found
            </p>
          </div>
        )}

        {courses.slice(startSlice, endSlice).map((course) => (
          <div
            key={course.id}
            className="h-full w-full bg-white shadow-md custom-linear-border rounded-2xl col-span-2 cursor-pointer "
          >
            <div className="py-4 px-5">
              <div className="flex-col items-start justify-center">
                <h4 className="text-aqua-blue text-base font-poppins font-medium text-center truncate ">
                  {course.title}
                </h4>
                <p className="font-semibold font-poppins text-sm text-schemes-secondary text-center">
                  By {course.mentor.name}
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-normal gap-1">
                    <Image
                      width={24}
                      height={24}
                      className="w-4 h-4"
                      src="/Time Circle.svg"
                      alt=""
                    />
                    <span className="text-dimgray-50 text-sm font-readex-pro font-normal">
                      {course.duration}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-auto mt-3 mb-6 max-h-32 ">
                <p className="text-center font-poppins font-normal text-sm text-dimgray-300 ">
                  {course.description}
                </p>
              </div>

              <div className=" flex justify-between items-center">
                <h3 className="max-w-[60%] text-schemes-secondary text-[0.9rem] font-poppins font-semibold text-center">
                  Enrolled Student Number
                </h3>
                <div className="flex flex-col items-center gap-1">
                  <Image
                    width={24}
                    height={24}
                    className="w-6"
                    src="/aqua-blue-eye.svg"
                    alt=""
                  />
                  <span className="text-aqua-blue font-poppins font-semibold text-sm text-center">
                    150
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="h-full relative">
          {endSlice < courses.length && (
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
