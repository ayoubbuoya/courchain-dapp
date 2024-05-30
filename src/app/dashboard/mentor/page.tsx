"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SplitLayout from "@/components/dashboard/splitLayout";
import RecentCreatedCourses from "@/components/dashboard/recentCreatedCourses";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { useWalletStore } from "@/stores/wallet";
import { Course } from "@/lib/types";
import { CONTRACTID } from "@/lib/config";
import { toast } from "react-toastify";

export default function MentorDashboard() {
  const router = useRouter();
  const [connectWalletToastShown, setConnectWalletToastShown] = useState(false);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [allCourses, setAllCourses] = useState<Course[] | null>(null); // all courses [for pagination
  const [sortedCourses, setSortedCourses] = useState<Course[] | null>(null); // sorted courses [for pagination
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const { wallet, signedAccountId } = useWalletStore();

  // fetch courses
  async function fetchCreatedCourses() {
    if (!signedAccountId) {
      toast.error("Please connect your wallet", {
        autoClose: 1000,
      });
      setIsLoading(false);
      return;
    }

    const courses = await wallet.viewMethod({
      contractId: CONTRACTID,
      method: "get_mentor_created_courses",
      args: {
        mentor_id: signedAccountId,
      },
    });
    console.log("Courses: ", courses);
    setAllCourses(courses);

    const sortedCourses = courses.sort(
      (a: Course, b: Course) => b.updated_at - a.updated_at
    );

    // only the first 4 courses
    setCourses(sortedCourses.slice(0, 4));
    setSortedCourses(sortedCourses.slice(0, 4));
    setIsLoading(false);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "loading") {
      return;
    }

    if (status === "authenticated") {
      if (!session) {
        return;
      }

      if (!session.user) {
        router.push("/login");
        return;
      }

      if (session.user.role === "admin") {
        // redirect to admin dashboard
        router.push("/dashboard/admin");
        return;
      }

      if (session.user.role === "user" && !session.isMentor) {
        // redirect to user dashboard
        router.push("/dashboard/student");
        return;
      }

      fetchCreatedCourses();
    }
  }, [status, wallet, signedAccountId]);

  const handlePublishCourse = async (courseId: number) => {
    const loadingToast = toast.loading("Publishing Course...");

    if (!wallet || !signedAccountId) {
      toast.update(loadingToast, {
        render: "Please connect your wallet",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      return;
    }
    try {
      const response = await wallet.callMethod({
        contractId: CONTRACTID,
        method: "publish_course",
        args: {
          course_id: courseId,
          published_at: new Date().getTime(),
        },
      });

      const success = Boolean(
        Buffer.from(response.status.SuccessValue, "base64").toString(
          "utf-8"
        ) === "true"
      );

      if (!success) {
        toast.update(loadingToast, {
          render: "Error publishing course",
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
        return;
      }

      toast.update(loadingToast, {
        render: "Course published successfully",
        type: "success",
        autoClose: 1000,
        isLoading: false,
      });

      // refetch courses
      fetchCreatedCourses();
    } catch (error) {
      console.error("Error publishing course: ", error);
      toast.update(loadingToast, {
        render: "Error publishing course",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      return;
    }
  };

  return (
    <div className="md:grid md:grid-cols-12">
      <SplitLayout session={session} />
      <main className="container min-h-[77.5vh] pb-5 mx-auto md:px-5 md:col-span-11 md:pb-10">
        <div className="mt-4 md:mt-0 px-3 w-full md:px-0 md:max-w-[39%]">
          <h1 className="mb-1 text-2xl font-normal uppercase text-aqua-blue font-poppins md:text-3xl ">
            Create New Course
          </h1>
          <p className="text-sm font-normal text-schemes-secondary font-poppins md:text-base">
            You can import your course in text or video format, or you can use
            Artificial Intelligence to generate one for you.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-5 gap-x-14 gap-y-5 md:grid-cols-2">
          <div className="left-side">
            <div className="flex flex-col gap-4 px-5 md:flex-row md:px-0 md:gap-8 md:w-full">
              <div className="w-full rounded-2xl">
                <div className="h-full py-6 bg-course-import-gradient rounded-xl">
                  <Link
                    href={"/dashboard/mentor/import-course"}
                    className="flex flex-col items-center justify-center w-full h-full gap-1"
                  >
                    <Image
                      src="/fi_folder-plus.svg"
                      width={24}
                      height={24}
                      alt="import course"
                      className="w-6 md:w-7"
                    />
                    <span className="capitalize text-white text-base md:text-[1.13rem] md:leading-7 font-medium font-poppins text-center">
                      Import your Course
                    </span>
                  </Link>
                </div>
              </div>

              <div className="w-full custom-linear-border rounded-2xl">
                <div className="flex flex-col items-center justify-between gap-2 px-4 pt-5 pb-3 md:gap-3 md:pt-6 md:px-5">
                  <h3 className="text-aqua-blue text-[0.94rem] text-center leading-5 font-semibold font-poppins ">
                    Generate a course with AI
                  </h3>
                  <p className="text-[#A5A1B1] font-roboto text-center font-light text-sm ">
                    Use artificial intelligence to generate courses, exercises,
                    materials and resources you need.
                  </p>
                  <Link
                    href={"/ai-course-generator"}
                    className="text-aqua-blue rounded-full px-5 py-3 bg-white border-[1px] border-aqua-blue border-solid  font-poppins font-normal text-[0.88rem] leading-5 text-center "
                  >
                    Launch AI
                  </Link>
                </div>
              </div>
            </div>

            <RecentCreatedCourses sortedCourses={sortedCourses} />
          </div>

          <div className="px-5 right-side md:px-0 md:border-aqua-blue md:border-l-2 md:border-solid ">
            <div className="border-solid border-t-[2px] md:border-none border-aqua-blue">
              <div className="flex flex-col justify-center items-center md:items-start gap-5 md:pl-[9%] md:pr-2 py-4 md:py-0">
                <h4 className="text-center md:text-left text-purple font-poppins font-medium text-xl tracking-[-2%] md:text-2xl">
                  Your Last Courses
                </h4>

                <div className="w-full flex flex-col items-center md:items-start justify-between gap-5">
                  {courses &&
                    courses.slice(0, 3).map((course: Course) => (
                      <div
                        key={course.id}
                        className="w-full custom-linear-border rounded-2xl"
                      >
                        <div className="py-5 px-6 md:px-10">
                          <div className="px-4 md:px-1">
                            <div className="flex items-center justify-center md:justify-start gap-3 overflow-hidden mb-1">
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
                                  {course.modules_ids &&
                                    course.modules_ids.length}{" "}
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
                          {/* Public button */}
                          <div className="flex items-center justify-around mt-4">
                            {course.status === "published" ? (
                              <button
                                disabled
                                className="duration-700  text-white bg-aqua-blue rounded-full px-4 py-2 font-poppins font-normal text-[0.88rem] leading-5 text-center hover:text-aqua-blue hover:border hover:bg-white hover:border-aqua-blue "
                              >
                                Course Publised
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePublishCourse(course.id)}
                                className="duration-700 text-white bg-aqua-blue rounded-full px-4 py-2 font-poppins font-normal text-[0.88rem] leading-5 text-center hover:text-aqua-blue hover:border hover:bg-white hover:border-aqua-blue "
                              >
                                Publish Course
                              </button>
                            )}

                            <Link
                              href={`/dashboard/mentor/course/${course.id}`}
                              className="duration-700 text-aqua-blue border-[1px] border-aqua-blue rounded-full px-4 py-2 font-poppins font-normal text-[0.88rem] leading-5 text-center ml-2 hover:border-white hover:bg-aqua-blue hover:text-white"
                            >
                              Edit Course
                            </Link>
                            <button className="duration-700 text-aqua-blue border-[1px] border-aqua-blue rounded-full px-4 py-2 font-poppins font-normal text-[0.88rem] leading-5 text-center ml-2 hover:border-white hover:bg-aqua-blue hover:text-white">
                              Archive Course
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
