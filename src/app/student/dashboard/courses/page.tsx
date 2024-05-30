"use client";

import { useWalletStore } from "@/stores/wallet";
import SplitLayout from "@/components/dashboard/splitLayout";
import Loading from "@/components/loading";
import { CONTRACTID } from "@/lib/config";
import { useCurrentUserStore } from "@/stores/currentUser";
import { useLoadingStore } from "@/stores/loading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function MyCourses() {
  const { data: session, status } = useSession();
  const { wallet, signedAccountId } = useWalletStore();
  const { isLoading, setIsLoading } = useLoadingStore();
  const { enrolledCourses, setEnrolledCourses } = useCurrentUserStore();

  const router = useRouter();

  async function fetchUserEnrolledCourses() {
    // reset enrolled courses
    setEnrolledCourses(null);
    setIsLoading(true);
    const fetchedCourses = await wallet.viewMethod({
      contractId: CONTRACTID,
      method: "get_user_enrolled_full_courses",
      args: {
        account_id: signedAccountId,
      },
    });
    console.log("User Enrolled Courses : ", fetchedCourses);
    setEnrolledCourses(fetchedCourses);
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
      fetchUserEnrolledCourses();
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
              My Learning
            </h1>
            <p className="text-sm font-normal text-schemes-secondary font-poppins md:text-base">
              You can follow your courses, see your progress as well as the
              tasks you are responsible for
            </p>
          </div>
          {/* <h1 className="text-2xl font-semibold text-gray-800">My Courses</h1> */}
          <div className="grid gap-4 mt-5 xl:grid-cols-3">
            {enrolledCourses ? (
              enrolledCourses.map((course) => (
                <Link
                  href={`/course/${course.id}/learn`}
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
                    <div className="w-[80%] mx-auto bg-gray-100 rounded-full h-1">
                      <div className="bg-aqua-blue h-1 w-[50%] rounded-full "></div>
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
        </main>
      </div>
    </>
  );
}
