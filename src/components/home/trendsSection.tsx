import Link from "next/link";

export default function TrendsSection() {
  return (
    <section className="my-8 sm:py-5 w-[95%] container mx-auto">
      <div className="custom-linear-border rounded-2xl  ">
        <div className="grid px-4 py-6 md:p-20 sm:grid-cols-2 gap-x-12 ">
          <div className="flex flex-col items-center justify-evenly gap-3 lg:gap-5 md:items-start ">
            <h1 className="text-lg font-normal  text-center uppercase md:text-left font-capriola lg:text-3xl text-aqua-blue">
              Discover the Latest Trends in AI and Blockchain!
            </h1>
            <p className="text-sm font-medium text-darkslategray-550 md:text-base lg:text-lg xl:text-xl font-poppins">
              Explore the latest trends in Artificial Intelligence and
              Blockchain with our exclusive courses. Be prepared to meet the
              challenges of the future by learning the latest concepts and
              innovations shaping the industry.
            </p>
            <Link
              href={"/courses?category=AI"}
              className="w-[98%] cursor-pointer text-center py-2 sm:py-3 font-roboto font-normal text-base text-white bg-aqua-blue rounded-full"
            >
              Explore now
            </Link>
          </div>
          <div className="hidden sm:justify-center sm:flex">
            <img
              className=" object-cover max-w-full lg:max-w-[80%] "
              src="/teenager-girl-holding-megaphone@2x.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
