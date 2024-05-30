import { Course } from "@/lib/types";
import CourseMinCard from "./courseMinCard";
import Link from "next/link";
import { fromYoctoToNear } from "@/lib/utils";
import { useCoursesStore } from "@/stores/courses";

export default function MinCoursesSection() {
  const { allCourses } = useCoursesStore();

  // last six courses
  const lastSixCourses = allCourses?.slice(-6);
  return (
    <section className="text-left w-[96%] mx-auto ">
      <div className="w-[98%] mx-auto my-2">
        <h1 className="text-xl md:text-[2.5rem] md:leading-10 font-normal uppercase text-purple font-capriola mt-8 ">
          DISCOVER OUR COURSES & CERTIFICATIONS
        </h1>
      </div>

      <div className="grid py-4 md:pt-8 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 md:gap-4 ">
        {lastSixCourses &&
          lastSixCourses.map((course) => (
            <CourseMinCard
              key={course.id}
              title={course.title}
              price={fromYoctoToNear(course.price) || 0}
              link={`/course/${course.id}`}
            />
          ))}
      </div>
      <div className="flex justify-center md:justify-end items-center py-4 md:pb-1">
        <Link
          href="/courses/preview"
          className="bg-aqua-blue text-center py-3 px-6 md:px-10 rounded-full text-white font-roboto font-normal tracking-normal text-base"
        >
          View all courses
        </Link>
      </div>
    </section>
  );
}
