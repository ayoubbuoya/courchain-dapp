import { Course, FullCourse, FullModule } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useCourseStudentStatusStore } from "@/stores/courseStudentStatus";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Session } from "next-auth";
import { useWalletStore } from "@/stores/wallet";
import { toast } from "react-toastify";

export default function CourseDetails({
  session,
  update,
  handleAddCourseToCart,
}: {
  session: Session | null;
  update: (session: any) => Promise<Session | null>;
  handleAddCourseToCart: () => void;
}) {
  const { course, isCarted, isEnrolled, isCompleted } =
    useCourseStudentStatusStore();
  const { wallet, signedAccountId } = useWalletStore();
  const router = useRouter();

  if (!course) {
    return null;
  }

  const [currentModule, setCurrentModule] = useState<FullModule | null>(
    course.modules[0]
  );
  const courseMentor = course.mentor;

  const switchToStudent = async () => {
    await update({
      ...session,
      isMentor: false,
    });

    toast.success("Switched to Student", {
      autoClose: 1000,
    });
  };

  const switchToMentor = async () => {
    await update({
      ...session,
      isMentor: true,
    });

    toast.success("Switched to Mentor", {
      autoClose: 1000,
    });
  };

  return (
    <section className="container py-5 mx-auto">
      <div className="w-[95%] mx-auto grid place-items-center md:grid-cols-2  gap-y-3">
        <div className="flex items-center justify-center w-full">
          <img
            className="w-auto h-full  rounded-2xl"
            src={course.picture || "/Boy-studyin-remotely-with-tutor.svg"}
            alt=""
          />
        </div>

        <div className="flex flex-col items-start justify-start gap-4 md:gap-8">
          <h2 className="text-aqua-blue text-center md:text-left font-bold font-poppins tracking-[-0.2%] text-2xl md:text-5xl md:leading-[3.75rem] ">
            {course.title}
          </h2>
          <p className="text-base font-medium text-left text-dimgray-300 md:text-xl font-poppins">
            {course.description}
          </p>
          <div className="flex items-center justify-start gap-4 ">
            <div>
              <img
                className="object-cover w-16 h-auto rounded-full"
                src={courseMentor.picture}
                alt=""
              />
            </div>

            <div className="flex flex-col items-center justify-between gap-2">
              <h5 className="text-lg font-bold text-center text-darkslategray-400 font-poppins ">
                {courseMentor.name}{" "}
              </h5>
              <span className="text-lg font-medium text-center text-dimgray-300 font-poppins ">
                {formatDate(new Date(course.created_at))}
              </span>
            </div>
          </div>
        </div>

        <div></div>
        <div className="w-[95%] mx-auto ">
          {session &&
          session.user &&
          session.user.role === "user" &&
          session.isMentor &&
          signedAccountId !== course?.mentor.account_id ? (
            <button
              onClick={switchToStudent}
              className="w-full py-2 text-base font-normal text-center text-white rounded-full font-roboto bg-aqua-blue md:text-xl "
            >
              Switch To Student
            </button>
          ) : session &&
            session.user &&
            session.user.role === "user" &&
            session.isMentor &&
            signedAccountId === course?.mentor.account_id ? (
            <button
              onClick={() => {
                router.push(`/dashboard/mentor/course/${course?.id}`);
              }}
              className="w-full py-2 text-base font-normal text-center text-white rounded-full font-roboto bg-aqua-blue md:text-xl "
            >
              Edit Course
            </button>
          ) : session &&
            session.user &&
            session.user.role === "user" &&
            !session.isMentor &&
            signedAccountId === course?.mentor.account_id ? (
            <button
              onClick={switchToMentor}
              className="w-full py-2 text-base font-normal text-center text-white rounded-full font-roboto bg-aqua-blue md:text-xl "
            >
              Switch To Mentor
            </button>
          ) : isCarted ? (
            <button
              onClick={() => router.push("/cart")}
              className="w-full py-2 text-base font-normal text-center text-white rounded-full font-roboto bg-aqua-blue md:text-xl "
            >
              Already On Your Cart
            </button>
          ) : isEnrolled ? (
            <button
              onClick={() => router.push(`/learn/course/${course.id}`)}
              className="w-full py-2 text-base font-normal text-center text-white rounded-full font-roboto bg-aqua-blue md:text-xl "
            >
              Resume Learning
            </button>
          ) : isCompleted ? (
            <button className="w-full py-2 text-base font-normal text-center text-white rounded-full font-roboto bg-aqua-blue md:text-xl ">
              Course Completed
            </button>
          ) : (
            <button
              onClick={handleAddCourseToCart}
              className="w-full py-2 text-base font-normal text-center text-white rounded-full font-roboto bg-aqua-blue md:text-xl "
            >
              Add Course to Cart
            </button>
          )}
        </div>
      </div>

      <div className="w-[95%] md:w-[85%] mx-auto place-items-center grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 my-[8%] md:my-[5%]">
        <div className="h-full pb-5 border-b-2 border-solid  md:border-b-0 md:border-r-2 border-aqua-blue md:pr-6 md:pb-0">
          <div className="flex flex-col items-start justify-start gap-4 ">
            <h3 className="text-aqua-blue text-left font-bold font-poppins tracking-[-0.2%] text-xl md:text-2xl md:leading-[3.75rem] ">
              Course Modules
            </h3>

            {course.modules.map((module) => (
              <div key={module.id} className="flex flex-col gap-2">
                <h4
                  onClick={() => setCurrentModule(module)}
                  className={`
                    ${
                      currentModule?.id === module.id
                        ? "text-aqua-blue font-semibold"
                        : "text-dimgray-700 font-medium "
                    }
                   text-left font-poppins text-base cursor-pointer`}
                >
                  {module.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        <div className="h-full col-span-2">
          {currentModule ? (
            <div className="flex flex-col gap-4">
              <h3 className="text-aqua-blue text-left font-bold font-poppins tracking-[-0.2%] text-2xl md:text-2xl md:leading-[3.75rem] ">
                {currentModule.title}
              </h3>
              <p className="text-base font-medium text-left text-dimgray-700 font-poppins">
                {currentModule.description}
              </p>
              <div className="flex flex-col gap-4">
                <h5 className="text-xl font-medium text-purple font-poppins ">
                  Module Lessons :{" "}
                </h5>
                {currentModule.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex flex-col gap-2">
                    <h4 className="text-base font-medium text-left text-dimgray-700 font-poppins">
                      {lesson.title}
                    </h4>
                    <p className="text-base font-normal text-left text-dimgray-500 font-poppins">
                      {lesson.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h4 className="text-base font-medium text-left text-dimgray-700 font-poppins">
              Select a module to view its details
            </h4>
          )}
        </div>
      </div>
    </section>
  );
}
