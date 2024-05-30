"use client";

import { useState } from "react";
import CourseCard from "./courseCard";

export default function CoursesSection() {
  const [specialite, setSpecialite] = useState("Blockchain");
  const [theme, setTheme] = useState("Web2");

  return (
    <section
      id="courses"
      className="container px-4 pt-16 pb-8 mx-auto overflow-hidden md:px-0 text-dimgray-100"
    >
      <div className="text-base sm:text-2xl  lg:text-4xl font-capriola font-normal text-aqua-blue md:px-0 flex items-center w-full ">
        {"Cours Avancés d'Intelligence Artificielle et Blockchain"}
      </div>

      <div className="flex items-center py-2 md:px-8 md:py-4">
        <p className="text-sm font-medium md:text-xl font-poppins text-dimgray-100">
          Tout les outils pour devenir un expert en IA et blockchain grâce à nos
          cours approfondis, enseignés par des professionnels chevronnés du
          secteur.
        </p>
      </div>

      {/* Start Specialite line */}
      <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 text-sm md:text-base font-semibold md:font-bold font-poppins ">
        <button
          onClick={() => setSpecialite("Web")}
          className={
            "px-8 py-4" +
            (specialite === "Web"
              ? " border-solid text-purple border-purple border-b-[2px]"
              : "")
          }
        >
          Web Development
        </button>
        <button
          onClick={() => setSpecialite("Blockchain")}
          className={
            "px-8 py-4" +
            (specialite === "Blockchain"
              ? " border-solid text-purple border-purple border-b-[2px]"
              : "")
          }
        >
          Blockchain
        </button>

        <button
          onClick={() => setSpecialite("AI")}
          className={
            "px-8 py-4" +
            (specialite === "AI"
              ? " border-solid text-purple border-purple border-b-[2px]"
              : "")
          }
        >
          AI
        </button>
        <button
          onClick={() => setSpecialite("Cyber Security")}
          className={
            "px-8 py-4" +
            (specialite === "Cyber Security"
              ? " border-solid text-purple border-purple border-b-[2px]"
              : "")
          }
        >
          Cyber Security
        </button>
        <button
          onClick={() => setSpecialite("Data Science")}
          className={
            "px-8 py-4" +
            (specialite === "Data Science"
              ? " border-solid text-purple border-purple border-b-[2px]"
              : "")
          }
        >
          Data Science
        </button>
        <button
          onClick={() => setSpecialite("Devops")}
          className={
            "px-8 py-4" +
            (specialite === "Devops"
              ? " border-solid text-purple border-purple border-b-[2px]"
              : "")
          }
        >
          Devops
        </button>
      </div>
      {/* Start Themes Line */}
      <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 text-sm md:text-base py-6 overflow-hidden font-normal gap-9 text-aqua-blue font-roboto">
        <button
          onClick={() => setTheme("Web2")}
          className={
            "w-36 py-2 rounded-full border-solid border-aqua-blue border-[1px]" +
            (theme === "Web2"
              ? " bg-aqua-blue  text-white-900 border-white-900"
              : " ")
          }
        >
          Web2
        </button>
        <button
          onClick={() => setTheme("Web3")}
          className={
            "w-36 py-2 rounded-full border-solid border-aqua-blue border-[1px]" +
            (theme === "Web3"
              ? " bg-aqua-blue  text-white-900 border-white-900"
              : " ")
          }
        >
          Web3
        </button>
        <button
          onClick={() => setTheme("Solidity")}
          className={
            "w-36 py-2 rounded-full border-solid border-aqua-blue border-[1px]" +
            (theme === "Solidity"
              ? " bg-aqua-blue  text-white-900 border-white-900"
              : " ")
          }
        >
          Solidity
        </button>
        <button
          onClick={() => setTheme("python")}
          className={
            "w-36 py-2 rounded-full border-solid border-aqua-blue border-[1px]" +
            (theme === "python"
              ? " bg-aqua-blue  text-white-900 border-white-900"
              : " ")
          }
        >
          Python
        </button>
        <button
          onClick={() => setTheme("openai")}
          className={
            "w-36 py-2 rounded-full border-solid border-aqua-blue border-[1px]" +
            (theme === "openai"
              ? " bg-aqua-blue  text-white-900 border-white-900"
              : " ")
          }
        >
          OpenAI
        </button>
        <button
          onClick={() => setTheme("javascript")}
          className={
            "w-36 py-2 rounded-full border-solid border-aqua-blue border-[1px]" +
            (theme === "javascript"
              ? " bg-aqua-blue  text-white-900 border-white-900"
              : " ")
          }
        >
          Javascript
        </button>
      </div>

      {/* Start Courses  */}
      <div
        id="courses-container"
        className="cards grid sm:grid-cols-2 lg:grid-cols-3  overflow-hidden gap-6"
      >
        <CourseCard
          title="Introduction to Blockchain"
          price={15}
          mentor="Ayoub Amer"
          rating={5}
          image="/3d cryptocurrency rendering design.png"
          courseLink="/courses/introduction-to-blockchain"
        />
        <CourseCard
          title="Web3 Development"
          price={25}
          mentor="Ayoub Amer"
          rating={5}
          image="/person-using-ai-tool-at-job@2x.png"
          courseLink="/courses/web3-development"
        />
        <CourseCard
          title="Solidity Smart Contracts"
          price={35}
          mentor="Ayoub Amer"
          rating={5}
          image="/3d-cryptocurrency-rendering-design@2x.png"
          courseLink="/courses/solidity-smart-contracts"
        />
      </div>
    </section>
  );
}
