import Link from "next/link";
import Search from "../home/search";

export default function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(0deg, rgba(226,184,233,1) 8%, rgba(218,236,242,1) 59%)",
      }}
      className="text-center min-h-[50vh] w-full overflow-hidden text-xl text-white-900 font-poppins py-6"
    >
      <div className="my-8 relative ">
        <Search />
      </div>
      <div className="mx-auto w-[95%] md:w-[60%] mt-12 ">
        <div className="grid md:grid-cols-3 overflow-hidden">
          <div className="md:col-span-2">
            <h1 className="green-text-stroke text-2xl md:text-[2.5rem] md:leading-10 font-normal  uppercase font-capriola text-aqua-blue pb-5    ">
              BECOME CERTIFIED IN AI AND BLOCKCHAIN
            </h1>
            <div className="flex items-center justify-center py-4">
              <Link
                href={"/courses?category=artificial intelligence&category=blockchain"}
                className="rounded-full w-[70%] py-3 text-base font-normal tracking-wider text-center cursor-pointer bg-aqua-blue font-roboto hover:bg-slate-600"
              >
                Obtain Your Certification
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              className="object-cover mx-auto md:mx-0 max-w-[60%] md:max-w-full"
              src="/books-graduation-hat-and-diploma-scroll@2x.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
