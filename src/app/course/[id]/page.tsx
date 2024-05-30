"use client";

import { useWalletStore } from "@/stores/wallet";
import CourseDetails from "@/components/course/courseDetails";
import Hero from "@/components/course/hero";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Loading from "@/components/loading";
import { CONTRACTID } from "@/lib/config";
import { Course, FullCourse } from "@/lib/types";
import { useCourseStudentStatusStore } from "@/stores/courseStudentStatus";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCoursesStore } from "@/stores/courses";
import { fromYoctoToNear } from "@/lib/utils";

export default function CoursePage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { data: session, status, update } = useSession();
  const { id: courseId } = params;
  const {
    isCarted,
    isEnrolled,
    isCompleted,
    setIsCarted,
    setIsEnrolled,
    setIsCompleted,
    course,
    setCourse,
  } = useCourseStudentStatusStore();
  const { setAllCourses } = useCoursesStore();

  const { wallet, signedAccountId } = useWalletStore();

  useEffect(() => {
    if (!wallet) {
      return;
    }

    if (!signedAccountId) {
      console.error("User not logged in");
      toast.error("Please login to your NEAR wallet to view course", {
        autoClose: 1000,
      });
      return;
    }

    async function fetchCourse() {
      try {
        const course = await wallet.viewMethod({
          contractId: CONTRACTID,
          method: "get_full_course",
          args: { course_id: Number(courseId) },
        });

        if (!course) {
          console.error("Course not found");
          toast.error("Cannot find course. Please try again.", {
            autoClose: 1000,
          });
          return;
        }
        setCourse(course);
        console.log("Course : ", course);
      } catch (error) {
        console.error("Error fetching course", error);
        toast.error("Error fetching course", {
          autoClose: 1000,
        });
      }
    }

    async function fetchCourses() {
      const courses = await wallet.viewMethod({
        contractId: CONTRACTID,
        method: "get_courses",
        args: {},
      });
      setAllCourses(courses);
    }

    async function checkStatusOfCourseToCurrentStudent() {
      if (!session?.isMentor) {
        const carted = await wallet.viewMethod({
          contractId: CONTRACTID,
          method: "is_student_course_carted",
          args: {
            course_id: Number(courseId),
            account_id: signedAccountId,
          },
        });
        setIsCarted(carted);

        const enrolled = await wallet.viewMethod({
          contractId: CONTRACTID,
          method: "is_student_course_enrolled",
          args: {
            course_id: Number(courseId),
            account_id: signedAccountId,
          },
        });
        setIsEnrolled(enrolled);

        const completed = await wallet.viewMethod({
          contractId: CONTRACTID,
          method: "is_student_course_completed",
          args: {
            course_id: Number(courseId),
            account_id: signedAccountId,
          },
        });
        setIsCompleted(completed);
      } else {
        setIsCarted(false);
        setIsEnrolled(false);
        setIsCompleted(false);
      }
    }

    if (signedAccountId) {
      fetchCourse();
      checkStatusOfCourseToCurrentStudent();
      fetchCourses();
    }
  }, [wallet, signedAccountId, courseId]);

  if (!session || (session && !session.user)) {
    return <Loading />;
  }

  const handleAddCourseToCart = async () => {
    const loading = toast.loading("Adding course to cart...");

    try {
      if (!wallet) {
        console.error("Wallet not found");
        toast.update(loading, {
          render: "Wallet not found",
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
        return;
      }

      if (isCarted) {
        console.error("Course already in cart");
        toast.update(loading, {
          render: "Course already in cart",
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
        return;
      }

      if (isEnrolled) {
        console.error("Course already enrolled");
        toast.update(loading, {
          render: "Course already enrolled",
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
        return;
      }

      if (isCompleted) {
        console.error("Course already completed");
        toast.update(loading, {
          render: "Course already completed",
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
        return;
      }

      const callResult = await wallet.callMethod({
        contractId: CONTRACTID,
        method: "save_course_to_cart",
        args: {
          course_id: Number(courseId),
          carted_at: new Date().getTime(),
        },
      });

      const success = Boolean(
        Buffer.from(callResult.status.SuccessValue, "base64").toString(
          "utf-8"
        ) === "true"
      );

      if (!success) {
        console.error("Error adding course to cart");
        toast.update(loading, {
          render: "Error adding course to cart",
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
        return;
      }

      setIsCarted(true);
      toast.update(loading, {
        render: "Course added to cart",
        type: "success",
        autoClose: 1000,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error adding course to cart", error);
      toast.update(loading, {
        render: "Error adding course to cart",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
    }
  };

  return (
    <>
      <Header />
      {course ? (
        <main className="min-h-screen text-base mb-5">
          <Hero
            session={session}
            update={update}
            handleAddCourseToCart={handleAddCourseToCart}
          />
          <section className="container mx-auto py-5">
            <div className="w-[95%] mx-auto flex justify-center items-center ">
              <div className="custom-linear-border rounded-2xl w-full">
                <div className=" py-[10%] md:py-[3%] grid place-items-center grid-cols-2 md:grid-cols-4 gap-y-2 overflow-hidden">
                  <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                    <h3 className="font-poppins text-aqua-blue font-semibold text-center text-2xl md:text-3xl xl:text-4xl tracking-[-0.2%]">
                      {course.category}
                    </h3>
                    <span className="text-schemes-secondary text-center font-poppins font-medium text-base md:text-xl  ">
                      Course Category
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                    <h3 className="font-poppins text-aqua-blue font-semibold text-center text-2xl md:text-3xl xl:text-4xl tracking-[-0.2%]">
                      {fromYoctoToNear(course.price)} NEAR
                    </h3>
                    <span className="text-schemes-secondary text-center font-poppins font-medium text-base md:text-xl  ">
                      Pay With NEAR
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                    <h3 className="font-poppins text-aqua-blue font-semibold text-center text-2xl md:text-3xl xl:text-4xl tracking-[-0.2%]">
                      {course.duration}
                    </h3>
                    <span className="text-schemes-secondary text-center font-poppins font-medium text-base md:text-xl  ">
                      To Complete
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                    <h3 className="font-poppins text-aqua-blue font-semibold text-center text-2xl md:text-3xl xl:text-4xl tracking-[-0.2%]">
                      {course.level}
                    </h3>
                    <span className="text-schemes-secondary text-center font-poppins font-medium text-base md:text-xl  ">
                      Course Level
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <CourseDetails
            session={session}
            update={update}
            handleAddCourseToCart={handleAddCourseToCart}
          />
          {/* <div className="mx-auto w-[98%] md:w-[85%]">
            <h1 className="text-xl md:text-[2.5rem] md:leading-10 font-normal uppercase text-purple font-capriola my-8 ">
              Voir ce que pensent les internautes / ux
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 w-[90%] mx-auto md:my-16">
              <div className="custom-linear-border rounded-2xl text-center">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      className="w-12 h-12"
                      src="/alvin-limjpeg@2x.png"
                      alt=""
                    />
                    <div className="flex flex-col text-sm font-normal text-left font-roboto ">
                      <span className="text-dimgray-800 ">Student A</span>
                      <span className="text-dimgray-100 ">Niveau</span>
                    </div>
                  </div>
                  <div className="flex justify-between ">
                    <img className="h-5 w-5" src="/quotesvg.svg" alt="" />
                    <p className="mt-3 px-2 text-sm font-normal tracking-wider text-darkslategray-100 font-poppins">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
                    </p>
                  </div>

                  <div className="w-[90%] mx-auto mt-8 ">
                    <button className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-normal text-white  rounded-full hover:bg-slate-600 font-poppins bg-purple w-full">
                      <span>Voir le cours suivi</span>
                      <img className="h-5" src="/24px--plus@2x.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="custom-linear-border rounded-2xl text-center">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      className="w-12 h-12"
                      src="/alvin-limjpeg@2x.png"
                      alt=""
                    />
                    <div className="flex flex-col text-sm font-normal text-left font-roboto ">
                      <span className="text-dimgray-800 ">Student A</span>
                      <span className="text-dimgray-100 ">Niveau</span>
                    </div>
                  </div>
                  <div className="flex justify-between ">
                    <img className="h-5 w-5" src="/quotesvg.svg" alt="" />
                    <p className="mt-3 px-2 text-sm font-normal tracking-wider text-darkslategray-100 font-poppins">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
                    </p>
                  </div>

                  <div className="w-[90%] mx-auto mt-8 ">
                    <button className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-normal text-white  rounded-full hover:bg-slate-600 font-poppins bg-purple w-full">
                      <span>Voir le cours suivi</span>
                      <img className="h-5" src="/24px--plus@2x.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="custom-linear-border rounded-2xl text-center">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      className="w-12 h-12"
                      src="/alvin-limjpeg@2x.png"
                      alt=""
                    />
                    <div className="flex flex-col text-sm font-normal text-left font-roboto ">
                      <span className="text-dimgray-800 ">Student A</span>
                      <span className="text-dimgray-100 ">Niveau</span>
                    </div>
                  </div>
                  <div className="flex justify-between ">
                    <img className="h-5 w-5" src="/quotesvg.svg" alt="" />
                    <p className="mt-3 px-2 text-sm font-normal tracking-wider text-darkslategray-100 font-poppins">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
                    </p>
                  </div>

                  <div className="w-[90%] mx-auto mt-8 ">
                    <button className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-normal text-white  rounded-full hover:bg-slate-600 font-poppins bg-purple w-full">
                      <span>Voir le cours suivi</span>
                      <img className="h-5" src="/24px--plus@2x.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </main>
      ) : (
        <div className="min-h-screen container mx-auto py-10 flex justify-center items-center">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-center text-3xl font-bold text-aqua-blue">
              Loading course...
            </h1>

            <div className="w-20 h-20 border-4 border-t-aqua-blue border-r-aqua-blue border-b-purple border-l-purple rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
