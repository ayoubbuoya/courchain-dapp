import Link from "next/link";

export default function MentorSection() {
  return (
    <section className="text-white text-left bg-mentor-green-gradient backdrop-blur-[3.13rem] overflow-hidden">
      <div className="container grid gap-12 px-3 py-8 mx-auto place-items-center sm:grid-cols-3">
        <div className="hidden sm:flex sm:justify-center sm:items-center">
          <img
            className="object-cover max-w-full"
            src="/notebook-with-glasses-and-pencil@2x.png"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center gap-3 sm:col-span-2 md:items-start">
          <h1
            style={{
              WebkitTextStroke: "1px #fff",
            }}
            className="text-xl font-normal tracking-wider text-center uppercase md:tracking-normal md:text-left md:text-3xl xl:text-5xl font-capriola "
          >
            Devenez mentor couriai
          </h1>
          <p className="pl-2 text-sm font-medium md:pl-0 text-dimgray-800 md:text-base lg:text-lg xl:text-xl font-poppins ">
            77% of learners report career benefits, such as new skills,
            increased pay, and new job opportunities. 2023 Coursera Learner
            Outcomes Report
          </p>

          <div className="w-[80%] sm:w-[95%]  flex items-center justify-center py-4">
            <Link
              href={"/mentor"}
              className="w-full py-2 font-normal text-center rounded-full cursor-pointer md:py-3 sm:text-lg bg-aqua-blue font-roboto"
            >
              Nous rejoindre gratuitement
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
