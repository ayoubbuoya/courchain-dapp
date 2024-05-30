"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CourseMinCard from "../home/courseMinCard";
import { Course } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";
import { fromYoctoToNear } from "@/lib/utils";

export default function CoursesSection({
  courses,
}: {
  courses: Course[] | null;
}) {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = 6;
  const totalPages = Math.ceil((courses?.length ?? 0) / perPage);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const coursesToDisplay = courses?.slice(start, end);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}#courses`);
  };

  return (
    <section id="courses" className="text-left w-[90%] mx-auto">
      <div className="w-[98%] mx-auto my-2 ">
        <h1 className="text-xl md:text-[2.5rem] md:leading-10 font-normal uppercase text-aqua-blue font-capriola mt-8 ">
          Find the right courses for you
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mt-4 md:mt-8">
          {coursesToDisplay &&
            coursesToDisplay.map((course, index) => (
              <CourseMinCard
                key={index}
                title={course.title}
                price={fromYoctoToNear(course.price)}
                link={"/course/" + course.id}
              />
            ))}
        </div>
        <div className="flex items-center justify-center my-12">
          <div className="flex items-center px-2 ">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-2 py-1 border-[1px] border-aqua-blue"
              >
                <img
                  className="h-8"
                  src="/left-arrow--24--outline.svg"
                  alt=""
                />
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  backgroundColor: i + 1 === currentPage ? "#a4e1f5" : "",
                }}
                className="font-poppins font-medium text-base text-dimgray-400 px-5 py-2  border-[1px] border-l-0 border-aqua-blue"
              >
                {i + 1}
              </button>
            ))}
            {currentPage !== totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-2 py-1 border-[1px] border-l-0 border-aqua-blue"
              >
                <img
                  className="h-8"
                  src="/left-arrow--24--outline@2x.png"
                  alt=""
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="md:my-20 mx-auto w-[98%] md:w-[85%]">
        <h1 className="text-xl md:text-[2.5rem] md:leading-10 font-normal uppercase text-aqua-blue font-capriola my-8 ">
          BROWSE BY Course LEVEL
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 w-[90%] md:min-h-[20rem] mx-auto md:my-16">
          <div className="custom-linear-border rounded-2xl backdrop-blur-[3.13rem] shadow-custom-purple flex items-center justify-center text-center ">
            <div className="flex flex-col justify-around py-10">
              <h4 className="text-xl font-medium text-black font-poppins ">
                Beginner level
              </h4>
              <p className="mt-4 text-xl font-medium text-gray-500 mb-9 font-poppins ">
                Course
              </p>

              <Link
                href="/courses?level=beginner"
                className="px-6 py-3 text-sm font-normal text-white rounded-full hover:bg-slate-600 mt-7 font-poppins bg-aqua-blue"
              >
                View included courses
              </Link>
            </div>
          </div>
          <div className="custom-linear-border rounded-2xl shadow-custom-purple flex items-center justify-center text-center backdrop-blur-[3.13rem]">
            <div className="flex flex-col justify-around py-10">
              <h4 className="text-xl font-medium text-black font-poppins ">
                Intermediate level
              </h4>
              <p className="mt-4 text-xl font-medium text-gray-500 mb-9 font-poppins ">
                Course
              </p>

              <Link
                href={"/courses?level=intermediate"}
                className="px-6 py-3 text-sm font-normal text-white rounded-full hover:bg-slate-600 mt-7 font-poppins bg-aqua-blue"
              >
                View included courses
              </Link>
            </div>
          </div>
          <div className="custom-linear-border rounded-2xl shadow-custom-purple flex items-center justify-center text-center backdrop-blur-[3.13rem] ">
            <div className="flex flex-col justify-around py-10">
              <h4 className="text-xl font-medium text-black font-poppins ">
                Advanced level
              </h4>
              <p className="mt-4 text-xl font-medium text-gray-500 mb-9 font-poppins ">
                Course
              </p>

              <Link
                href="/courses?level=advanced"
                className="px-6 py-3 text-sm font-normal text-white rounded-full hover:bg-slate-600 mt-7 font-poppins bg-aqua-blue"
              >
                View included courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="md:my-24 mx-auto w-[98%] md:w-[85%]">
        <h1 className="text-xl md:text-[2.5rem] md:leading-10 font-normal uppercase text-aqua-blue font-capriola my-8 ">
          Browser by Course Category
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 w-[90%] md:min-h-[20rem] mx-auto md:my-16">
          <div className="custom-linear-border rounded-2xl backdrop-blur-[3.13rem] shadow-custom-purple flex items-center justify-center text-center ">
            <div className="flex flex-col justify-around py-10">
              <h4 className="text-xl font-medium text-black font-poppins ">
                AI
              </h4>
              <p className="mt-4 text-xl font-medium text-gray-500 mb-9 font-poppins ">
                Course
              </p>

              <Link
                href={"/courses?category=artificial intelligence"}
                className="px-6 py-3 text-sm font-normal text-white rounded-full hover:bg-slate-600 mt-7 font-poppins bg-aqua-blue"
              >
                View included courses
              </Link>
            </div>
          </div>
          <div className="custom-linear-border rounded-2xl backdrop-blur-[3.13rem] shadow-custom-purple flex items-center justify-center text-center ">
            <div className="flex flex-col justify-around py-10">
              <h4 className="text-xl font-medium text-black font-poppins ">
                Blockchain
              </h4>
              <p className="mt-4 text-xl font-medium text-gray-500 mb-9 font-poppins ">
                Course
              </p>

              <Link
                href={"/courses?category=blockchain"}
                className="px-6 py-3 text-sm font-normal text-white rounded-full hover:bg-slate-600 mt-7 font-poppins bg-aqua-blue"
              >
                View included courses
              </Link>
            </div>
          </div>
          <div className="custom-linear-border rounded-2xl backdrop-blur-[3.13rem] shadow-custom-purple flex items-center justify-center text-center ">
            <div className="flex flex-col justify-around py-10">
              <h4 className="text-xl font-medium text-black font-poppins ">
                Computer Science
              </h4>
              <p className="mt-4 text-xl font-medium text-gray-500 mb-9 font-poppins ">
                Certification
              </p>

              <Link
                href={"/courses?category=computer science"}
                className="px-6 py-3 text-sm font-normal text-white rounded-full hover:bg-slate-600 mt-7 font-poppins bg-aqua-blue"
              >
                View included courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
