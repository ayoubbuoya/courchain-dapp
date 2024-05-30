import Image from "next/image";

export default function AddedValuesSection() {
  return (
    <section
      className="py-10 text-center rounded-md"
      style={{
        background:
          "linear-gradient(0deg, rgba(226,184,233,1) 10%, rgba(255,255,255,1) 95%)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-center px-2 md:w-[50%] md:mx-auto">
          <h1
            style={{
              WebkitTextStroke: "1px #e2b8e9",
            }}
            className="my-2 text-xl font-normal uppercase text-purple font-capriola md:text-4xl"
          >
            Discover Our Added Values
          </h1>
        </div>
        <div className="px-5 md:px-0 md:w-[80%] md:mx-auto">
          <p className="text-sm font-medium text-left md:text-xl text-dimgray-300 font-poppins ">
            Explore educational excellence through immersive training. Access
            industry experts, benefit from flexibility total, and forge your
            future in an engaged community.
          </p>
        </div>
        <div className="grid gap-8 py-10 place-items-center md:grid-cols-3 ">
          <div className="flex flex-col items-center justify-between gap-2 ">
            <div className="p-3 rounded-md md:p-4 bg-aqua-blue">
              <img src="/messages--24--outline.svg" alt="" />
            </div>
            <h5 className="text-xl font-semibold text-center md:text-2xl md:font-bold text-dimgray-500 font-poppins">
              Access to industry professionals
            </h5>
            <p className="px-8 text-sm font-medium md:text-base text-dimgray-300 font-poppins ">
              Benefit from their practical experience and expertise.
            </p>
          </div>
          <div className="hidden row-span-2 md:block">
            <div className="flex items-center justify-center mt-8">
              <img
                className="object-cover "
                src="/artificial-intelligence-chip@2x.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-2">
            <div className=" rounded-md md:p-1.5 bg-aqua-blue">
              <Image
                width={24}
                height={24}
                className="w-12 "
                src="/frame-18.svg"
                alt=""
              />
            </div>
            <h5 className="text-xl font-semibold text-center md:text-2xl md:font-bold text-dimgray-500 font-poppins">
              Constant Content Update
            </h5>
            <p className="px-8 text-sm font-medium md:text-base text-dimgray-300 font-poppins ">
              Stay up to date with the latest advances thanks to regular course
              updates.
            </p>
          </div>
          <div className="flex flex-col items-center justify-between gap-2">
            <div className="p-3 rounded-md md:p-4 bg-aqua-blue">
              <img src="/edit--24--outline.svg" alt="" />
            </div>
            <h5 className="text-xl font-semibold text-center md:text-2xl md:font-bold text-dimgray-500 font-poppins">
              Constant Content Update
            </h5>
            <p className="px-8 text-sm font-medium md:text-base text-dimgray-300 font-poppins ">
              Stay up to date with the latest advances thanks to regular course
              updates.
            </p>
          </div>
          <div className="flex flex-col items-center justify-between gap-2">
            <div className="p-3 rounded-md md:p-4 bg-aqua-blue">
              <img src="/grid--24--outline.svg" alt="" />
            </div>
            <h5 className="text-xl font-semibold text-center md:text-2xl md:font-bold text-dimgray-500 font-poppins">
              Recognized certification
            </h5>
            <p className="px-8 text-sm font-medium md:text-base text-dimgray-300 font-poppins ">
              industry-recognized certifications that boost your credibility and
              competitiveness in the job market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
