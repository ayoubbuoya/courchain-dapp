"use client";

import Header from "@/components/header/header";
import Hero from "@/components/home/hero";
import CoursesSection from "@/components/home/coursesSection";
import PlansSection from "@/components/home/plansSection";
import MentorSection from "@/components/home/mentorSection";
import CommunitySection from "@/components/home/CommunitySection";
import TrendsSection from "@/components/home/trendsSection";
import AddedValuesSection from "@/components/home/addedValuesSection";
import Footer from "@/components/footer/footer";
import MinCoursesSection from "@/components/home/minCoursesSeection";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Course } from "@/lib/types";
import { useWalletStore } from "@/stores/wallet";
import { CONTRACTID } from "@/lib/config";
import Loading from "@/components/loading";
import { useCoursesStore } from "@/stores/courses";
import { useLoadingStore } from "@/stores/loading";

export default function Homepage() {
  const { isLoading } = useLoadingStore();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen text-base text-left bg-white-900 font-poppins text-dimgray-100">
        <Hero />
        <MinCoursesSection />
        <TrendsSection />
        <section className="text-white text-left bg-home-certif-green-purple-gradient backdrop-blur-[3.13rem] overflow-hidden">
          <div className="container grid place-items-center gap-12 px-3 py-8 md:py-10 mx-auto sm:grid-cols-2">
            <div className="flex flex-col justify-between items-center gap-3 md:gap-6  md:items-start">
              <h1 className="text-2xl font-normal text-center uppercase  text-aqua-blue md:text-3xl xl:text-5xl font-capriola ">
                BECOME CERTIFIED IN AI AND BLOCKCHAIN
              </h1>
              <p className="pl-2 text-sm font-medium md:pl-0 text-dimgray-800 md:text-base lg:text-lg xl:text-xl font-poppins">
                Recognize Your Expertise with Our Leading Certifications Invest
                in your future today with our certificates attesting to your
                exceptional expertise in AI and Blockchain.
              </p>
              <div className="w-[80%] sm:w-[95%]  flex items-center justify-center py-4">
                <Link
                  href={"/courses?category=blockchain"}
                  className="w-full py-2 font-normal text-center rounded-full cursor-pointer md:py-3 sm:text-lg bg-aqua-blue font-roboto"
                >
                  Obtain Your Certification In Blockchain
                </Link>
              </div>
            </div>
            <div className="hidden  sm:flex sm:justify-center sm:items-center">
              <img
                className="object-cover max-w-full"
                src="/books-graduation-hat-and-diploma-scroll@2x.png"
                alt=""
              />
            </div>
          </div>
        </section>
        {/* <CoursesSection /> */}
        {/* <PlansSection /> */}
        {/* <MentorSection /> */}
        {/* <CommunitySection /> */}

        <AddedValuesSection />
      </main>
      <Footer />
    </>
  );
}
