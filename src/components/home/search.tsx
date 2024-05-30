"use client";

import { Course } from "@/lib/types";
import { fromYoctoToNear } from "@/lib/utils";
import { useCoursesStore } from "@/stores/courses";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [searchCourses, setSearchCourses] = useState<Course[] | null>(null);
  const { allCourses } = useCoursesStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const filteredCourses = allCourses.filter((course) =>
      course.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearchCourses(filteredCourses);
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-1/5 text-dimgray-100 ">
      <div className="flex items-center justify-start px-6 w-[90%] md:w-2/3 h-12 border-1 bg-white-900 border-aqua-blue rounded-3xl gap-5">
        <img className="w-6" src="/tablersearch.svg" alt="" />
        <input
          className="w-full h-full border-none outline-none bg-white-900 overflow-auto pr-2 text-sm "
          type="search"
          placeholder="What course are you looking for?"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {search !== "" && searchCourses && searchCourses.length === 0 && (
        <div
          className={`absolute bg-white top-[101%] z-50 w-full overflow-auto max-w-[58%] mx-auto border-1 border-aqua-blue rounded-sm ${
            pathname === "/courses/preview" ? "max-h-[32vh]" : "max-h-[60vh]"
          } `}
        >
          <div className="px-8 h-full w-full py-5 flex items-center justify-center gap-2">
            <p className="capitalize font-poppins text-xl font-medium text-aqua-blue">
              No course with that name found
            </p>
          </div>
        </div>
      )}

      {searchCourses && searchCourses.length > 0 && search !== "" && (
        <div
          className={`absolute bg-white top-[101%] z-50 w-full overflow-auto max-w-[58%] mx-auto border-1 border-aqua-blue rounded-sm ${
            pathname === "/courses/preview" ? "max-h-[32vh]" : "max-h-[60vh]"
          } `}
        >
          <div className="px-8 h-full w-full py-1 flex flex-col items-center justify-center gap-2">
            {searchCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between w-full h-12 border-1 border-aqua-blue rounded-3xl gap-5 "
              >
                <Link
                  href={`/course/${course.id}`}
                  className="font-poppins font-medium text-lg text-aqua-blue"
                >
                  {course.title}
                </Link>
                <p className="font-poppins text-lg font-normal text-schemes-secondary">
                  {fromYoctoToNear(course.price)} NEAR
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
