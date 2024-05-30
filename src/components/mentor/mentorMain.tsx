"use client";

import { useState } from "react";
import MentorStep1 from "./mentorStep1";
import MentorStep2 from "./mentorStep2";
import MentorStep3 from "./mentorStep3";
import MentorStep4 from "./mentorStep4";
import MentorStep5 from "./mentorStep5";

export default function MentorMain() {
  const [step, setStep] = useState(1);
  const [mentorExperience, setMentorExperience] = useState("beginner");
  const [mentorExperienceOther, setMentorExperienceOther] = useState("");
  const [courseType, setCourseType] = useState("vid+quizz");
  const [courseTypeOther, setCourseTypeOther] = useState("");
  const [mentorAvailability, setMentorAvailability] = useState("idk");
  const [mentorAvailabilityOther, setMentorAvailabilityOther] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseCategoryOther, setCourseCategoryOther] = useState("");
  const [courseCommunty, setCourseCommunty] = useState("");

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto mt-1 lg:mt-4 py-4 ">
      <div className="flex justify-center items-center gap-6 lg:gap-16 text-xs lg:text-xl font-medium text-black leading-7 text-left font-poppins tracking-normal ">
        <button
          onClick={() => setStep(1)}
          className={`uppercase ${
            step === 1
              ? "text-aqua-blue border-b-[3px] border-solid border-aqua-blue"
              : null
          }`}
        >
          etape 1
        </button>
        <button
          onClick={() => setStep(2)}
          className={`uppercase ${
            step === 2
              ? "text-aqua-blue border-b-[3px] border-solid border-aqua-blue"
              : null
          }`}
        >
          etape 2
        </button>
        <button
          onClick={() => setStep(3)}
          className={`uppercase ${
            step === 3
              ? "text-aqua-blue border-b-[3px] border-solid border-aqua-blue"
              : null
          }`}
        >
          etape 3
        </button>
        <button
          onClick={() => setStep(4)}
          className={`uppercase ${
            step === 4
              ? "text-aqua-blue border-b-[3px] border-solid border-aqua-blue"
              : null
          }`}
        >
          etape 4
        </button>
        <button
          onClick={() => setStep(5)}
          className={`uppercase ${
            step === 5
              ? "text-aqua-blue border-b-[3px] border-solid border-aqua-blue"
              : null
          }`}
        >
          etape 5
        </button>
      </div>

      <>
        {step === 1 && (
          <MentorStep1
            mentorExperience={mentorExperience}
            setMentorExperience={setMentorExperience}
            setMentorExperienceOther={setMentorExperienceOther}
            mentorExperienceOther={mentorExperienceOther}
          />
        )}
        {step === 2 && (
          <MentorStep2
            courseType={courseType}
            setCourseType={setCourseType}
            courseTypeOther={courseTypeOther}
            setCourseTypeOther={setCourseTypeOther}
          />
        )}

        {step === 3 && (
          <MentorStep3
            mentorAvailability={mentorAvailability}
            setMentorAvailability={setMentorAvailability}
            mentorAvailabilityOther={mentorAvailabilityOther}
            setMentorAvailabilityOther={setMentorAvailabilityOther}
          />
        )}
        {step === 4 && (
          <MentorStep4
            courseCategory={courseCategory}
            setCourseCategory={setCourseCategory}
            courseCategoryOther={courseCategoryOther}
            setCourseCategoryOther={setCourseCategoryOther}
          />
        )}
        {step === 5 && (
          <MentorStep5
            courseCommunty={courseCommunty}
            setCourseCommunty={setCourseCommunty}
          />
        )}
      </>
    </div>
  );
}
