"use client";

import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SplitLayout from "@/components/dashboard/splitLayout";
import { useSession } from "next-auth/react";
import { useState } from "react";
// import StatsChart from "@/components/statsChart";

export default function MentorStats() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [step, setStep] = useState(0);

  // if (!session) {
  //   redirect("/login");
  // }

  // if (session) {
  //   if (session.user.role === "waiting") {
  //     // redirect to register page
  //     redirect("/register?step=3");
  //   }

  //   if (session.user.role === "student") {
  //     // redirect to student dashboard
  //     redirect("/student/dashboard");
  //   }

  //   if (session.user.role === "admin") {
  //     // redirect to admin dashboard
  //     redirect("/admin/dashboard");
  //   }
  // }

  return (
    <div className="md:grid md:grid-cols-12">
      <SplitLayout session={session} />
      <main className="container md:px-5 min-h-screen pb-5 mx-auto md:col-span-11 md:pb-6">
        <div className="mt-4 md:mt-0 px-3 w-full md:px-0 md:max-w-[39%]">
          <h1 className="mb-1 text-2xl font-normal uppercase text-aqua-blue font-poppins md:text-3xl ">
            Statistiques de vos cours
          </h1>
          <p className="text-sm font-normal text-schemes-secondary font-poppins md:text-base">
            {`Vous pouvez obtenir des informations clés sur la performance de vos cours ainsi que de vos entrées d’argent`}
          </p>
        </div>

        <div className="md:ml-[4%] flex justify-center items-center ">
          <div className="min-w-fit maw-w-[90%] mx-auto grid grid-cols-3 md:gap-36 border-b-[1px] border-solid border-b-black mt-8 md:mt-12">
            <div
              onClick={() => setStep(0)}
              className={`flex flex-col justify-between gap-2 pb-6 md:pb-6 border-solid border-b-schemes-secondary cursor-pointer ${
                step === 0 ? "border-b-[3px]" : ""
              }`}
            >
              <h4 className="text-black text-lg font-poppins font-normal">
                Revenue Totale
              </h4>
              <span className="text-black text-3xl font-poppins font-normal">
                1.000 dt
              </span>
              <p className="text-black text-lg font-poppins font-normal">
                0.000 dt ce mois-ci
              </p>
            </div>
            <div
              onClick={() => setStep(1)}
              className={`flex flex-col justify-between gap-2 pb-6 md:pb-6 border-solid border-b-schemes-secondary cursor-pointer ${
                step === 1 ? "border-b-[3px]" : ""
              }`}
            >
              <h4 className="text-black text-lg font-poppins font-normal">
                {"Nombre total d’inscriptions"}
              </h4>
              <span className="text-black text-3xl font-poppins font-normal">
                150
              </span>
              <p className="text-black text-lg font-poppins font-normal">
                25 ce mois-ci
              </p>
            </div>
            <div
              onClick={() => setStep(2)}
              className={`flex flex-col justify-between gap-2 pb-6 md:pb-6 border-solid border-b-schemes-secondary cursor-pointer ${
                step === 2 ? "border-b-[3px]" : ""
              }`}
            >
              <h4 className="text-black text-lg font-poppins font-normal">
                Note globale obtenue
              </h4>
              <span className="text-black text-3xl font-poppins font-normal">
                4, 5
              </span>
              <p className="text-black text-lg font-poppins font-normal">
                12 notes ce mois-ci
              </p>
            </div>
          </div>
        </div>

        {/* <div className="w-full flex justify-center items-center mt-12">
          {step === 0 && <StatsChart />}
        </div> */}
      </main>
    </div>
  );
}
