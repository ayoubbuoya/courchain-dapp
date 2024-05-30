import Link from "next/link";
import Search from "../home/search";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-aqua-blue from-[1%] min-h-[70vh] w-full overflow-hidden text-left text-xl text-white-900 font-poppins py-6">
      <div className="my-8 ">
        <Search />
      </div>
      <div className="mx-auto w-[80%] my-12 ">
        <div className="flex flex-wrap items-center justify-around ">
          <div className="xl:max-w-[45%] ">
            <img
              className="object-cover max-w-[28rem]"
              src="/young-woman-at-work-with-laptop-writing@2x.png"
              alt=""
            />
          </div>
          <div className="xl:w-[50%]">
            <h1 className="text-4xl font-normal tracking-[-0.1rem] uppercase font-capriola  ">
              Devenez mentor couriai
            </h1>
            <p className="py-5 text-xl font-medium tracking-tight text-gray-800 font-poppins ">
              77% of learners report career benefits, such as new skills,
              increased pay, and new job opportunities. 2023 Coursera Learner
              Outcomes Report
            </p>

            <div className="flex items-center justify-center py-4">
              <Link
                href={"/register"}
                className="w-full py-3 text-lg font-normal tracking-wider text-center rounded-sm cursor-pointer bg-aqua-blue font-roboto hover:bg-slate-600"
              >
                Nous rejoindre gratuitement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
