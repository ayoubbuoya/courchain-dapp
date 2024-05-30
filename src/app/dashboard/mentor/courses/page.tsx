"use client";

import { useWalletStore } from "@/stores/wallet";
import SplitLayout from "@/components/dashboard/splitLayout";
import Loading from "@/components/loading";
import { CONTRACTID } from "@/lib/config";
import { Course } from "@/lib/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MyCreatedCourses() {
  const { data: session } = useSession();
  const { wallet, signedAccountId } = useWalletStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [allCourses, setAllCourses] = useState<Course[] | null>(null); // all courses [for pagination]
  const [isLoading, setIsLoading] = useState(true);
  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = 12;
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const totalPages = Math.ceil((allCourses?.length ?? 0) / perPage);
  const courses = allCourses?.slice(start, end);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  async function fetchCreatedCourses() {
    const fetchedCourses = await wallet.viewMethod({
      contractId: CONTRACTID,
      method: "get_mentor_created_courses",
      args: {
        mentor_id: signedAccountId,
      },
    });
    console.log("Courses: ", courses);

    const sortedCourses = fetchedCourses.sort(
      (a: Course, b: Course) => b.updated_at - a.updated_at
    );

    // only the first 4 courses
    setAllCourses(sortedCourses);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!wallet) return;

    if (!signedAccountId) {
      toast.error("Connect to your NEAR Wallet", {
        autoClose: 1000,
      });
      return;
    }

    if (session && !session.user) {
      router.push("/login");
      return;
    }

    if (session && wallet && signedAccountId) {
      fetchCreatedCourses();
    }
  }, [wallet, signedAccountId, session]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="md:grid md:grid-cols-12">
        <SplitLayout session={session} />
        <main className="container min-h-screen pb-5 mx-auto md:px-5 md:col-span-11 md:pb-10">
          <div className="mt-4 md:mt-0 px-3 w-full md:px-0 md:max-w-[39%]">
            <h1 className="mb-1 text-2xl font-normal uppercase text-aqua-blue font-poppins md:text-3xl ">
              Created courses
            </h1>
            <p className="text-sm font-normal text-schemes-secondary font-poppins md:text-base">
              you can view all the courses you have created here sorted by the
              most recent.
            </p>
          </div>

          <div className="min-h-[65vh]">
            <div className="grid gap-4 mt-5 xl:grid-cols-3  ">
              {courses ? (
                courses.map((course) => (
                  <Link
                    href={`/dashboard/mentor/course/${course.id}`}
                    key={course.id}
                    className="cursor-pointer overflow-hidden bg-white shadow-md custom-linear-border rounded-2xl"
                  >
                    <div className="flex flex-col items-start justify-between gap-3 p-4 overflow-hidden rounded-2xl">
                      <div className="flex items-center space-x-4 overflow-hidden w-full">
                        <img
                          src={
                            course.picture || "/idea lamp over an open book.svg"
                          }
                          alt={course.title}
                          className="w-16 h-16 rounded-lg"
                        />
                        <div className="w-full overflow-hidden">
                          <h2 className="text-lg font-semibold truncate text-aqua-blue">
                            {course.title}
                          </h2>
                          <p className="text-sm font-normal text-gray-500">
                            {course.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                  <p className="text-lg font-semibold text-gray-800">
                    You have not enrolled in any course yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center my-4">
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
        </main>
      </div>
    </>
  );
}
