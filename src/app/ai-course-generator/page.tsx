"use client";

import SplitLayout from "@/components/dashboard/splitLayout";
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWalletStore } from "@/stores/wallet";
import { CONTRACTID } from "@/lib/config";

export default function Page() {
  const { data: session } = useSession();
  const [modules, setModules] = useState([]);
  const [modulesIds, setModulesIds] = useState([]);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { signedAccountId, wallet } = useWalletStore();

  if (!session) {
    return <Loading />;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const loadingToast = toast.loading("Generating course...");
    setIsLoadingModules(true);
    setModules([]);
    setModulesIds([]);
    setCourseId("");

    const formData = new FormData(e.currentTarget);
    const topic = formData.get("topic");

    console.log(
      JSON.stringify({
        mentorId: signedAccountId,
        topic,
      })
    );
    // post request to the /course/genrate
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_SERVER_API}/course/generate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mentorId: signedAccountId,
            topic,
          }),
        }
      );

      if (response.ok) {
        setIsLoadingModules(false);
        toast.update(loadingToast, {
          render: "Course Generated",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          transition: Bounce,
        });
        const {
          course,
          courseId,
          modules: modulesChains,
        } = await response.json();
        // console.log("ChatHistory: ", chatHistory);
        console.log("Course: ", course);
        console.log("Modules: ", modulesChains);

        setModules(modulesChains);
        setCourseId(courseId);
        // setModulesIds(modulesIds);
        console.log("Course Generated: ", course);
      } else {
        setIsLoadingModules(false);
        console.error(response);
        toast.update(loadingToast, {
          render: response.statusText || "An error occurred",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          transition: Bounce,
        });
        toast.error(await response.text(), {
          autoClose: 2200,
        });
      }
    } catch (error) {
      console.error(error);
      setIsLoadingModules(false);
      toast.update(loadingToast, {
        render: "An error occurred",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
    }
  }

  return (
    <div className="md:grid md:grid-cols-12">
      <SplitLayout session={session} />

      <main className="md:col-span-11 container flex flex-col  min-h-screen py-5 mx-auto mt-4 md:mt-8 md:py-8 tracking-normal ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center text-center md:text-left "
        >
          <h1 className="text-lg font-normal text-center uppercase font-capriola md:text-left xl:text-3xl text-aqua-blue">
            AI Course Generator
          </h1>
          <div className="flex items-start sm:items-center gap-3 my-1 max-w-[85%] ">
            <Image
              className="w-9 sm:w-5 md:w-9 lg:w-6"
              src="/info.svg"
              width={25}
              height={25}
              alt=""
            />
            <p className="text-xs font-medium md:font-normal text-left font-poppins text-dimgray-100 md:text-lg">
              Type in your course topic and we'll provide you with a complete
              course outline.
            </p>
          </div>
          <div className="w-[85%] xl:w-[75%] mt-4 rounded-full custom-linear-border md:custom-linear-border ">
            <div className="flex items-center justify-between w-full gap-4 px-4">
              <Image src="/tablersearch.svg" width={25} height={25} alt="" />
              <input
                autoComplete="off"
                name="topic"
                type="search"
                className="w-full py-3 pl-1 font-poppins font-normal overflow-auto text-sm text-left rounded-full outline-none text-dimgray-100 bg-white-900 "
                placeholder="Type your course subject"
              />
            </div>
          </div>
          <div className="w-[60%] my-5">
            <button
              disabled={isLoadingModules}
              type="submit"
              className="w-full py-2 text-base xl:text-xl rounded-full bg-aqua-blue text-white-900 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingModules && (
                <div className="w-5 h-5 border-2 border-t-aqua-blue border-r-aqua-blue border-b-purple border-l-purple rounded-full animate-spin"></div>
              )}
              Generate Course
            </button>
          </div>
        </form>

        {isLoadingModules && (
          <>
            <div className="flex justify-center items-center my-4  font-poppins font-normal gap-1 xl:gap-2 xl:text-lg text-dimgray-300 ">
              This can takes up to 4 min
              <span className="tracking-[0.2rem]">...</span>
            </div>
            <div className="h-full w-full flex justify-center items-center">
              <div className="w-24 h-24 border-4 border-t-aqua-blue border-r-aqua-blue border-b-purple border-l-purple rounded-full animate-spin"></div>
            </div>
          </>
        )}

        {modules.length > 0 && (
          <div className="px-2 md:px-5">
            <h2 className="mt-3 mb-10 md:mt-8 md:mb-16 text-lg font-normal text-left uppercase font-capriola xl:text-2xl text-aqua-blue">
              Choose a module
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {modules.map(
                (module: {
                  id: number;
                  title: string;
                  description: string;
                  order: number;
                }) => (
                  <div
                    key={module.order}
                    className="relative custom-linear-border rounded-2xl group"
                  >
                    <div className="absolute top-[-1.4rem] right-[41%] md:right-[42%] px-2 bg-white">
                      <div className="p-2 bg-aqua-blue rounded-full">
                        <Image
                          className="w-6"
                          src="/fi_star.svg"
                          width={15}
                          height={15}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="px-4 md:px-8 pb-4 pt-7 md:pb-6 md:pt-14 flex flex-col justify-around h-full">
                      <Link
                        href={`/ai-course-generator/course/${courseId}/module/${module.id}`}
                        className="absolute flex justify-end md:hidden md:group-hover:flex md:group-hover:justify-end top-3 right-2 md:right-4"
                      >
                        <Image
                          src="/fi_arrow-up-right.svg"
                          width={25}
                          height={25}
                          alt=""
                          className="w-5 md:w-6"
                        />
                      </Link>
                      <h3 className="text-base font-medium text-center md:text-left text-dimgray-500 font-poppins xl:text-xl my-2 md:mb-10">
                        {module.title}
                      </h3>
                      <p className="font-medium text-center md:text-left text-dimgray-300 font-poppins text-sm xl:text-base ">
                        {module.description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
