import Search from "./search";

export default function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(0deg, rgba(226,184,233,0.2), rgba(69,161,190,0.7))",
      }}
      className="w-full overflow-hidden text-xl text-left text-white-900 font-poppins"
    >
      <div className="grid my-14 place-items-center">
        <Search />
      </div>
      <div className="flex items-center justify-center mb-6 md:mb-12">
        <div className="flex items-center justify-center px-1 md:px-0 md:w-2/3">
          <h1
            style={{ WebkitTextStroke: "1px #ffffff" }}
            className=" text-lg md:text-[3.2rem] leading-snug uppercase font-capriola font-normal text-center tracking-wide md:tracking-normal"
          >
            Explore Artificial Intelligence and Blockchain Development
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center px-1 mb-4 md:mb-12 md:px-0">
        <div className="flex items-center justify-center md:w-[53%] ">
          <p className="text-sm font-medium text-center text-white font-poppins xl:text-xl">
            Immerse yourself in the future of technology with our interactive
            courses, designed to stimulate your mind and fuel your passion for
            AI and blockchain.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mb-8 md:mb-12">
        <a
          href="/courses/preview"
          className="capitalize w-[70%] md:w-[25%] md:hover:w-[35%] py-3 text-center bg-aqua-blue rounded-3xl font-poppins font-normal text-xl duration-700 hover:bg-gray-700   transition-all ease-in-out text-white-900"
        >
          Discover our Courses
        </a>
      </div>
      <div className="flex items-center justify-center mb-12">
        <img
          className="w-56 md:w-80 object-cover"
          alt=""
          src="/cloud-bitcoin@2x.png"
        />
      </div>
    </section>
  );
}
